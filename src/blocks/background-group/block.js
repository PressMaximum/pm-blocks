import './style.scss';
import './editor.scss';

import BackgroundGroupControl from '../../components/background-group/index';

const { __ } = wp.i18n; 
const { registerBlockType } = wp.blocks;
const {
	InspectorControls,
} = wp.editor;

registerBlockType( 'pm-blocks/block-background-group', {
	title: __( 'PM Background Group' ), 
	icon: 'shield',
	category: 'common',
	keywords: [
		__( 'Background' ), 
		__( 'Background Group' ), 
		__( 'PM Background Group' ),
	],
	attributes: {
		background_group: {
			type: 'object',
		}
	},
	
	edit: function( props ) {
		const {
			setAttributes
		} = props;
		const { background_group } = props.attributes;
		console.log('Saved background_group: ', background_group );
		return (
			<div className={ props.className }>
				<BackgroundGroupControl value={background_group} onBackgroundGroupChange={(new_value) => {setAttributes({background_group:new_value}); console.log('BG Group Changed: ', new_value) }}/>
				<InspectorControls>
					<BackgroundGroupControl value={background_group} onBackgroundGroupChange={(new_value) => {setAttributes({background_group:new_value}); console.log('BG Group Changed: ', new_value) }}/>
				</InspectorControls>
				<p>Hello, This is BackgroundGroupControl</p>
			</div>
	
		);
	},

	save: function( props ) {
		return (
			<div>
				<p>Hello, This is block BackgroundGroupControl.</p>
			</div>
		);
	},
} );
