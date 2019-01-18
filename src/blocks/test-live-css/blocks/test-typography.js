import TypographyControl from '../../../components/typography/index';

const { __ } = wp.i18n; 
const { registerBlockType } = wp.blocks;
const {
	InspectorControls,
} = wp.editor;

const { PanelBody } = wp.components;

registerBlockType( 'pm-blocks/test-live-css-typo', {
	title: __( 'PM CSS: Typography' ), 
	icon: 'shield',
	category: 'common',
	keywords: [
		__( 'Typo' ),
		__( 'PM Typo' ),
	],
	attributes: {
		typography: {
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
		const { typography } = props.attributes;
		
		return (
			<div className={ props.className }>
				<InspectorControls>
					<PanelBody title={ __( 'Typography Settings' ) }>
						<TypographyControl value={typography} onTypographyChange={(new_value) => {setAttributes({typography:new_value}); }}/>
					</PanelBody>
				</InspectorControls>
				<div className="typo-test">
					<p class="content">Live CSS - Typography</p>
				</div>
			</div>
		);
	},

	save: function( props ) {
		return (
			<div className={ props.className }>
				<div className="typo-test">
					<p class="content">Live CSS - Typography</p>
				</div>
			</div>
		);
	},
} );
