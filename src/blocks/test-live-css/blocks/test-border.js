import CSSRulerControl from '../cssruler/index';
import ColorPickerControl from '../color-picker/index';

const { __ } = wp.i18n; 
const { registerBlockType } = wp.blocks;
const {
	InspectorControls,
} = wp.editor;

const { PanelBody } = wp.components;

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
		uniqueID: {
			type: 'string',
		}
	},
	
	edit: function( props ) {
		const {
			setAttributes
		} = props;
		const { border } = props.attributes;
		
		return (
			<div className={ props.className }>
				<InspectorControls>
					<PanelBody title={ __( 'Border Settings' ) }>
						<BorderBoxControl value={borderBox} onBorderBoxChange={new_value => {setAttributes({borderBox:new_value});}}/>
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
