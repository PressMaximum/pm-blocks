<?php
class PM_Blocks_Meta_Box {
	public $metabox_id;
	public $support_post_types;

	public function __construct() {
		$this->metabox_id = 'pmblock_style_css';
		$this->support_post_types = apply_filters( 'pm_metabox_style_css_support_post_types', array( 'post', 'page' ) );

		add_action( 'add_meta_boxes', array( $this, 'add' ), PHP_INT_MAX );
		add_action( 'save_post', array( $this, 'save' ) );
		add_action( 'init', array( $this, 'init' ) );

		add_filter( 'default_hidden_meta_boxes', array( $this, 'hidden_meta_boxes' ), PHP_INT_MAX, 2 );
		add_filter( 'hidden_meta_boxes', array( $this, 'hidden_meta_boxes' ), PHP_INT_MAX, 2 );
	}

	/**
	 * Add metabox default hidden.
	 *
	 * @param array  $hidden
	 * @param object $screen
	 * @return array
	 */
	public function hidden_meta_boxes( $hidden, $screen ) {
		$hidden[] = $this->metabox_id;
		return $hidden;
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
			$this->metabox_id,
			esc_html__( 'PM CSS', 'pm-blocks' ),
			array( $this, 'html' ),
			$this->support_post_types,
			'normal',
			'default'
		);
	}

	public function save( $post_id ) {
		$style_css = ( isset( $_POST['pm_blocks_style_css'] ) && sanitize_text_field( wp_unslash( $_POST['pm_blocks_style_css'] ) ) ) ? sanitize_text_field( wp_unslash( $_POST['pm_blocks_style_css'] ) ) : '';
		if ( '' !== $style_css ) {
			update_post_meta(
				$post_id,
				'_pm_blocks_style_css',
				$style_css
			);
		}

		$maybe_gfont_url = ( isset( $_POST['pm_blocks_maybe_gfont_url'] ) && sanitize_text_field( wp_unslash( $_POST['pm_blocks_maybe_gfont_url'] ) ) ) ? sanitize_text_field( wp_unslash( $_POST['pm_blocks_maybe_gfont_url'] ) ) : '';
		if ( '' !== $maybe_gfont_url ) {
			update_post_meta(
				$post_id,
				'_pm_blocks_maybe_gfont_url',
				$maybe_gfont_url
			);
		}

		$custom_css = ( isset( $_POST['pm_blocks_custom_css'] ) && sanitize_text_field( wp_unslash( $_POST['pm_blocks_custom_css'] ) ) ) ? sanitize_text_field( wp_unslash( $_POST['pm_blocks_custom_css'] ) ) : '';
		if ( '' !== $custom_css ) {
			update_post_meta(
				$post_id,
				'_pm_blocks_custom_css',
				$custom_css
			);
		}
	}

	public function html( $post ) {
		$value = get_post_meta( $post->ID, '_pm_blocks_style_css', true );
		$custom_css = get_post_meta( $post->ID, '_pm_blocks_custom_css', true );
		$maybe_gfont_url = get_post_meta( $post->ID, '_pm_blocks_maybe_gfont_url', true );
		?>
		<div class="components-base-control">
			<div class="components-base-control__field">
				<label class="components-base-control__label" for="inspector-select-control-0"><?php echo esc_html__( 'Custom CSS for blocks', 'pm-blocks' ); ?></label>
				<textarea name="pm_blocks_custom_css" id="pm_blocks_custom_css" style="width: 100%;min-height: 200px;"><?php echo esc_attr( $custom_css ); ?></textarea>
			</div>
		</div>

		<input type="hidden" name="pm_blocks_style_css" id="pm_blocks_style_css" class="postbox" value="<?php echo esc_attr( $value ); ?>" />
		<input type="hidden" name="pm_blocks_maybe_gfont_url" id="pm_blocks_maybe_gfont_url" class="postbox" value="<?php echo esc_attr( $maybe_gfont_url ); ?>" />
		<?php
	}

}

new PM_Blocks_Meta_Box();
