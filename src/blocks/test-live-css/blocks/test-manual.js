import CSSRulerControl from '../../../components/cssruler/index';
import ColorPickerControl from '../../../components/color-picker/index';

const { __ } = wp.i18n; 
const { registerBlockType } = wp.blocks;
const {
	InspectorControls,
} = wp.editor;

const { PanelBody, SelectControl, RangeControl } = wp.components;

registerBlockType( 'pm-blocks/test-live-css-manual', {
	title: __( 'PM CSS: Manual' ), 
	icon: 'shield',
	category: 'common',
	keywords: [
		__( 'Manual' ),
		__( 'PM Manual' ),
	],
	attributes: {
		borderStyle: {
			type: 'string',
		},
		borderWidth: {
			type: 'object',
		},
		borderColor: {
			type: 'object',
		},
		borderRadius: {
			type: 'object',
		},
		lineHeight: {
			type: 'string',
		},
		divHeight: {
			type: 'number',
		},
		uniqueID: {
			type: 'string',
		}
	},
	
	edit: function( props ) {
		const {
			setAttributes
		} = props;
		const { borderStyle, borderWidth, borderColor, borderRadius, lineHeight, divHeight } = props.attributes;
		
		return (
			<div className={ props.className }>
				<InspectorControls>
					<PanelBody title={ __( 'Manual Settings' ) }>
						<SelectControl
							label={__("Border style")}
							value={ borderStyle }
							options={ [
								{ label: __( "None"), value: 'none' },
								{ label: __( "Dotted"), value: 'dotted' },
								{ label: __( "Dashed"), value: 'dashed' },
								{ label: __( "Solid"), value: 'solid' },
								{ label: __( "Double"), value: 'double' },
								{ label: __( "Groove"), value: 'groove' },
								{ label: __( "Ridge"), value: 'ridge' },
								{ label: __( "Inset"), value: 'inset' },
								{ label: __( "Outset"), value: 'outset' },
								{ label: __( "Hidden"), value: 'hidden' },
								{ label: __( "Initial"), value: 'initial' },
								{ label: __( "Inherit"), value: 'inherit' },
							] }
							onChange={ new_value => setAttributes( { borderStyle: new_value} ) }
						/>
						
						<CSSRulerControl label={__("Border width") } value={borderWidth} onCSSRulerChange={ new_value => setAttributes( { borderWidth : new_value} ) }/>
						<ColorPickerControl label={__("Color")} disableAlpha="true" value={borderColor} onColorChangeComplete={ new_value => setAttributes( { borderColor : new_value} ) } />
						<CSSRulerControl label={__("Border radius") } value={borderRadius} onCSSRulerChange={ new_value => setAttributes( { borderRadius : new_value} ) }/>

						<RangeControl
							label={__("Line height")}
							value={ lineHeight }
							min={ 0 }
							max={ 100 }
							onChange={ new_value => setAttributes({lineHeight: new_value})}
						/>
						<RangeControl
							label="Height"
							value={ divHeight }
							onChange={ ( new_value ) => setAttributes( { divHeight: new_value } ) }
							min={ 1 }
						/>
					</PanelBody>
				</InspectorControls>

				<div className="manual-test">
					<p class="content">Live CSS - Manual</p>
				</div>
			</div>
		);
	},

	save: function( props ) {
		return (
			<div className={ props.className }>
				<div className="manual-test">
					<p class="content">Live CSS - Manual</p>
				</div>
			</div>
		);
	},
} );
