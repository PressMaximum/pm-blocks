<?php
class PM_Blocks_IconPicker {
	public function __construct() {
		// Add ajax handle.
		add_action( 'wp_ajax_pm_blocks_get_fonticon', array( $this, 'ajax_fonticon' ) );
		add_action( 'enqueue_block_assets', array( $this, 'block_assets' ) );
		add_action( 'enqueue_block_editor_assets', array( $this, 'block_editor_assets' ) );
	}

	public function block_assets() {
		wp_enqueue_style(
			'fontawesome-css',
			'https://use.fontawesome.com/releases/v5.6.3/css/all.css',
			array( 'wp-editor' )
		);
	}

	public function block_editor_assets() {
		// Styles.
		wp_enqueue_style(
			'fontawesome-editor-css',
			'https://use.fontawesome.com/releases/v5.6.3/css/all.css',
			array( 'wp-edit-blocks' )
		);
	}
	/**
	 * Ajax fonts
	 */
	public function ajax_fonticon() {
		$fonts = array(
			'fontawesome' => $this->get_font_awesome(),
			// 'ionicons' => $this->get_ion_icon()
		);
		wp_send_json_success( apply_filters( 'pm_blocks/list-fonticon', $fonts ) );
	}
	/**
	 * Get fontawesome icon
	 *
	 * @return array
	 */
	public function get_font_awesome() {
		global $wp_filesystem;
		WP_Filesystem();
		$file = PM_BLOCKS_DIR . '/src/components/icon-picker/font-awesome.json';
		if ( file_exists( $file ) ) {
			$file_contents = $wp_filesystem->get_contents( $file );
			return json_decode( $file_contents, true );
		}
		return array();
	}

	/**
	 * Get ionicon
	 *
	 * @return array
	 */
	public function get_ion_icon() {
		global $wp_filesystem;
		WP_Filesystem();
		$file = PM_BLOCKS_DIR . '/src/components/icon-picker/ionicons.json';
		if ( file_exists( $file ) ) {
			$file_contents = $wp_filesystem->get_contents( $file );
			return json_decode( $file_contents, true );
		}
		return array();
	}

}
new PM_Blocks_IconPicker();
