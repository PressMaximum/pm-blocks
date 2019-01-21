import ColorPickerPaletteControl from '../../../components/color-picker-palette/index';

const { __ } = wp.i18n; 
const { registerBlockType } = wp.blocks;
const {
	InspectorControls,
} = wp.editor;

const { PanelBody, RangeControl } = wp.components;

registerBlockType( 'pm-blocks/test-live-css-color-palette', {
	title: __( 'PM CSS: Color Palette' ), 
	icon: 'shield',
	category: 'common',
	keywords: [
		__( 'Color Palette' ),
		__( 'PM Color Palette' ),
	],
	attributes: {
		color: {
			type: 'object',
		},
		bgColor: {
			type: 'object',
		},
		uniqueID: {
			type: 'string',
		}
	},
	
	edit: function( props ) {
		const {
			setAttributes
		} = props;
		const { color, bgColor } = props.attributes;
		
		
		return (
			<div className={ props.className }>
				<InspectorControls>
					<PanelBody title={ __( 'Color Settings' ) }>
						<ColorPickerPaletteControl label={__("Color")} value={color} onColorChangeComplete={(new_color) => setAttributes({color: new_color})} />
						<ColorPickerPaletteControl label={__("Background color")} value={bgColor} onColorChangeComplete={(new_color) => setAttributes({bgColor: new_color})} />
					</PanelBody>
				</InspectorControls>
				<div className="color-test"><p>Live CSS Color Palette</p></div>
			</div>
	
		);
	},

	save: function( props ) {
		return (
			<div className={ props.className }>
				<div className="color-test"><p>Live CSS Color Palette</p></div>
			</div>
		);
	},
} );
