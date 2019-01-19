
const { __ } = wp.i18n; 
const { registerBlockType } = wp.blocks;
const {
	InspectorControls,
} = wp.editor;

const { PanelBody } = wp.components;

registerBlockType( 'pm-blocks/test-block', {
	title: __( 'PM: Test' ), 
	icon: 'shield',
	category: 'common',
	keywords: [
		__( 'Test' ),
		__( 'PM Test' ),
	],
	attributes: {
		uniqueID: {
			type: 'string',
		}
	},
	
	edit: function( props ) {
		const {
			setAttributes
		} = props;
		const {  } = props.attributes;
		
		return (
			<div className={ props.className }>
				<p>TEST</p>
			</div>
		);
	},

	save: function( props ) {
		return (
			<div className={ props.className }>
				<p>TEST</p>
			</div>
		);
	},
} );
