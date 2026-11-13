<?php
/**
 * REST shaping for the Next.js fetchers.
 *
 *  - /wp/v2/{type}?orderby=menu_order on every drag-ordered type
 *  - Pods image fields → { id, url, width, height, alt } (one shape everywhere)
 *  - Pods booleans → true/false
 *  - GET /nyc/v1/site → { settings, home, about } for the Page Manage screens
 */

defined( 'ABSPATH' ) || exit;

/** One image shape for every image the frontend receives. Null when missing. */
function nyc_image( int $id ): ?array {
	if ( ! $id || 'attachment' !== get_post_type( $id ) ) {
		return null;
	}
	$meta = wp_get_attachment_metadata( $id );
	return [
		'id'     => $id,
		'url'    => wp_get_attachment_url( $id ),
		'width'  => (int) ( $meta['width'] ?? 0 ),
		'height' => (int) ( $meta['height'] ?? 0 ),
		'alt'    => (string) get_post_meta( $id, '_wp_attachment_image_alt', true ),
	];
}

/**
 * Field types per pod, read from config/pods.json once per request:
 * [ pod => [ field => [ 'type' => ..., 'multi' => bool ] ] ].
 */
function nyc_pod_fields(): array {
	static $map = null;
	if ( null !== $map ) {
		return $map;
	}
	$map    = [];
	$config = json_decode( (string) file_get_contents( NYC_CORE_DIR . '/config/pods.json' ), true );
	foreach ( $config['pods'] ?? [] as $pod ) {
		foreach ( $pod['groups'] ?? [] as $group ) {
			foreach ( $group['fields'] ?? [] as $field ) {
				$map[ $pod['name'] ][ $field['name'] ] = [
					'type'        => $field['type'],
					'multi'       => 'multi' === ( $field['file_format_type'] ?? $field['pick_format_type'] ?? '' ),
					'pick_object' => $field['pick_object'] ?? '',
				];
			}
		}
	}
	return $map;
}

/** Attachment IDs stored for a Pods file field on a post, in editor order. */
function nyc_file_ids( int $post_id, string $field ): array {
	// Pods keeps the ordered list in "_pods_{field}"; the plain meta rows are unordered.
	$ordered = get_post_meta( $post_id, "_pods_{$field}", true );
	$ids     = is_array( $ordered ) && $ordered ? $ordered : get_post_meta( $post_id, $field );
	return array_values( array_filter( array_map( 'absint', (array) $ids ) ) );
}

/** Related post IDs for a Pods relationship field, in editor order. */
function nyc_rel_ids( int $post_id, string $field ): array {
	return nyc_file_ids( $post_id, $field );
}

// ── menu_order sorting ──────────────────────────────────────────────────────
add_action(
	'init',
	static function () {
		foreach ( NYC_ORDERED_TYPES as $type ) {
			add_filter(
				"rest_{$type}_collection_params",
				static function ( $params ) {
					if ( isset( $params['orderby']['enum'] ) && ! in_array( 'menu_order', $params['orderby']['enum'], true ) ) {
						$params['orderby']['enum'][] = 'menu_order';
					}
					return $params;
				}
			);
		}
	},
	100
);

// ── Normalise Pods fields in post responses ─────────────────────────────────
add_action(
	'rest_api_init',
	static function () {
		foreach ( nyc_pod_fields() as $pod => $fields ) {
			if ( ! post_type_exists( $pod ) ) {
				continue;
			}
			add_filter(
				"rest_prepare_{$pod}",
				static function ( WP_REST_Response $response, WP_Post $post ) use ( $fields ) {
					$data = $response->get_data();
					foreach ( $fields as $name => $def ) {
						switch ( $def['type'] ) {
							case 'file':
								$images        = array_values( array_filter( array_map( 'nyc_image', nyc_file_ids( $post->ID, $name ) ) ) );
								$data[ $name ] = $def['multi'] ? $images : ( $images[0] ?? null );
								break;
							case 'pick':
								if ( 'custom-simple' === $def['pick_object'] ) {
									// Single dropdowns come back from Pods as a one-item array.
									if ( ! $def['multi'] && is_array( $data[ $name ] ?? null ) ) {
										$data[ $name ] = (string) ( $data[ $name ][0] ?? '' );
									}
									break;
								}
								$ids = nyc_rel_ids( $post->ID, $name );
								if ( $ids || array_key_exists( $name, $data ) ) {
									$data[ $name ] = $def['multi'] ? $ids : ( $ids[0] ?? null );
								}
								break;
							case 'boolean':
								$data[ $name ] = (bool) (int) get_post_meta( $post->ID, $name, true );
								break;
						}
					}
					$response->set_data( $data );
					return $response;
				},
				20,
				2
			);
		}
	}
);

// ── /nyc/v1/site ────────────────────────────────────────────────────────────
add_action(
	'rest_api_init',
	static function () {
		register_rest_route(
			'nyc/v1',
			'/site',
			[
				'methods'             => 'GET',
				'permission_callback' => '__return_true',
				'callback'            => static fn() => rest_ensure_response(
					[
						'settings' => nyc_settings_values( 'nyc_site' ),
						'home'     => nyc_settings_values( 'nyc_home' ),
						'about'    => nyc_settings_values( 'nyc_about' ),
					]
				),
			]
		);
	}
);

/** All fields of a settings pod as a flat array, images resolved. */
function nyc_settings_values( string $pod ): array {
	$out = [];
	foreach ( nyc_pod_fields()[ $pod ] ?? [] as $name => $def ) {
		$raw = get_option( "{$pod}_{$name}", '' );
		switch ( $def['type'] ) {
			case 'file':
				// Ordered list lives in "_pods_{pod}_{field}" for settings pods.
				$ordered = get_option( "_pods_{$pod}_{$name}", '' );
				$ids     = array_values( array_filter( array_map( 'absint', (array) ( is_array( $ordered ) && $ordered ? $ordered : $raw ) ) ) );
				$images  = array_values( array_filter( array_map( 'nyc_image', $ids ) ) );
				$out[ $name ] = $def['multi'] ? $images : ( $images[0] ?? null );
				break;
			case 'number':
				$out[ $name ] = '' === $raw || null === $raw ? null : (float) $raw;
				break;
			case 'boolean':
				$out[ $name ] = (bool) (int) $raw;
				break;
			default:
				$out[ $name ] = is_string( $raw ) ? $raw : '';
		}
	}
	return $out;
}
