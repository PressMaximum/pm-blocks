<?php
class PM_Blocks_Meta_Box {
	public function __construct() {
		add_action( 'add_meta_boxes', array( $this, 'add' ) );
		add_action( 'save_post', array( $this, 'save' ) );
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
	}

	public function html( $post ) {
		$value = get_post_meta( $post->ID, '_pm_blocks_style_css', true );
		?>
		<textarea type="text" name="pm_blocks_style_css" id="pm_blocks_style_css" style="width: 100%;min-height: 200px;" class="postbox"><?php echo esc_attr( $value ); ?></textarea>
		<?php
	}
}

new PM_Blocks_Meta_Box();

