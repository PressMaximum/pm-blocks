<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function pm_blocks_cgb_block_assets() { // phpcs:ignore
	// Styles.
	wp_enqueue_style(
		'pm_blocks-cgb-style-css', // Handle.
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ), // Block style CSS.
		array( 'wp-editor' ) // Dependency to include the CSS after it.
		// filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' ) // Version: File modification time.
	);

	if ( is_single() || is_page() ) {
		global $post;
		if ( $post->ID ) {
			$value = get_post_meta( $post->ID, '_pm_blocks_style_css', true );
			if ( ! empty( $value ) ) {
				wp_add_inline_style( 'pm_blocks-cgb-style-css', $value );
			}
		}
	}
}

// Hook: Frontend assets.
add_action( 'enqueue_block_assets', 'pm_blocks_cgb_block_assets' );

/**
 * Enqueue Gutenberg block assets for backend editor.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function pm_blocks_cgb_editor_assets() { // phpcs:ignore
	// Scripts.
	
	wp_enqueue_script(
		'pm_blocks-cgb-block-js', // Handle.
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ), // Dependencies, defined above.
		// filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: File modification time.
		true // Enqueue the script in the footer.
	);

	wp_localize_script(
		'pm_blocks-cgb-block-js',
		'pm_blocks_js',
		array(
			'ajaxurl'  => admin_url( 'admin-ajax.php' ),
		)
	);

	// Styles.
	wp_enqueue_style(
		'pm_blocks-cgb-block-editor-css', // Handle.
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ), // Block editor CSS.
		array( 'wp-edit-blocks' ) // Dependency to include the CSS after it.
		// filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' ) // Version: File modification time.
	);

	global $pagenow;
	if ( ( 'post.php' == $pagenow ) || ( get_post_type() == 'post' ) ) {
		global $post;
		if ( $post->ID ) {
			$css_saved = get_post_meta( 'pm_style_css', $post->ID, true );
			if ( ! empty( $css_saved ) ) {
				wp_add_inline_style( 'pm_blocks-cgb-block-editor-css', $css_saved );
			}
		}
	}
}

// Hook: Editor assets.
add_action( 'enqueue_block_editor_assets', 'pm_blocks_cgb_editor_assets' );


function pm_blocks_init() {
	register_meta(
		'post',
		'pm_style_css',
		array(
			'show_in_rest' => true,
		)
	);
	register_meta(
		'post',
		'_pm_blocks_style_css',
		array(
			'show_in_rest' => true,
		)
	);

}
add_action( 'init', 'pm_blocks_init' );


