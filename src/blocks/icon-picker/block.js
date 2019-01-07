import './style.scss';
import './editor.scss';

import IconPickerControl from '../../components/icon-picker/index';

const { __ } = wp.i18n; 
const { registerBlockType } = wp.blocks;
const {
	InspectorControls,
} = wp.editor;

registerBlockType( 'pm-blocks/block-icon-picker', {
	title: __( 'PM Icon Picker' ), 
	icon: 'shield',
	category: 'common',
	keywords: [
		__( 'Icon Picker' ),
		__( 'PM Icon Picker' ),
	],
	attributes: {
		icon_picker: {
			type: 'string',
		}
	},
	
	edit: function( props ) {
		const {
			setAttributes
		} = props;
		const { icon_picker } = props.attributes;
		
		return (
			<div className={ props.className }>
				<IconPickerControl value={icon_picker} onIconChange={(new_value) => {setAttributes({icon_picker:new_value}); console.log('IconPicker changed: ', new_value) }}/>
				<InspectorControls>
					<IconPickerControl value={icon_picker} onIconChange={(new_value) => {setAttributes({icon_picker:new_value}); console.log('IconPicker changed: ', new_value) }}/>
				</InspectorControls>
				<p>Hello, This is IconPickerControl</p>
			</div>
	
		);
	},

	save: function( props ) {
		return (
			<div>
				<p>Hello, This is block IconPickerControl</p>
			</div>
		);
	},
} );
