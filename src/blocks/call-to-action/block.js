/**
 * BLOCK: pm-blocks
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './style.scss';
import './editor.scss';

import CSSRulerDevices from '../../components/cssruler-devices/index';
import BorderBoxControl from '../../components/border-box/index';
import RangeDevicesControl from '../../components/rangecontrol-devices/index';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
const { TextControl, Fragment, InspectorControls, PanelBody, Dashicon } = wp.components;
/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'cgb/block-pm-cta', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'PM Call to Action' ), // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'Call to Action' ),
		__( 'CGB Example' ),
		__( 'create-guten-block' ),
	],
	attributes: { 
		padding: {
			type: 'object',
		},
		margin: {
			type: 'object',
		},
		text: {
			type: 'string',
		},
		cssruler_devices: {
			type: 'object',
		},
		border_box: {
			type: 'object',
		}
	},
	
	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	edit: function( props ) {
		// Creates a <p class='wp-block-cgb-block-pm-blocks'></p>.
		const {
			setAttributes
		} = props;
		const { padding, text, margin, cssruler_devices,border_box } = props.attributes;
		

		return (
			<div className={ props.className }>
				<BorderBoxControl value={border_box} onBorderBoxChange={new_value => {setAttributes({border_box:new_value}); }}/>
				<CSSRulerDevices label="Padding" value={cssruler_devices} onCSSRulerDevicesChange={new_value => {setAttributes({cssruler_devices: new_value})}}/>
				<RangeDevicesControl/>
				<p>— Hello from the backend.</p>
				
				<p>
					CGB BLOCK: <code>pm-blocks</code> is a new Gutenberg block
				</p>
				
			</div>
	
		);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 */
	save: function( props ) {
		return (
			<div>
				<p>— Hello from the frontend.</p>
				<p>
					CGB BLOCK: <code>pm-blocks</code> is a new Gutenberg block.
				</p>
				<p>
					It was created via{ ' ' }
					<code>
						<a href="https://github.com/ahmadawais/create-guten-block">
							create-guten-block
						</a>
					</code>.
				</p>
			</div>
		);
	},
} );
