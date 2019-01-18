import CSSRulerDevices from '../../../components/cssruler-devices/index';

const { __ } = wp.i18n; 
const { registerBlockType } = wp.blocks;
const {
	InspectorControls,
} = wp.editor;

const { PanelBody } = wp.components;

registerBlockType( 'pm-blocks/test-live-css-spacing-devices', {
	title: __( 'PM CSS: Spacing Devices' ), 
	icon: 'shield',
	category: 'common',
	keywords: [
		__( 'Spacing Devices' ),
		__( 'PM Spacing Devices' ),
	],
	attributes: {
		marginDevices: {
			type: 'object',
		},
		paddingDevices: {
			type: 'object',
		},
		uniqueID: {
			type: 'string',
		}
	},
	
	edit: function( props ) {
		const {
			setAttributes
		} = props;
		const { marginDevices, paddingDevices } = props.attributes;
		
		return (
			<div className={ props.className }>
				<InspectorControls>
					<PanelBody title={ __( 'Spacing Devices Settings' ) }>
					<CSSRulerDevices label="Margin" value={marginDevices} onCSSRulerDevicesChange={ (value) => setAttributes({marginDevices: value})}/>
					<CSSRulerDevices label="Padding" value={paddingDevices} onCSSRulerDevicesChange={ (value) => setAttributes({paddingDevices: value})}/>
					</PanelBody>
				</InspectorControls>
				<div className="spacing-devices-test"><p style={{border: '1px solid #eee'}}>Live CSS Margin - Padding Devices</p></div>
			</div>
		);
	},

	save: function( props ) {
		return (
			<div className={ props.className }>
				<div className="spacing-devices-test"><p style={{border: '1px solid #eee'}}>Live CSS Margin - Padding Devices</p></div>
			</div>
		);
	},
} );
