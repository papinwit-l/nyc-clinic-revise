<?php
/**
 * One-time import of Services and FAQs into the CMS (Nov 2026).
 *
 * Moves the content that used to live in src/data/services.ts and
 * src/data/faq.ts into WordPress, so editors start from today's site instead
 * of a blank screen.
 *
 * Package layout (built from the codebase, delivered as nyc-import.zip):
 *   nyc-import/import.php    this file
 *   nyc-import/import.json   services + FAQs
 *   nyc-import/images/       service images
 *
 * Run with WP-CLI (Plesk → WordPress → WP-CLI tab):
 *   eval-file ../nyc-import/import.php           create what's missing
 *   eval-file ../nyc-import/import.php update    also overwrite existing entries
 *
 * Safe to run more than once: by default an entry that already exists (same
 * slug) is left exactly as it is, so edits made in wp-admin are never
 * overwritten. Images are uploaded once and reused.
 *
 * Service FAQs become FAQ entries ticked onto their service, with "Show on
 * FAQ page" off — the single-FAQ-list design (admin doc §0, Option A).
 */

if ( ! defined( 'WP_CLI' ) || ! WP_CLI ) {
	exit; // Never runs from a browser.
}

// $args holds the words after the file name in `wp eval-file`.
$nyc_update = in_array( 'update', $args ?? array(), true );
$nyc_dir    = __DIR__;
$nyc_data   = json_decode( (string) file_get_contents( "{$nyc_dir}/import.json" ), true );

if ( ! is_array( $nyc_data ) || 1 !== ( $nyc_data['version'] ?? 0 ) ) {
	WP_CLI::error( "import.json missing or unreadable in {$nyc_dir}" );
}
foreach ( array( 'service', 'faq' ) as $nyc_type ) {
	if ( ! post_type_exists( $nyc_type ) || ! function_exists( 'pods' ) ) {
		WP_CLI::error( "Post type '{$nyc_type}' or Pods is missing — is the nyc-clinic-core mu-plugin installed?" );
	}
}

require_once ABSPATH . 'wp-admin/includes/file.php';
require_once ABSPATH . 'wp-admin/includes/media.php';
require_once ABSPATH . 'wp-admin/includes/image.php';

// Act as an administrator: media uploads and some Pods saves expect a user.
$nyc_admin = get_users( array( 'role' => 'administrator', 'number' => 1, 'fields' => 'ID' ) );
if ( ! $nyc_admin ) {
	WP_CLI::error( 'No administrator account found.' );
}
wp_set_current_user( (int) $nyc_admin[0] );

/** Attachment ID for an image in the package, uploading it the first time. */
function nyc_import_image( string $dir, string $name ): int {
	static $cache = array();
	if ( '' === $name ) {
		return 0;
	}
	if ( isset( $cache[ $name ] ) ) {
		return $cache[ $name ];
	}
	$found = get_posts(
		array(
			'post_type'   => 'attachment',
			'post_status' => 'inherit',
			'meta_key'    => '_nyc_import_src',
			'meta_value'  => $name,
			'numberposts' => 1,
			'fields'      => 'ids',
		)
	);
	if ( $found ) {
		return $cache[ $name ] = (int) $found[0];
	}
	$src = "{$dir}/images/{$name}";
	if ( ! is_readable( $src ) ) {
		WP_CLI::warning( "Image not found in package: {$name}" );
		return 0;
	}
	$tmp = wp_tempnam( $name );
	copy( $src, $tmp ); // media_handle_sideload moves the file; keep the package intact.
	$id = media_handle_sideload( array( 'name' => $name, 'tmp_name' => $tmp ), 0 );
	if ( is_wp_error( $id ) ) {
		WP_CLI::warning( "Upload failed for {$name}: " . $id->get_error_message() );
		return 0;
	}
	update_post_meta( $id, '_nyc_import_src', $name );
	return $cache[ $name ] = (int) $id;
}

/** Existing post ID by slug, any status, or 0. */
function nyc_import_find( string $type, string $slug ): int {
	$ids = get_posts(
		array(
			'post_type'   => $type,
			'name'        => $slug,
			'post_status' => 'any',
			'numberposts' => 1,
			'fields'      => 'ids',
		)
	);
	return $ids ? (int) $ids[0] : 0;
}

/**
 * Create or (with "update") overwrite one entry. Returns [id, action].
 * $after runs only when the entry was written, for repeaters and relations.
 */
