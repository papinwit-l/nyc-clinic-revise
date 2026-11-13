<?php
/**
 * On-demand revalidation: when content changes, tell Next.js which cache tags
 * to drop, so the change is live within seconds instead of at the next hourly
 * refresh.
 *
 * Changes are collected during the request and sent ONCE at shutdown (a save
 * can touch several hooks). The call is non-blocking: if Next.js is down, the
 * editor's save still succeeds and the hourly revalidate catches up.
 *
 * Tags are the post type names, plus "site" for the Page Manage screens. The
 * Next.js side tags each fetch the same way (src/lib/wp.ts).
 */

defined( 'ABSPATH' ) || exit;

/** Queue a tag (or tags) for this request. */
function nyc_revalidate( string ...$tags ): void {
	$GLOBALS['nyc_revalidate_tags'] = array_unique( array_merge( $GLOBALS['nyc_revalidate_tags'] ?? [], $tags ) );
}

/** Content types the frontend fetches, i.e. the tags worth sending. */
function nyc_revalidate_types(): array {
	return array_merge( [ 'post', 'page' ], NYC_ORDERED_TYPES );
}

// Posts: published, updated, unpublished, trashed, deleted.
add_action(
	'transition_post_status',
	static function ( $new, $old, WP_Post $post ) {
		if ( ( 'publish' === $new || 'publish' === $old ) && in_array( $post->post_type, nyc_revalidate_types(), true ) ) {
			nyc_revalidate( $post->post_type );
		}
	},
	10,
	3
);
add_action(
	'save_post',
	static function ( $id, WP_Post $post ) {
		// Edits to an already-published post don't change status.
		if ( 'publish' === $post->post_status && in_array( $post->post_type, nyc_revalidate_types(), true ) ) {
			nyc_revalidate( $post->post_type );
		}
	},
	1000,
	2
);
add_action(
	'before_delete_post',
	static function ( $id, WP_Post $post ) {
		if ( in_array( $post->post_type, nyc_revalidate_types(), true ) ) {
			nyc_revalidate( $post->post_type );
		}
	},
	10,
	2
);

// Image edits (alt text, replaced file) can show on any page.
add_action( 'edit_attachment', static fn() => nyc_revalidate( ...[ ...nyc_revalidate_types(), 'site' ] ) );

// Terms: Before & After categories, blog categories.
foreach ( [ 'created_term', 'edited_term', 'delete_term' ] as $nyc_hook ) {
	add_action(
		$nyc_hook,
		static function ( $term_id, $tt_id, $taxonomy ) {
			if ( 'case_treatment' === $taxonomy ) {
				nyc_revalidate( 'case', 'reveal' );
			} elseif ( 'category' === $taxonomy ) {
				nyc_revalidate( 'post' );
			}
		},
		10,
		3
	);
}
unset( $nyc_hook );

// Drag-sort (Simple Custom Post Order writes menu_order directly, no save_post).
add_action( 'scp_update_menu_order', static fn() => nyc_revalidate( ...NYC_ORDERED_TYPES ) );
add_action( 'scp_update_menu_order_tags', static fn() => nyc_revalidate( 'case', 'reveal' ) );

// Page Manage screens: Pods stores each field as option "{pod}_{field}".
add_action(
	'updated_option',
	static function ( $option ) {
		foreach ( NYC_SETTINGS_PODS as $pod ) {
			if ( str_starts_with( $option, "{$pod}_" ) || str_starts_with( $option, "_pods_{$pod}_" ) ) {
				nyc_revalidate( 'site' );
				return;
			}
		}
	}
);
add_action(
	'added_option',
	static function ( $option ) {
		do_action( 'updated_option', $option, null, null );
	}
);

// Send.
add_action(
	'shutdown',
	static function () {
		$tags = $GLOBALS['nyc_revalidate_tags'] ?? [];
		if ( ! $tags || ! defined( 'NYC_REVALIDATE_URL' ) || ! defined( 'NYC_REVALIDATE_SECRET' ) ) {
			return;
		}
		$response = wp_remote_post(
			NYC_REVALIDATE_URL,
			[
				'blocking' => false,
				'timeout'  => 2,
				'headers'  => [
					'Content-Type'        => 'application/json',
					'x-revalidate-secret' => NYC_REVALIDATE_SECRET,
				],
				'body'     => wp_json_encode( [ 'tags' => array_values( $tags ) ] ),
			]
		);
		if ( defined( 'WP_DEBUG' ) && WP_DEBUG ) {
			error_log( 'NYC revalidate → ' . implode( ',', $tags ) . ( is_wp_error( $response ) ? ' ERROR ' . $response->get_error_message() : '' ) ); // phpcs:ignore WordPress.PHP.DevelopmentFunctions
		}
	}
);
