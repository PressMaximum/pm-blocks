import FontsControl from '../../../components/fonts/index';

const { __ } = wp.i18n; 
const { registerBlockType } = wp.blocks;
const {
	InspectorControls,
} = wp.editor;

const { PanelBody, RangeControl } = wp.components;

registerBlockType( 'pm-blocks/test-live-css-fonts', {
	title: __( 'PM CSS: Fonts' ), 
	icon: 'shield',
	category: 'common',
	keywords: [
		__( 'Fonts' ),
		__( 'PM Fonts' ),
	],
	attributes: {
		fonts: {
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
		const { fonts, divHeight } = props.attributes;
		
		
		return (
			<div className={ props.className }>
				<InspectorControls>
					<PanelBody title={ __( 'Fonts Settings' ) }>
						<FontsControl value={fonts} onFontsChange={(new_value) => {setAttributes({fonts:new_value}); console.log('font value: ', new_value) }}/>
						<RangeControl
							label="Height"
							value={ divHeight }
							onChange={ ( new_value ) => setAttributes( { divHeight: new_value } ) }
							min={ 1 }
						/>
					</PanelBody>
				</InspectorControls>
				<div className="font-test"><p>Live CSS Fonts</p></div>

			</div>
	
		);
	},

	save: function( props ) {
		return (
			<div className={ props.className }>
				<div className="font-test"><p>Live CSS Fonts</p></div>
			</div>
		);
	},
} );
