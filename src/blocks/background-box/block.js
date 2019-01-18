import './style.scss';
import './editor.scss';

import BackgroundBoxControl from '../../components/background-box/index';

const { __ } = wp.i18n; 
const { registerBlockType } = wp.blocks;

registerBlockType( 'pm-blocks/block-background-box', {
	title: __( 'PM Background Box' ), 
	icon: 'shield',
	category: 'common',
	keywords: [
		__( 'Background' ), 
		__( 'Background Box' ), 
		__( 'PM Background Box' ),
	],
	attributes: {
		background_box: {
			type: 'object',
		}
	},
	
	edit: function( props ) {
		const {
			setAttributes
		} = props;
		const { background_box } = props.attributes;
	
		
		return (
			<div className={ props.className }>
				<BackgroundBoxControl value={background_box} onBackgroundChange={(new_value) => {setAttributes({background_box:new_value});  }}/>
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
