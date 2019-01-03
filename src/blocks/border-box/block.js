import './style.scss';
import './editor.scss';

import BorderBoxControl from '../../components/border-box/index';

const { __ } = wp.i18n; 
const { registerBlockType } = wp.blocks;

registerBlockType( 'pm-blocks/block-border-box', {
	title: __( 'PM Border Box' ), 
	icon: 'shield',
	category: 'common',
	keywords: [
		__( 'Border' ), 
		__( 'Border Box' ), 
		__( 'PM Border Box' ),
	],
	attributes: {
		border_box: {
			type: 'object',
		}
	},
	
	edit: function( props ) {
		const {
			setAttributes
		} = props;
		const { border_box } = props.attributes;

		console.log( 'border_box attribute: ', border_box );
		
		return (
			<div className={ props.className }>
				<BorderBoxControl value={border_box} onBorderBoxChange={new_value => {setAttributes({border_box:new_value}); console.log('new border_box: ', new_value)}}/>
				<p>Hello, This is Block Border Box</p>
			</div>
	
		);
	},

	save: function( props ) {
		return (
			<div>
				<p>Hello, This is block border box.</p>
				
			</div>
		);
	},
} );
