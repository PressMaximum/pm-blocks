import BackgroundBoxControl from '../../../components/background-box/index';

const { __ } = wp.i18n; 
const { registerBlockType } = wp.blocks;
const {
	InspectorControls,
} = wp.editor;

const { PanelBody, RangeControl } = wp.components;

registerBlockType( 'pm-blocks/test-live-normal-bg', {
	title: __( 'PM CSS: Normal BG' ), 
	icon: 'shield',
	category: 'common',
	keywords: [
		__( 'Normal BG' ),
		__( 'PM Normal BG' ),
	],
	attributes: {
		normalBG: {
			type: 'object',
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
		const { normalBG, divHeight } = props.attributes;
		
		
		return (
			<div className={ props.className }>
				<InspectorControls>
					<PanelBody title={ __( 'Normal Background Settings' ) }>
						<BackgroundBoxControl value={normalBG} onBackgroundChange={(new_value) => {setAttributes({normalBG:new_value});  }}/>
						<RangeControl
							label="Height"
							value={ divHeight }
							onChange={ ( new_value ) => setAttributes( { divHeight: new_value } ) }
							min={ 1 }
						/>
					</PanelBody>
				</InspectorControls>
				<div className="normal-bg-test" ><p style={{padding: '20px', border: '1px solid #eee'}}>Live CSS Normal BG</p></div>

			</div>
	
		);
	},

	save: function( props ) {
		return (
			<div className={ props.className }>
				<div className="normal-bg-test" ><p style={{padding: '20px', border: '1px solid #eee'}}>Live CSS Normal BG</p></div>
			</div>
		);
	},
} );
