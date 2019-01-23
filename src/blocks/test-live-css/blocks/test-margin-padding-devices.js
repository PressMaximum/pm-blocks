import CSSRulerDevices from '../../../components/cssruler-devices/index';

const { __ } = wp.i18n; 
const { registerBlockType } = wp.blocks;
const {
	InspectorControls,
} = wp.editor;

const { PanelBody, RangeControl } = wp.components;

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
		spacing2: {
			type: 'object',
		},
		spacing3: {
			type: 'object',
		},
		spacing4: {
			type: 'object',
		},
		spacing5: {
			type: 'object',
		},
		spacing6: {
			type: 'object',
		},
		divHeight: {
			type: 'number',
		},
		uniqueID: {
			type: 'string',
		}
	},
	
	edit: function( props ) {
		const {
			setAttributes
		} = props;
		const { marginDevices, paddingDevices, divHeight, spacing2, spacing3, spacing4, spacing5, spacing6 } = props.attributes;
		
		return (
			<div className={ props.className }>
				<InspectorControls>
					<PanelBody title={ __( 'Spacing Devices Settings' ) }>
						<CSSRulerDevices label="Margin" value={marginDevices} onCSSRulerDevicesChange={ (value) => setAttributes({marginDevices: value})}/>
						<CSSRulerDevices label="Padding" value={paddingDevices} onCSSRulerDevicesChange={ (value) => setAttributes({paddingDevices: value})}/>
						<CSSRulerDevices label="Padding" value={spacing2} onCSSRulerDevicesChange={ (value) => setAttributes({spacing2: value})}/>
						<CSSRulerDevices label="Padding" value={spacing3} onCSSRulerDevicesChange={ (value) => setAttributes({spacing3: value})}/>
						<CSSRulerDevices label="Padding" value={spacing4} onCSSRulerDevicesChange={ (value) => setAttributes({spacing4: value})}/>
						<CSSRulerDevices label="Padding" value={spacing5} onCSSRulerDevicesChange={ (value) => setAttributes({spacing5: value})}/>
						<CSSRulerDevices label="Padding" value={spacing6} onCSSRulerDevicesChange={ (value) => setAttributes({spacing6: value})}/>
						
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
