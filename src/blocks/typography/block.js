import './style.scss';
import './editor.scss';

import TypographyControl from '../../components/typography/index';

const { __ } = wp.i18n; 
const { registerBlockType } = wp.blocks;

registerBlockType( 'pm-blocks/block-typography', {
	title: __( 'PM Typography' ), 
	icon: 'shield',
	category: 'common',
	keywords: [
		__( 'Typo' ), 
		__( 'Typography' ), 
		__( 'PM Typography' ),
	],
	attributes: {
		typography: {
			type: 'object',
		}
	},
	edit: function( props ) {
		const {
			setAttributes
		} = props;
		const { typography } = props.attributes;
		console.log('Saved typography: ', typography );

		return (
			<div className={ props.className }>
				<TypographyControl value={typography} onTypographyChange={(new_value) => {setAttributes({typography:new_value}); console.log('Typography changed: ', new_value) }}/>
				<p>Hello, This is TypographyControl</p>
			</div>
	
		);
	},
	save: function( props ) {
		return (
			<div>
				<p>Hello, This is TypographyControl</p>
			</div>
		);
	},
} );

