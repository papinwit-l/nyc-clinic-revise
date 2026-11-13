<?php
/**
 * Content model: every CPT, taxonomy, field and settings page is defined in
 * config/pods.json and loaded by Pods as a FILE config.
 *
 * Why a file and not the Pods admin UI:
 *   - it is version-controlled with the frontend that reads it
 *   - a fresh server gets the whole model by deploying this folder — no clicking
 *   - Pods shows file-based pods as read-only, so nobody can delete a field the
 *     frontend depends on from wp-admin
 *
 * To change the model: edit pods.json, deploy, then Pods Admin → Settings →
 * Clear Pods Cache.
 */

defined( 'ABSPATH' ) || exit;

add_action(
	'pods_config_pre_load_configs',
	static function ( $handler ) {
		$handler->register_file( NYC_CORE_DIR . '/config/pods.json', 'json' );
	}
);

// Pods missing → say so loudly; nothing in this plugin works without it.
add_action(
	'admin_notices',
	static function () {
		if ( defined( 'PODS_VERSION' ) || ! current_user_can( 'activate_plugins' ) ) {
			return;
		}
		echo '<div class="notice notice-error"><p><strong>NYC Clinic Core:</strong> the Pods plugin is not active. Install and activate Pods — every content type depends on it.</p></div>';
	}
);
