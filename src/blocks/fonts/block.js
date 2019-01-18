import './style.scss';
import './editor.scss';

import FontsControl from '../../components/fonts/index';

const { __ } = wp.i18n; 
const { registerBlockType } = wp.blocks;

registerBlockType( 'pm-blocks/block-fonts', {
	title: __( 'PM Fonts' ), 
	icon: 'shield',
	category: 'common',
	keywords: [
		__( 'Font' ), 
		__( 'Fonts' ), 
		__( 'PM Fonts' ),
	],
	attributes: {
		google_fonts: {
			type: 'object',
		},
		fonts_02: {
			type: 'object',
		}
	},
	edit: function( props ) {
		const {
			setAttributes
		} = props;
		const { google_fonts, fonts_02 } = props.attributes;
		

		return (
			<div className={ props.className }>
				<FontsControl value={google_fonts} onFontsChange={(new_value) => {setAttributes({google_fonts:new_value});  }}/>
				
				<p>Hello, This is FontsControl</p>
			</div>
	
		);
	},
	save: function( props ) {
		return (
			<div>
				<p>Hello, This is FontsControl</p>
			</div>
		);
	},
} );
