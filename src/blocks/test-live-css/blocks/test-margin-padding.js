import CSSRulerControl from '../../../components/cssruler/index';

const { __ } = wp.i18n; 
const { registerBlockType } = wp.blocks;
const {
	InspectorControls,
} = wp.editor;

const { PanelBody } = wp.components;

registerBlockType( 'pm-blocks/test-live-css-spacing', {
	title: __( 'PM CSS: Spacing' ), 
	icon: 'shield',
	category: 'common',
	keywords: [
		__( 'Spacing' ),
		__( 'PM Spacing' ),
	],
	attributes: {
		margin: {
			type: 'object',
		},
		padding: {
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
		const { margin, padding } = props.attributes;
		
		return (
			<div className={ props.className }>
				<InspectorControls>
					<PanelBody title={ __( 'Spacing Settings' ) }>
						<CSSRulerControl value={margin} onCSSRulerChange={ new_margin =>setAttributes({margin: new_margin})}/>
						<CSSRulerControl value={padding} onCSSRulerChange={ new_padding =>setAttributes({padding: new_padding})}/>
					</PanelBody>
				</InspectorControls>
				<div className="spacing-test"><p style={{border: '1px solid #eee'}}>Live CSS Margin - Padding</p></div>
			</div>
		);
	},

	save: function( props ) {
		return (
			<div className={ props.className }>
				<div className="spacing-test"><p style={{border: '1px solid #eee'}}>Live CSS Margin - Padding</p></div>
			</div>
		);
	},
} );
