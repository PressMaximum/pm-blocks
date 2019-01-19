import CSSRulerControl from '../cssruler/index';
import ColorPickerControl from '../color-picker/index';

const { __ } = wp.i18n; 
const { registerBlockType } = wp.blocks;
const {
	InspectorControls,
} = wp.editor;

const { PanelBody, RangeControl } = wp.components;

registerBlockType( 'pm-blocks/test-live-css-border', {
	title: __( 'PM CSS: Border' ), 
	icon: 'shield',
	category: 'common',
	keywords: [
		__( 'Border' ),
		__( 'PM Border' ),
	],
	attributes: {
		border: {
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
		const { border, divHeight } = props.attributes;
		
		return (
			<div className={ props.className }>
				<InspectorControls>
					<PanelBody title={ __( 'Border Settings' ) }>
						<BorderBoxControl value={borderBox} onBorderBoxChange={new_value => {setAttributes({borderBox:new_value});}}/>
						<RangeControl
							label="Height"
							value={ divHeight }
							onChange={ ( new_value ) => setAttributes( { divHeight: new_value } ) }
							min={ 1 }
						/>
					</PanelBody>
				</InspectorControls>
				<div className="border-test">
					<p class="content">Live CSS - Border</p>
				</div>
			</div>
		);
	},

	save: function( props ) {
		return (
			<div className={ props.className }>
				<div className="border-test">
					<p class="content">Live CSS - Border</p>
				</div>
			</div>
		);
	},
} );
