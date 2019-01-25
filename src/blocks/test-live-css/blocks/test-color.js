import ColorPickerControl from '../../../components/color-picker/index';

const { __ } = wp.i18n; 
const { registerBlockType } = wp.blocks;
const {
	InspectorControls,
} = wp.editor;

const { PanelBody, RangeControl } = wp.components;

registerBlockType( 'pm-blocks/test-live-css-color', {
	title: __( 'PM CSS: Color' ), 
	icon: 'shield',
	category: 'common',
	keywords: [
		__( 'Color' ),
		__( 'PM Color' ),
	],
	attributes: {
		color: {
			type: 'object',
		},
		bgColor: {
			type: 'object',
		},
		divHeight: {
			type: 'number'
		},
		uniqueID: {
			type: 'string',
		}
	},
	
	edit: function( props ) {
		const {
			setAttributes
		} = props;
		const { color, bgColor, divHeight } = props.attributes;
		
		
		return (
			<div className={ props.className }>
				<InspectorControls>
					<PanelBody title={ __( 'Color Settings' ) }>
						<ColorPickerControl label={__("Color")} value={color} onColorChangeComplete={(new_color) => setAttributes({color: new_color})} />
						<ColorPickerControl label={__("Background color")} value={bgColor} onColorChangeComplete={(new_color) => setAttributes({bgColor: new_color})} />
						<RangeControl
							label="Height"
							value={ divHeight }
							onChange={ ( new_value ) => setAttributes( { divHeight: new_value } ) }
							min={ 1 }
						/>
					</PanelBody>
				</InspectorControls>
				<div className="color-test"><p>Live CSS Color</p></div>

			</div>
	
		);
	},

	save: function( props ) {
		return (
			<div className={ props.className }>
				<div className="color-test"><p>Live CSS Color</p></div>
			</div>
		);
	},
} );
