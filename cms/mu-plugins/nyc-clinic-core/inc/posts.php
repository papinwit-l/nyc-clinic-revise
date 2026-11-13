<?php
/**
 * Blog articles: an article needs at least one language (title + body).
 *
 * The frontend shows whichever language exists (admin doc §3), so the only
 * broken state is neither. Publishing one from the edit screen saves it as a
 * draft instead, with a notice, rather than letting an empty article go live.
 *
 * Checked against the SUBMITTED form (Pods posts its inputs as
 * "pods_meta_{field}") before the post is written: Pods stores its meta only
 * after the post row exists, so stored meta would still be the old values.
 * Saves that don't come from the edit screen (imports, the Pods API) are not
 * checked.
 */

defined( 'ABSPATH' ) || exit;

add_filter(
	'wp_insert_post_data',
	static function ( array $data ) {
		// phpcs:disable WordPress.Security.NonceVerification.Missing -- read-only check; core verified the edit-form nonce.
		// "pods_meta_form_post_th" is Pods' server-rendered marker for the Thai
		// field group, present on every edit-screen save of an article.
		if ( 'post' !== $data['post_type'] || 'publish' !== $data['post_status'] || ! isset( $_POST['pods_meta_form_post_th'] ) ) {
			return $data;
		}
		$filled = static fn( $key, $strip = false ) => '' !== trim(
			$strip ? wp_strip_all_tags( wp_unslash( (string) ( $_POST[ $key ] ?? '' ) ) ) : wp_unslash( (string) ( $_POST[ $key ] ?? '' ) )
		);
		// phpcs:enable
		foreach ( [ 'th', 'en' ] as $lang ) {
			if ( $filled( "pods_meta_title_{$lang}" ) && $filled( "pods_meta_content_{$lang}", true ) ) {
				return $data;
			}
		}
		$data['post_status'] = 'draft';
		set_transient( 'nyc_post_notice_' . get_current_user_id(), 1, 60 );
		return $data;
	}
);

/**
 * Which language(s) an article is complete in: 'th', 'en', 'both' or ''.
 * Complete = title and article body both filled.
 */
function nyc_post_language( int $post_id ): string {
	$has = static fn( $lang ) => '' !== trim( (string) get_post_meta( $post_id, "title_{$lang}", true ) )
		&& '' !== trim( wp_strip_all_tags( (string) get_post_meta( $post_id, "content_{$lang}", true ) ) );
	$th = $has( 'th' );
	$en = $has( 'en' );
	return $th && $en ? 'both' : ( $th ? 'th' : ( $en ? 'en' : '' ) );
}

add_action(
	'admin_notices',
	static function () {
		$key = 'nyc_post_notice_' . get_current_user_id();
		if ( ! get_transient( $key ) ) {
			return;
		}
		delete_transient( $key );
		echo '<div class="notice notice-error is-dismissible"><p><strong>Not published.</strong> An article needs a title and article text in at least one language (Thai or English). It has been saved as a draft.</p></div>';
	}
);

// Show which languages each article has in the Blog list.
add_filter(
	'manage_post_posts_columns',
	static function ( $cols ) {
		$out = [];
		foreach ( $cols as $key => $label ) {
			$out[ $key ] = $label;
			if ( 'title' === $key ) {
				$out['nyc_lang'] = 'Language';
			}
		}
		return $out;
	}
);
add_action(
	'manage_post_posts_custom_column',
	static function ( $col, $post_id ) {
		if ( 'nyc_lang' !== $col ) {
			return;
		}
		$labels = [ 'both' => 'TH + EN', 'th' => 'TH only', 'en' => 'EN only', '' => '— empty —' ];
		echo esc_html( $labels[ nyc_post_language( (int) $post_id ) ] );
	},
	10,
	2
);
