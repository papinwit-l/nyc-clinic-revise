<?php
/**
 * Repeater field — the one piece of custom field UI (admin doc §4).
 *
 * For variable-length lists whose fields must stay together, which Pods' free
 * "simple repeatable" fields can't do. Each row holds BOTH languages, so
 * deleting a row can never shift Thai out of line with English.
 *
 * Storage: one post-meta key holding a JSON array of rows.
 * REST:    a field of the same name, rows decoded, image IDs resolved to
 *          { id, url, width, height, alt } (see nyc_image()).
 */

defined( 'ABSPATH' ) || exit;

/**
 * Declared uses. Column types: 'text' (one line), 'image' (attachment ID).
 */
function nyc_repeaters(): array {
	return [
		'doctor'  => [
			'credentials' => [
				'label'   => 'Credentials',
				'help'    => 'One credential per row, both languages side by side.',
				'columns' => [
					'th' => [ 'Credential (TH)', 'text' ],
					'en' => [ 'Credential (EN)', 'text' ],
				],
			],
		],
		'service' => [
			'facts'    => [
				'label'   => 'Quick facts',
				'help'    => 'Short stat row on the service page — e.g. Duration / 20 minutes. Keep to about 3–4.',
				'columns' => [
					'label_th' => [ 'Label (TH)', 'text' ],
					'label_en' => [ 'Label (EN)', 'text' ],
					'value_th' => [ 'Value (TH)', 'text' ],
					'value_en' => [ 'Value (EN)', 'text' ],
				],
			],
			'showcase' => [
				'label'   => 'Results showcase',
				'help'    => 'Shapes or concerns this service treats, each with a photo. A row without a photo shows a placeholder.',
				'columns' => [
					'title_th' => [ 'Title (TH)', 'text' ],
					'title_en' => [ 'Title (EN)', 'text' ],
					'image'    => [ 'Photo', 'image' ],
				],
			],
		],
	];
}

/** Decoded rows for a post. Always an array. */
function nyc_repeater_rows( int $post_id, string $key ): array {
	$rows = json_decode( (string) get_post_meta( $post_id, $key, true ), true );
	return is_array( $rows ) ? array_values( array_filter( $rows, 'is_array' ) ) : [];
}

// ── Meta boxes ──────────────────────────────────────────────────────────────
add_action(
	'add_meta_boxes',
	static function ( $post_type ) {
		foreach ( nyc_repeaters()[ $post_type ] ?? [] as $key => $def ) {
			add_meta_box(
				"nyc-repeater-{$key}",
				$def['label'],
				'nyc_repeater_box',
				$post_type,
				'normal',
				'default',
				[ 'key' => $key, 'def' => $def ]
			);
		}
	}
);

function nyc_repeater_box( WP_Post $post, array $box ): void {
	$key  = $box['args']['key'];
	$def  = $box['args']['def'];
	$rows = nyc_repeater_rows( $post->ID, $key );

	wp_nonce_field( "nyc_repeater_{$key}", "nyc_repeater_{$key}_nonce" );

	$config = [
		'key'     => $key,
		'columns' => array_map( static fn( $c ) => [ 'label' => $c[0], 'type' => $c[1] ], $def['columns'] ),
		'rows'    => array_map(
			static function ( $row ) use ( $def ) {
				$out = [];
				foreach ( $def['columns'] as $col => [ , $type ] ) {
					$val = $row[ $col ] ?? '';
					if ( 'image' === $type && $val ) {
						$out[ $col ] = [ 'id' => (int) $val, 'thumb' => wp_get_attachment_image_url( (int) $val, 'thumbnail' ) ?: '' ];
					} else {
						$out[ $col ] = (string) $val;
					}
				}
				return $out;
			},
			$rows
		),
	];

	printf( '<p class="description">%s</p>', esc_html( $def['help'] ) );
	// The hidden input starts with the stored rows, not empty: if the script
	// ever fails to load, saving the post round-trips the data unchanged
	// instead of wiping it.
	printf(
		'<div class="nyc-repeater" data-config="%s"></div><input type="hidden" name="nyc_repeater[%s]" value="%s" class="nyc-repeater-value">',
		esc_attr( wp_json_encode( $config ) ),
		esc_attr( $key ),
		esc_attr( wp_json_encode( $rows, JSON_UNESCAPED_UNICODE ) )
	);
}

