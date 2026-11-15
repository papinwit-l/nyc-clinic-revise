<?php
/**
 * One-time import of existing content into the CMS (Nov 2026).
 *
 * Moves content that used to live in src/data/*.ts into WordPress, so
 * editors start from today's site instead of a blank screen. A package holds
 * any of these sections; sections it doesn't contain are left alone:
 *
 *   services, faqs   (nyc-import.zip)          — Services + FAQ round
 *   doctors, awards  (nyc-import-doctors.zip)  — Doctors + Awards round
 *   case_terms, cases, reveals  (nyc-import-cases.zip)  — Before & After round
 *
 * Package layout (built from the codebase):
 *   nyc-import/import.php    this file
 *   nyc-import/import.json   the sections
 *   nyc-import/images/       images the sections use
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
$nyc_sections = array(
	'services' => 'service',
	'faqs'     => 'faq',
	'doctors'  => 'doctor',
	'awards'   => 'award',
	'cases'    => 'case',
	'reveals'  => 'reveal',
);
foreach ( $nyc_sections as $nyc_key => $nyc_type ) {
	if ( isset( $nyc_data[ $nyc_key ] ) && ( ! post_type_exists( $nyc_type ) || ! function_exists( 'pods' ) ) ) {
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

/** Service IDs for slugs: imported in this run, or already in WordPress. */
function nyc_import_service_ids( array $slugs, array $imported ): array {
	$ids = array();
	foreach ( $slugs as $slug ) {
		$id = $imported[ $slug ] ?? nyc_import_find( 'service', $slug );
		if ( $id ) {
			$ids[] = $id;
		} else {
			WP_CLI::warning( "Linked service '{$slug}' not found — import Services first." );
		}
	}
	return $ids;
}

$nyc_counts = array();
$nyc_count  = static function ( string $type, string $action ) use ( &$nyc_counts ) {
	$nyc_counts[ $type ][ $action ] = ( $nyc_counts[ $type ][ $action ] ?? 0 ) + 1;
};

// ── Services: categories first, so treatments can point at their parent ────
$nyc_services = $nyc_data['services'] ?? array();
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
foreach ( $nyc_data['faqs'] ?? array() as $nyc_f ) {
	$nyc_fields             = $nyc_f['fields'];
	$nyc_fields['services'] = nyc_import_service_ids( $nyc_f['services'], $nyc_service_ids );
	[ , $nyc_action ]       = nyc_import_entry( 'faq', $nyc_f, 0, $nyc_fields, $nyc_update );
	$nyc_count( 'faq', $nyc_action );
}

// ── Doctors ─────────────────────────────────────────────────────────────────
foreach ( $nyc_data['doctors'] ?? array() as $nyc_d ) {
	$nyc_fields             = $nyc_d['fields'];
	$nyc_fields['photo']    = nyc_import_image( $nyc_dir, $nyc_d['photo'] );
	$nyc_fields['services'] = nyc_import_service_ids( $nyc_d['services'], $nyc_service_ids );
	[ , $nyc_action ]       = nyc_import_entry(
		'doctor',
		$nyc_d,
		0,
		$nyc_fields,
		$nyc_update,
		static function ( int $id ) use ( $nyc_d ) {
			// Same storage as the repeater meta box (inc/repeater.php).
			update_post_meta( $id, 'credentials', wp_slash( wp_json_encode( $nyc_d['credentials'], JSON_UNESCAPED_UNICODE ) ) );
		}
	);
	$nyc_count( 'doctor', $nyc_action );
}

// ── Awards ──────────────────────────────────────────────────────────────────
foreach ( $nyc_data['awards'] ?? array() as $nyc_a ) {
	$nyc_fields          = $nyc_a['fields'];
	$nyc_fields['image'] = nyc_import_image( $nyc_dir, $nyc_a['image'] );
	[ , $nyc_action ]    = nyc_import_entry( 'award', $nyc_a, 0, $nyc_fields, $nyc_update );
	$nyc_count( 'award', $nyc_action );
}

