import BackgroundGradientBoxControl from '../../../components/background-gradient-box/index';

const { __ } = wp.i18n; 
const { registerBlockType } = wp.blocks;
const {
	InspectorControls,
} = wp.editor;

const { PanelBody } = wp.components;

registerBlockType( 'pm-blocks/test-live-gradient-bg', {
	title: __( 'PM CSS: Gradient BG' ), 
	icon: 'shield',
	category: 'common',
	keywords: [
		__( 'Gradient BG' ),
		__( 'PM Gradient BG' ),
	],
	attributes: {
		gradientBG: {
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
		const { gradientBG } = props.attributes;
		
		
		return (
			<div className={ props.className }>
				<InspectorControls>
					<PanelBody title={ __( 'Gradient Background Settings' ) }>
						<BackgroundGradientBoxControl value={gradientBG} onBgGradientChange={(new_value) => {setAttributes({gradientBG:new_value});  }}/>
					</PanelBody>
				</InspectorControls>
				<div className="gradient-bg-test" ><p style={{padding: '20px', border: '1px solid #eee'}}>Live CSS Gradient BG</p></div>

			</div>
	
		);
	},

	save: function( props ) {
		return (
			<div className={ props.className }>
				<div className="gradient-bg-test" ><p style={{padding: '20px', border: '1px solid #eee'}}>Live CSS Gradient BG</p></div>
			</div>
		);
	},
} );