add_action(
	'admin_enqueue_scripts',
	static function ( $hook ) {
		if ( ! in_array( $hook, [ 'post.php', 'post-new.php' ], true ) ) {
			return;
		}
		$screen = get_current_screen();
		if ( ! $screen || empty( nyc_repeaters()[ $screen->post_type ] ) ) {
			return;
		}
		wp_enqueue_media();
		wp_enqueue_script( 'nyc-repeater', NYC_CORE_URL . '/assets/repeater.js', [ 'jquery', 'jquery-ui-sortable' ], NYC_CORE_VERSION, true );
		wp_enqueue_style( 'nyc-repeater', NYC_CORE_URL . '/assets/repeater.css', [], NYC_CORE_VERSION );
	}
);

// ── Save ────────────────────────────────────────────────────────────────────
add_action(
	'save_post',
	static function ( int $post_id, WP_Post $post ) {
		$defs = nyc_repeaters()[ $post->post_type ] ?? [];
		if ( ! $defs || wp_is_post_revision( $post_id ) || wp_is_post_autosave( $post_id ) ) {
			return;
		}
		if ( ! current_user_can( 'edit_post', $post_id ) ) {
			return;
		}
		foreach ( $defs as $key => $def ) {
			$nonce = $_POST[ "nyc_repeater_{$key}_nonce" ] ?? '';
			if ( ! isset( $_POST['nyc_repeater'][ $key ] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $nonce ) ), "nyc_repeater_{$key}" ) ) {
				continue;
			}
			$raw  = json_decode( wp_unslash( $_POST['nyc_repeater'][ $key ] ), true ); // phpcs:ignore WordPress.Security.ValidatedSanitizedInput -- sanitised per column below.
			$rows = [];
			foreach ( is_array( $raw ) ? $raw : [] as $row ) {
				$clean = [];
				foreach ( $def['columns'] as $col => [ , $type ] ) {
					$val           = $row[ $col ] ?? '';
					$clean[ $col ] = 'image' === $type
						? ( absint( is_array( $val ) ? ( $val['id'] ?? 0 ) : $val ) ?: '' )
						: sanitize_text_field( (string) $val );
				}
				// Drop rows the editor left completely empty.
				if ( array_filter( $clean, static fn( $v ) => '' !== $v ) ) {
					$rows[] = $clean;
				}
			}
			update_post_meta( $post_id, $key, wp_slash( wp_json_encode( $rows, JSON_UNESCAPED_UNICODE ) ) );
		}
	},
	10,
	2
);

// ── REST ────────────────────────────────────────────────────────────────────
add_action(
	'rest_api_init',
	static function () {
		foreach ( nyc_repeaters() as $post_type => $defs ) {
			foreach ( $defs as $key => $def ) {
				register_rest_field(
					$post_type,
					$key,
					[
						'get_callback' => static function ( $obj ) use ( $key, $def ) {
							return array_map(
								static function ( $row ) use ( $def ) {
									foreach ( $def['columns'] as $col => [ , $type ] ) {
										if ( 'image' === $type ) {
											$row[ $col ] = nyc_image( (int) ( $row[ $col ] ?? 0 ) );
										}
									}
									return $row;
								},
								nyc_repeater_rows( (int) $obj['id'], $key )
							);
						},
						'schema'       => [
							'type'     => 'array',
							'context'  => [ 'view', 'edit' ],
							'readonly' => true,
							'items'    => [ 'type' => 'object' ],
						],
					]
				);
			}
		}
	}
);
