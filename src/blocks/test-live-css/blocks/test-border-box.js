import BorderBoxControl from '../../../components/border-box/index';

const { __ } = wp.i18n; 
const { registerBlockType } = wp.blocks;
const {
	InspectorControls,
} = wp.editor;

const { PanelBody } = wp.components;

registerBlockType( 'pm-blocks/test-live-css-borderbox', {
	title: __( 'PM CSS: Border Box' ), 
	icon: 'shield',
	category: 'common',
	keywords: [
		__( 'Border Box' ),
		__( 'PM Border Box' ),
	],
	attributes: {
		borderBox: {
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
		const { borderBox } = props.attributes;
		
		return (
			<div className={ props.className }>
				<InspectorControls>
					<PanelBody title={ __( 'Styling Settings' ) }>
						<BorderBoxControl value={borderBox} onBorderBoxChange={new_value => {setAttributes({borderBox:new_value});}}/>
					</PanelBody>
				</InspectorControls>
				<div className="border-box-test">
					<p class="content">Live CSS - Border Box</p>
				</div>
			</div>
		);
	},

	save: function( props ) {
		return (
			<div className={ props.className }>
				<div className="border-box-test">
					<p class="content">Live CSS - Border Box</p>
				</div>
			</div>
		);
	},
} );