function nyc_import_entry( string $type, array $item, int $parent, array $fields, bool $update, ?callable $after = null ): array {
	$id = nyc_import_find( $type, $item['slug'] );
	if ( $id && ! $update ) {
		return array( $id, 'skipped' );
	}
	$post = array(
		'post_type'   => $type,
		'post_status' => 'publish',
		'post_title'  => $item['internal_name'],
		'post_name'   => $item['slug'],
		'menu_order'  => (int) $item['menu_order'],
		'post_parent' => $parent,
	);
	if ( $id ) {
		$post['ID'] = $id;
	}
	$result = $id ? wp_update_post( $post, true ) : wp_insert_post( $post, true );
	if ( is_wp_error( $result ) ) {
		WP_CLI::warning( "{$type} {$item['slug']}: " . $result->get_error_message() );
		return array( 0, 'failed' );
	}
	$id = (int) $result;
	pods( $type, $id )->save( $fields );
	if ( $after ) {
		$after( $id );
	}
	$slug = get_post_field( 'post_name', $id );
	if ( $slug !== $item['slug'] ) {
		WP_CLI::warning( "{$type} {$item['slug']} was saved with slug '{$slug}' — another entry already uses it." );
	}
	return array( $id, isset( $post['ID'] ) ? 'updated' : 'created' );
}

$nyc_counts = array();
$nyc_count  = static function ( string $type, string $action ) use ( &$nyc_counts ) {
	$nyc_counts[ $type ][ $action ] = ( $nyc_counts[ $type ][ $action ] ?? 0 ) + 1;
};

// ── Services: categories first, so treatments can point at their parent ────
$nyc_services = $nyc_data['services'];
usort( $nyc_services, static fn( $a, $b ) => ( '' === $a['parent'] ? 0 : 1 ) <=> ( '' === $b['parent'] ? 0 : 1 ) );
$nyc_service_ids = array();

foreach ( $nyc_services as $nyc_s ) {
	$nyc_parent = '' === $nyc_s['parent'] ? 0 : ( $nyc_service_ids[ $nyc_s['parent'] ] ?? 0 );
	if ( '' !== $nyc_s['parent'] && ! $nyc_parent ) {
		WP_CLI::warning( "Service {$nyc_s['slug']}: parent '{$nyc_s['parent']}' not found." );
	}
	$nyc_fields          = $nyc_s['fields'];
	$nyc_fields['image'] = nyc_import_image( $nyc_dir, $nyc_s['image'] );

	[ $nyc_id, $nyc_action ] = nyc_import_entry(
		'service',
		$nyc_s,
		$nyc_parent,
		$nyc_fields,
		$nyc_update,
		static function ( int $id ) use ( $nyc_s, $nyc_dir ) {
			$showcase = array_map(
				static fn( $row ) => array(
					'title_th' => $row['title_th'],
					'title_en' => $row['title_en'],
					'image'    => nyc_import_image( $nyc_dir, $row['image'] ) ?: '',
				),
				$nyc_s['showcase']
			);
			// Same storage as the repeater meta box (inc/repeater.php).
			update_post_meta( $id, 'facts', wp_slash( wp_json_encode( $nyc_s['facts'], JSON_UNESCAPED_UNICODE ) ) );
			update_post_meta( $id, 'showcase', wp_slash( wp_json_encode( $showcase, JSON_UNESCAPED_UNICODE ) ) );
		}
	);
	$nyc_service_ids[ $nyc_s['slug'] ] = $nyc_id;
	$nyc_count( 'service', $nyc_action );
}

// ── FAQs ────────────────────────────────────────────────────────────────────
foreach ( $nyc_data['faqs'] as $nyc_f ) {
	$nyc_fields             = $nyc_f['fields'];
	$nyc_fields['services'] = array_values(
		array_filter( array_map( static fn( $slug ) => $nyc_service_ids[ $slug ] ?? 0, $nyc_f['services'] ) )
	);
	[ , $nyc_action ]       = nyc_import_entry( 'faq', $nyc_f, 0, $nyc_fields, $nyc_update );
	$nyc_count( 'faq', $nyc_action );
}

foreach ( $nyc_counts as $nyc_type => $nyc_by_action ) {
	$nyc_parts = array();
	foreach ( $nyc_by_action as $nyc_action => $nyc_n ) {
		$nyc_parts[] = "{$nyc_n} {$nyc_action}";
	}
	WP_CLI::log( str_pad( $nyc_type, 8 ) . implode( ', ', $nyc_parts ) );
}
WP_CLI::success( $nyc_update ? 'Import finished (update mode).' : 'Import finished. Existing entries were left as they were.' );
