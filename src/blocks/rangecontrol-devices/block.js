import './style.scss';
import './editor.scss';

import RangeDevicesControl from '../../components/rangecontrol-devices/index';

const { __ } = wp.i18n; 
const { registerBlockType } = wp.blocks;

registerBlockType( 'pm-blocks/block-rangecontrol-devices', {
	title: __( 'PM Range Devices' ), 
	icon: 'shield',
	category: 'common',
	keywords: [
		__( 'Range' ), 
		__( 'Range Control' ), 
		__( 'PM Range Control Devices' ),
	],
	attributes: {
		rangecontrol_devices: {
			type: 'object',
		}
	},
	
	edit: function( props ) {
		const {
			setAttributes
		} = props;
		const { rangecontrol_devices } = props.attributes;
		return (
			<div className={ props.className }>
				<RangeDevicesControl value={rangecontrol_devices} label={__("Range Control Devices")} onRangeDeviceChange={(new_value) => { setAttributes({rangecontrol_devices: new_value}); console.log('onRangeDeviceChange new value: ', new_value)}}/>
				<p>Hello, This is Range Control Devices.</p>
			</div>
	
		);
	},

	save: function( props ) {
		return (
			<div>
				<p>Hello, This is Range Control Devices.</p>
			</div>
		);
	},
} );