// ── Before & After: categories (taxonomy terms), then cases and reveals ─────
// Terms are matched by slug and never renamed or re-ordered once they exist
// (unless "update"), so wp-admin edits stay.
$nyc_term_ids = array();
foreach ( $nyc_data['case_terms'] ?? array() as $nyc_t ) {
	$nyc_parent = '' === $nyc_t['parent'] ? 0 : ( $nyc_term_ids[ $nyc_t['parent'] ] ?? 0 );
	$nyc_found  = get_term_by( 'slug', $nyc_t['slug'], 'case_treatment' );
	if ( $nyc_found && ! $nyc_update ) {
		$nyc_term_ids[ $nyc_t['slug'] ] = (int) $nyc_found->term_id;
		$nyc_count( 'category', 'skipped' );
		continue;
	}
	$nyc_args = array( 'slug' => $nyc_t['slug'], 'parent' => $nyc_parent );
	$nyc_res  = $nyc_found
		? wp_update_term( $nyc_found->term_id, 'case_treatment', $nyc_args + array( 'name' => $nyc_t['name_en'] ) )
		: wp_insert_term( $nyc_t['name_en'], 'case_treatment', $nyc_args );
	if ( is_wp_error( $nyc_res ) ) {
		WP_CLI::warning( "Category {$nyc_t['slug']}: " . $nyc_res->get_error_message() );
		$nyc_count( 'category', 'failed' );
		continue;
	}
	$nyc_tid = (int) $nyc_res['term_id'];
	update_term_meta( $nyc_tid, 'name_th', $nyc_t['name_th'] );
	// Drag order (Simple Custom Post Order adds this column).
	global $wpdb;
	if ( $wpdb->get_var( "SHOW COLUMNS FROM {$wpdb->terms} LIKE 'term_order'" ) ) {
		$wpdb->update( $wpdb->terms, array( 'term_order' => (int) $nyc_t['order'] ), array( 'term_id' => $nyc_tid ) );
	}
	$nyc_term_ids[ $nyc_t['slug'] ] = $nyc_tid;
	$nyc_count( 'category', $nyc_found ? 'updated' : 'created' );
}

/** Term IDs for slugs: created in this run, or already in WordPress. */
$nyc_case_terms = static function ( array $slugs ) use ( &$nyc_term_ids ): array {
	$ids = array();
	foreach ( $slugs as $slug ) {
		$term = $nyc_term_ids[ $slug ] ?? ( get_term_by( 'slug', $slug, 'case_treatment' )->term_id ?? 0 );
		if ( $term ) {
			$ids[] = (int) $term;
		} else {
			WP_CLI::warning( "Category '{$slug}' not found." );
		}
	}
	return $ids;
};
$nyc_doctor_id = static function ( string $slug ): int {
	if ( '' === $slug ) {
		return 0;
	}
	$id = nyc_import_find( 'doctor', $slug );
	if ( ! $id ) {
		WP_CLI::warning( "Doctor '{$slug}' not found — import Doctors first." );
	}
	return $id;
};

foreach ( $nyc_data['cases'] ?? array() as $nyc_c ) {
	$nyc_fields           = $nyc_c['fields'];
	$nyc_fields['image']  = nyc_import_image( $nyc_dir, $nyc_c['image'] );
	$nyc_fields['doctor'] = $nyc_doctor_id( $nyc_c['doctor'] );
	$nyc_terms            = $nyc_case_terms( $nyc_c['terms'] );
	[ , $nyc_action ]     = nyc_import_entry(
		'case',
		$nyc_c,
		0,
		$nyc_fields,
		$nyc_update,
		static fn( int $id ) => wp_set_object_terms( $id, $nyc_terms, 'case_treatment' )
	);
	$nyc_count( 'case', $nyc_action );
}

foreach ( $nyc_data['reveals'] ?? array() as $nyc_r ) {
	$nyc_fields                 = $nyc_r['fields'];
	$nyc_fields['before_image'] = nyc_import_image( $nyc_dir, $nyc_r['before_image'] );
	$nyc_fields['after_image']  = nyc_import_image( $nyc_dir, $nyc_r['after_image'] );
	$nyc_fields['doctor']       = $nyc_doctor_id( $nyc_r['doctor'] );
	$nyc_terms                  = $nyc_case_terms( $nyc_r['terms'] );
	[ , $nyc_action ]           = nyc_import_entry(
		'reveal',
		$nyc_r,
		0,
		$nyc_fields,
		$nyc_update,
		static fn( int $id ) => wp_set_object_terms( $id, $nyc_terms, 'case_treatment' )
	);
	$nyc_count( 'reveal', $nyc_action );
}

foreach ( $nyc_counts as $nyc_type => $nyc_by_action ) {
	$nyc_parts = array();
	foreach ( $nyc_by_action as $nyc_action => $nyc_n ) {
		$nyc_parts[] = "{$nyc_n} {$nyc_action}";
	}
	WP_CLI::log( str_pad( $nyc_type, 8 ) . implode( ', ', $nyc_parts ) );
}
WP_CLI::success( $nyc_update ? 'Import finished (update mode).' : 'Import finished. Existing entries were left as they were.' );
