<?php
class PM_Blocks_Meta_Box {
	public function __construct() {
		add_action( 'add_meta_boxes', array( $this, 'add' ) );
		add_action( 'save_post', array( $this, 'save' ) );
		add_action( 'init', array( $this, 'init' ) );
	}

	public function init() {
		register_meta(
			'post',
			'_pm_blocks_style_css',
			array(
				'show_in_rest' => true,
			)
		);
		register_meta(
			'post',
			'_pm_blocks_maybe_gfont_url',
			array(
				'show_in_rest' => true,
			)
		);
	}

	public function add() {
		add_meta_box(
			'pmblock_style_css',
			esc_html__( 'PM Style CSS', 'pm-blocks' ),
			array( $this, 'html' ),
			array( 'post', 'page' ),
			'normal',
			'default'
		);
	}

	public function save( $post_id ) {
		$style_css = ( isset( $_POST['pm_blocks_style_css'] ) && sanitize_text_field( wp_unslash( $_POST['pm_blocks_style_css'] ) ) ) ? sanitize_text_field( wp_unslash( $_POST['pm_blocks_style_css'] ) ) : '';
		update_post_meta(
			$post_id,
			'_pm_blocks_style_css',
			$style_css
		);

		$maybe_gfont_url = ( isset( $_POST['pm_blocks_maybe_gfont_url'] ) && sanitize_text_field( wp_unslash( $_POST['pm_blocks_maybe_gfont_url'] ) ) ) ? sanitize_text_field( wp_unslash( $_POST['pm_blocks_maybe_gfont_url'] ) ) : '';
		update_post_meta(
			$post_id,
			'_pm_blocks_maybe_gfont_url',
			$maybe_gfont_url
		);
	}

	public function html( $post ) {
		$value = get_post_meta( $post->ID, '_pm_blocks_style_css', true );
		$maybe_gfont_url = get_post_meta( $post->ID, '_pm_blocks_maybe_gfont_url', true );
		?>
		<textarea type="text" name="pm_blocks_style_css" id="pm_blocks_style_css" style="width: 100%;min-height: 200px;" class="postbox"><?php echo esc_attr( $value ); ?></textarea>
		<input type="hidden" name="pm_blocks_maybe_gfont_url" id="pm_blocks_maybe_gfont_url" class="postbox" value="<?php echo esc_attr( $maybe_gfont_url ); ?>" />
		<?php
	}
}

new PM_Blocks_Meta_Box();


