const { __ } = wp.i18n; 
const { registerBlockType } = wp.blocks;
const {
	InspectorControls,
} = wp.editor;

import ColorPickerControl from '../../components/color-picker/index';

const { PanelBody } = wp.components;

registerBlockType( 'pm-blocks/test-components-colorpicker', {
	title: __( 'PM: Test Components ColorPicker' ), 
	icon: 'shield',
	category: 'common',
	keywords: [
		__( 'Test Components ColorPicker' ),
		__( 'PM Test Components ColorPicker' ),
	],
	attributes: {
		uniqueID: {
			type: 'string',
		},
		color_picker: {
			type: 'object'
		},
	},
	
	edit: function( props ) {
		const {
			setAttributes
		} = props;
		const { 
			color_picker,
		} = props.attributes;
		
		return (
			<div className={ props.className }>
				<InspectorControls>
					<PanelBody title={ __( 'Color picker' ) }>
						
						<ColorPickerControl 
							label={__("Color")}
							value={color_picker} 
							onColorChangeComplete={ new_value => setAttributes( { color_picker: new_value} ) } 
						/>
					</PanelBody>
				</InspectorControls>

				<p>Test ColorPicker with defined Palette</p>
			</div>
		);
	},

	save: function( props ) {
		return (
			<div className={ props.className }>
				<p>Test ColorPicker with defined Palette</p>
			</div>
		);
	},
} );
