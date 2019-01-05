import './style.scss';
import './editor.scss';

import StylingControl from '../../components/styling/index';

const { __ } = wp.i18n; 
const { registerBlockType } = wp.blocks;

registerBlockType( 'pm-blocks/block-styling', {
	title: __( 'PM Styling' ), 
	icon: 'shield',
	category: 'common',
	keywords: [
		__( 'Styling' ),
		__( 'PM Styling' ),
	],
	attributes: {
		styling: {
			type: 'object',
		}
	},
	
	edit: function( props ) {
		const {
			setAttributes
		} = props;
		const { styling } = props.attributes;
	
		
		return (
			<div className={ props.className }>
				<StylingControl value={styling} onStylingChange={(new_value) => {setAttributes({styling:new_value}); console.log('Styling changed: ', new_value) }}/>
				<p>Hello, This is StylingControl</p>
			</div>
	
		);
	},

	save: function( props ) {
		return (
			<div>
				<p>Hello, This is block StylingControl</p>
			</div>
		);
	},
} );
