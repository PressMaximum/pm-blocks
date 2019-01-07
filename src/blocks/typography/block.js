import './style.scss';
import './editor.scss';

import TypographyControl from '../../components/typography/index';

const { __ } = wp.i18n; 
const { registerBlockType } = wp.blocks;
const {
	InspectorControls,
} = wp.editor;

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
		typo: {
			type: 'object',
		}
	},
	edit: function( props ) {
		const {
			setAttributes
		} = props;
		const { typo } = props.attributes;
		console.log('Saved typography: ', typo );

		return (
			<div className={ props.className }>
				<TypographyControl value={typo} onTypographyChange={(new_value) => {setAttributes({typo:new_value}); console.log('Typography changed: ', new_value) }}/>
				<InspectorControls>
					<TypographyControl value={typo} onTypographyChange={(new_value) => {setAttributes({typo:new_value}); console.log('Typography changed: ', new_value) }}/>
				</InspectorControls>
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

