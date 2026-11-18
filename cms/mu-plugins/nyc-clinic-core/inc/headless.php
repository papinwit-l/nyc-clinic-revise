<?php
/**
 * WordPress is admin-only. The public site is the Next.js app.
 */

defined( 'ABSPATH' ) || exit;

/** Absolute frontend origin, no trailing slash. */
function nyc_frontend_url(): string {
	return untrailingslashit( defined( 'NYC_FRONTEND_URL' ) ? NYC_FRONTEND_URL : 'https://nyc-clinic.com' );
}

// Any front-end page view (not admin, REST, login, cron or AJAX) → the real site.
// Media files are served by the web server directly and never reach this.
add_action(
	'template_redirect',
	static function () {
		if ( is_admin() || wp_doing_ajax() || wp_doing_cron() || ( defined( 'REST_REQUEST' ) && REST_REQUEST ) ) {
			return;
		}
		wp_redirect( nyc_frontend_url() . '/', 301, 'NYC Clinic CMS' );
		exit;
	},
	0
);

// No XML-RPC, no pingbacks.
add_filter( 'xmlrpc_enabled', '__return_false' );
add_filter( 'xmlrpc_methods', '__return_empty_array' );
add_filter( 'wp_headers', static fn( $h ) => array_diff_key( $h, [ 'X-Pingback' => 1 ] ) );

// Don't let the REST API list user accounts (author names, login slugs) to the public.
add_filter(
	'rest_endpoints',
	static function ( $endpoints ) {
		if ( current_user_can( 'list_users' ) ) {
			return $endpoints;
		}
		foreach ( array_keys( $endpoints ) as $route ) {
			if ( str_starts_with( $route, '/wp/v2/users' ) ) {
				unset( $endpoints[ $route ] );
			}
		}
		return $endpoints;
	}
);

// Comments are off everywhere: bookings happen in LINE, and a headless site renders none.
add_action(
	'init',
	static function () {
		foreach ( get_post_types() as $type ) {
			if ( post_type_supports( $type, 'comments' ) ) {
				remove_post_type_support( $type, 'comments' );
				remove_post_type_support( $type, 'trackbacks' );
			}
		}
	},
	100
);
add_filter( 'comments_open', '__return_false', 20 );
add_filter( 'pings_open', '__return_false', 20 );
add_filter( 'comments_array', '__return_empty_array', 20 );
add_action(
	'admin_menu',
	static function () {
		remove_menu_page( 'edit-comments.php' );
	},
	999
);
add_action(
	'admin_bar_menu',
	static function ( $bar ) {
		$bar->remove_node( 'comments' );
	},
	999
);

// "View" links in wp-admin point at a CMS URL that only redirects. Send them
// to the matching page on the real site where one exists.
add_filter(
	'post_type_link',
	'nyc_frontend_permalink',
	10,
	2
);
add_filter(
	'post_link',
	'nyc_frontend_permalink',
	10,
	2
);
add_filter(
	'page_link',
	'nyc_frontend_permalink',
	10,
	2
);

/** Map a post to its URL on the Next.js site (Thai is the primary locale). */
function nyc_frontend_permalink( $link, $post ) {
	$post = get_post( $post );
	if ( ! $post || 'publish' !== $post->post_status ) {
		return $link;
	}
	$base = nyc_frontend_url() . '/th';
	switch ( $post->post_type ) {
		case 'post':
			return "{$base}/blog/{$post->post_name}";
		case 'page':
			return "{$base}/{$post->post_name}";
		case 'service':
			return "{$base}/services/{$post->post_name}";
		case 'promotion':
			return "{$base}/promotions";
		case 'doctor':
			return "{$base}/doctors";
		case 'faq':
			return "{$base}/faq";
		default:
			return $link;
	}
}
