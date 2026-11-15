<?php
/**
 * Plugin Name: NYC Clinic — Core
 * Description: Headless CMS glue for nyc-clinic.com: content model (Pods config), revalidation webhook, REST shaping, repeater field, admin tidy-up and the Clinic Editor role.
 * Version:     1.0.0
 * Author:      NYC Clinic
 *
 * Must-use plugin: lives in wp-content/mu-plugins/ and always loads. Source of
 * truth is the Next.js repo (cms/mu-plugins/) — edit there, then deploy.
 *
 * Required wp-config.php constants (see cms/README.md):
 *   NYC_FRONTEND_URL        https://nyc-clinic.com
 *   NYC_REVALIDATE_URL      http://127.0.0.1:3000/api/revalidate
 *   NYC_REVALIDATE_SECRET   long random string, same as REVALIDATE_SECRET in Next.js
 */

defined( 'ABSPATH' ) || exit;

const NYC_CORE_VERSION = '1.0.0';
define( 'NYC_CORE_DIR', __DIR__ . '/nyc-clinic-core' );
define( 'NYC_CORE_URL', content_url( 'mu-plugins/nyc-clinic-core' ) );

/** Post types whose order editors control by dragging (menu_order). */
const NYC_ORDERED_TYPES = [ 'faq', 'promotion', 'doctor', 'award', 'service', 'case', 'reveal', 'hero_slide' ];

/** Settings pages under Page Manage — Pods "settings" pods, stored as options. */
const NYC_SETTINGS_PODS = [ 'nyc_site', 'nyc_home', 'nyc_about' ];

foreach ( [ 'pods', 'headless', 'admin', 'posts', 'repeater', 'rest', 'revalidate' ] as $nyc_core_file ) {
	require NYC_CORE_DIR . "/inc/{$nyc_core_file}.php";
}
unset( $nyc_core_file );
