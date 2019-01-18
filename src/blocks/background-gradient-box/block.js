import './style.scss';
import './editor.scss';

import BackgroundGradientBoxControl from '../../components/background-gradient-box/index';

const { __ } = wp.i18n; 
const { registerBlockType } = wp.blocks;

registerBlockType( 'pm-blocks/block-bg-gradient-box', {
	title: __( 'PM Background Gradient Box' ), 
	icon: 'shield',
	category: 'common',
	keywords: [
		__( 'Background Gradient' ), 
		__( 'Background Gradient Box' ), 
		__( 'PM Background Gradient Box' ),
	],
	attributes: {
		bg_gradient_box: {
			type: 'object',
		}
	},
	
	edit: function( props ) {
		const {
			setAttributes
		} = props;
		const { bg_gradient_box } = props.attributes;

		return (
			<div className={ props.className }>
				<BackgroundGradientBoxControl value={bg_gradient_box} onBgGradientChange={(new_value) => {setAttributes({bg_gradient_box:new_value});  }}/>
				<p>Hello, This is BG Gradient Box</p>
			</div>
	
		);
	},

	save: function( props ) {
		return (
			<div>
				<p>Hello, This is BG Gradient Box</p>
			</div>
		);
	},
} );
