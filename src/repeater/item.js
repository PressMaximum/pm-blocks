/**
 * Block dependencies
 */

/**
 * Internal block libraries
 */
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { RichText, MediaPlaceholder, MediaUpload, InnerBlocks } = wp.editor;
const { FormFileUpload, Button } = wp.components;
const { Fragment } = wp.element;
const ALLOWED_MEDIA_TYPES = ["image"];

const ALLOWED_BLOCKS = [
	'core/paragraph',
	'core/list',
	'core/button',
	'core/image',
	'core/heading',
	'core/video',
	'core/html',
	'core/code',
	'core/pullquote',
	'core/quote',
	'core/table',

];

/**
 * Register block
 */
export default registerBlockType("pm-block/repeater-item", {
	title: __("Repeater Item", "jsforwpblocks"),
	description: __(
		"How to use the RichText component for building your own editable blocks.",
		"jsforwpblocks"
	),
	category: "common",
	// icon: {
	//     background: 'rgba(254, 243, 224, 0.52)',
	//     src: icon,
	// },
	parent: ['pm-block/repeater'],
	customClassName: false,
	keywords: [__("Repeater", "jsforwpblocks"), __("Item", "jsforwpblocks")],
	attributes: {
		message: {
			type: "string"
		}
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
			<Fragment>
				<div className={ 'pm-repeater-item' }>
					<div>{__("Call to Action", "jsforwpblocks")}</div>
					<MediaUpload
						onSelect={e => console.log("onSelect image", e)}
						type="image"
						value={""}
						render={({ open }) => (
							<Button
								className={"button button-large"}
								onClick={open}
							>
								{__(" Upload Image", "jsforwpblocks")}
							</Button>
						)}
					/>
					<InnerBlocks allowedBlocks={ALLOWED_BLOCKS}/>
				</div>
			</Fragment>
		);
	},
	save: props => {
		const {
			attributes: { message }
		} = props;
		return (
			<div>
				<h2>{__("Call to Action", "jsforwpblocks")}</h2>
				<div class="message-body">{message}</div>
			</div>
		);
	}
});
