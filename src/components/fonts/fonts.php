<?php
class PM_Blocks_Fonts {
	public function __construct() {
		// Add ajax handle.
		add_action( 'wp_ajax_pm_blocks_get_fonts', array( $this, 'ajax_fonts' ) );
	}
	/**
	 * Ajax fonts
	 */
	public function ajax_fonts() {
		$fonts = array(
			'normal' => array(
				'title' => __( 'Default Web Fonts', 'pm_blocks' ),
				'fonts' => $this->get_normal_fonts(),
			),
			'google' => array(
				'title' => __( 'Google Web Fonts', 'pm_blocks' ),
				'fonts' => $this->get_google_fonts(),
			),
		);
		wp_send_json_success( apply_filters( 'pm_blocks/list-fonts', $fonts ) );
	}
	/**
	 * Get Google WebFont fonts from json file
	 *
	 * @return array
	 */
	public function get_google_fonts() {
		global $wp_filesystem;
		WP_Filesystem();
		$file = PM_BLOCKS_DIR . '/src/components/fonts/google-fonts.json';
		if ( file_exists( $file ) ) {
			$file_contents = $wp_filesystem->get_contents( $file );
			return json_decode( $file_contents, true );
		}
		return array();
	}
	/**
	 * Default fonts
	 *
	 * @return array
	 */
	public function get_normal_fonts() {
		$font_variants = array(
			'100',
			'100italic',
			'200',
			'200italic',
			'300',
			'300italic',
			'regular',
			'italic',
			'500',
			'500italic',
			'600',
			'600italic',
			'700',
			'700italic',
			'800',
			'800italic',
			'900',
			'900italic',
		);
		$fonts = array(
			'Arial' => array(
				'family' => 'Arial',
				'category' => 'sans-serif',
				//'variants' => $font_variants,
			),
			'Baskerville' => array(
				'family' => 'Baskerville',
				'category' => 'serif',
				//'variants' => $font_variants,
			),
			'Palatino' => array(
				'family' => 'Palatino',
				'category' => 'serif',
				//'variants' => $font_variants,
			),
			'Bodoni MT' => array(
				'family' => 'Bodoni MT',
				'category' => 'serif',
				//'variants' => $font_variants,
			),
			'Georgia' => array(
				'family' => 'Georgia',
				'category' => 'serif',
				//'variants' => $font_variants,
			),
			'Century Gothic' => array(
				'family' => 'Century Gothic',
				'category' => 'sans-serif',
				//'variants' => $font_variants,
			),
			'Tahoma' => array(
				'family' => 'Tahoma',
				'category' => 'sans-serif',
				//'variants' => $font_variants,
			),
			'Arial Narrow' => array(
				'family' => 'Arial Narrow',
				'category' => 'sans-serif',
				//'variants' => $font_variants,
			),
			'Trebuchet MS' => array(
				'family' => 'Trebuchet MS',
				'category' => 'sans-serif',
				//'variants' => $font_variants,
			),
			'Consolas' => array(
				'family' => 'Consolas',
				'category' => 'sans-serif',
				//'variants' => $font_variants,
			),
		);
		return $fonts;
	}
}
new PM_Blocks_Fonts();
