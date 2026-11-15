<?php
/**
 * wp-admin for non-technical editors: Page Manage menu, menu order, title
 * placeholder, blog post screen, dashboard guide, Clinic Editor role, and the
 * drag-sort plugin's settings.
 */

defined( 'ABSPATH' ) || exit;

// ── One-time setup per plugin version ──────────────────────────────────────
add_action(
	'init',
	static function () {
		if ( get_option( 'nyc_core_version' ) === NYC_CORE_VERSION ) {
			return;
		}
		nyc_setup_role();
		nyc_setup_sort_plugin();
		nyc_setup_blog_categories();
		update_option( 'nyc_core_version', NYC_CORE_VERSION );
	},
	20
);

/**
 * "Clinic Editor": everything an Editor can do with content, plus the three
 * Page Manage screens. No plugins, themes, settings, users or Pods admin.
 */
function nyc_setup_role(): void {
	$editor = get_role( 'editor' );
	if ( ! $editor ) {
		return;
	}
	$caps = $editor->capabilities;
	foreach ( NYC_SETTINGS_PODS as $pod ) {
		$caps[ "pods_edit_{$pod}" ] = true;
	}
	remove_role( 'clinic_editor' );
	add_role( 'clinic_editor', 'Clinic Editor', $caps );

	// Administrators get the Page Manage caps too, so the menu shows for them.
	$admin = get_role( 'administrator' );
	foreach ( NYC_SETTINGS_PODS as $pod ) {
		$admin?->add_cap( "pods_edit_{$pod}" );
	}
}

/** Simple Custom Post Order: which lists are drag-sortable. */
function nyc_setup_sort_plugin(): void {
	$options            = (array) get_option( 'scporder_options', [] );
	$options['objects'] = NYC_ORDERED_TYPES;
	$options['tags']    = [ 'case_treatment' ];
	$options['allowed_roles'] = [ 'administrator', 'clinic_editor' ];
	update_option( 'scporder_options', $options );
}

/** Blog categories the frontend knows about (PostCategory in types/post.ts). */
function nyc_setup_blog_categories(): void {
	foreach ( [ 'Guides', 'Tips', 'News' ] as $name ) {
		if ( ! term_exists( $name, 'category' ) ) {
			wp_insert_term( $name, 'category', [ 'slug' => strtolower( $name ) ] );
		}
	}
	// An article saved without a category lands in Guides, not "Uncategorized",
	// which the frontend has no label for.
	$guides = get_term_by( 'slug', 'guides', 'category' );
	if ( $guides ) {
		update_option( 'default_category', $guides->term_id );
	}
}

// ── Page Manage top-level menu (Pods hangs the settings pages under it) ────
add_action(
	'admin_menu',
	static function () {
		add_menu_page(
			'Page Manage',
			'Page Manage',
			'pods_edit_nyc_site',
			'nyc-page-manage',
			'__return_null',
			'dashicons-admin-site-alt3',
			3
		);
	},
	1
);

// The parent slug has no screen of its own: drop its auto-made first submenu
// and send a click on the parent to Site Settings.
add_action(
	'admin_menu',
	static function () {
		remove_submenu_page( 'nyc-page-manage', 'nyc-page-manage' );
	},
	9999
);
add_action(
	'load-toplevel_page_nyc-page-manage',
	static function () {
		wp_safe_redirect( admin_url( 'admin.php?page=pods-settings-nyc_site' ) );
		exit;
	}
);

// ── Menu order: Page Manage, then content in the order editors think of it ──
add_filter( 'custom_menu_order', '__return_true' );
add_filter(
	'menu_order',
	static fn() => [
		'index.php',
		'nyc-page-manage',
		'edit.php?post_type=hero_slide',
		'separator1',
		'edit.php',
		'edit.php?post_type=promotion',
		'edit.php?post_type=service',
		'edit.php?post_type=doctor',
		'edit.php?post_type=award',
		'edit.php?post_type=case',
		'edit.php?post_type=reveal',
		'edit.php?post_type=faq',
		'edit.php?post_type=page',
		'upload.php',
		'separator2',
	]
);

