/**
 * Block dependencies
 */
import "./style.scss";

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText, InnerBlocks } = wp.editor;


const ALLOWED_BLOCKS = [
	'pm-block/repeater-item'
];

/**
 * Register block
 */
export default registerBlockType("pm-block/repeater", {
	title: __("Repeater", "jsforwpblocks"),
	description: __("Column/layout description", "jsforwpblocks"),
	category: "common",
	keywords: [
		__("Repeater", "jsforwpblocks")
	],
	attributes: {
		message: {}
	},

	edit: props => {
		const {
			attributes: { message },
			className,
			setAttributes
		} = props;
		const onChangeMessage = message => {
			setAttributes({ message });
		};

		return (
			<div class="pm-repeater">
				<InnerBlocks allowedBlocks={ALLOWED_BLOCKS} />
			</div>
		);
	},
	save: props => {
		const {
			attributes: { message }
		} = props;
		return (
			<div>
				<InnerBlocks.Content />
			</div>
		);
	}
});