// Rename "Posts" to "Blog".
add_action(
	'init',
	static function () {
		$labels = get_post_type_object( 'post' )?->labels;
		if ( $labels ) {
			$labels->name          = 'Blog';
			$labels->menu_name     = 'Blog';
			$labels->all_items     = 'All articles';
			$labels->add_new_item  = 'Add article';
			$labels->edit_item     = 'Edit article';
			$labels->singular_name = 'Article';
		}
	},
	99
);

// Editors don't need these.
add_action(
	'admin_menu',
	static function () {
		if ( current_user_can( 'manage_options' ) ) {
			return;
		}
		remove_menu_page( 'tools.php' );
		remove_menu_page( 'themes.php' );
	},
	999
);

// ── Blog post screen: no block editor, no tags ─────────────────────────────
// Articles are the Pods "Article (TH)" / "Article (EN)" editors; the core
// editor would be a third, unused one.
add_action(
	'init',
	static function () {
		remove_post_type_support( 'post', 'editor' );
		remove_post_type_support( 'post', 'excerpt' );
		remove_post_type_support( 'post', 'custom-fields' );
		remove_post_type_support( 'post', 'post-formats' );
		unregister_taxonomy_for_object_type( 'post_tag', 'post' );
	},
	100
);
add_action(
	'admin_menu',
	static function () {
		remove_submenu_page( 'edit.php', 'edit-tags.php?taxonomy=post_tag' );
	},
	999
);

// The core title is the English internal name: it makes the slug and labels the
// admin list. The real titles are the TH/EN fields.
add_filter(
	'enter_title_here',
	static function ( $text, $post ) {
		$types = array_merge( [ 'post', 'faq' ], NYC_ORDERED_TYPES );
		return in_array( $post->post_type, $types, true )
			? 'Internal name in English — used for the web address'
			: $text;
	},
	10,
	2
);

// ── Dashboard: a short "what to edit where" guide ──────────────────────────
add_action(
	'wp_dashboard_setup',
	static function () {
		remove_meta_box( 'dashboard_primary', 'dashboard', 'side' );
		remove_meta_box( 'dashboard_quick_press', 'dashboard', 'side' );
		remove_meta_box( 'dashboard_site_health', 'dashboard', 'normal' );
		wp_add_dashboard_widget( 'nyc_guide', 'NYC Clinic — what to edit where', 'nyc_dashboard_guide' );
	}
);

function nyc_dashboard_guide(): void {
	$rows = [
		[ 'Phone, LINE, address, hours, socials', 'Page Manage → Site Settings' ],
		[ 'Homepage intro video, Trust Bar numbers, clinic intro', 'Page Manage → Home' ],
		[ 'Hero images — desktop and mobile (drag to order)', 'Hero Slides' ],
		[ 'Clinic story, facility photos', 'Page Manage → About' ],
		[ 'Articles', 'Blog' ],
		[ 'Offers (drag to order — the first live one is on the homepage)', 'Promotions' ],
		[ 'Service and treatment pages', 'Services' ],
		[ 'Doctors and awards (drag to order)', 'Doctors · Awards' ],
		[ 'Before & after photos', 'Cases · Reveals' ],
		[ 'Questions — tick services to show a question on those pages too', 'FAQ' ],
	];
	echo '<p>Changes appear on <a href="' . esc_url( nyc_frontend_url() ) . '" target="_blank" rel="noopener">the website</a> within a few seconds of saving.</p>';
	echo '<table class="widefat striped"><tbody>';
	foreach ( $rows as [ $what, $where ] ) {
		echo '<tr><td>' . esc_html( $what ) . '</td><td><strong>' . esc_html( $where ) . '</strong></td></tr>';
	}
	echo '</tbody></table>';
	echo '<p style="margin-top:1em">Every item has Thai and English fields. Thai is enough — if English is empty, the Thai version is shown on the English site.</p>';
}
