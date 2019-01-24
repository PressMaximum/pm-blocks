const { __ } = wp.i18n; 
const { registerBlockType } = wp.blocks;
const {
	InspectorControls,
} = wp.editor;

import AccordionControl from '../../components/accordion/index';
import BackgroundBoxControl from '../../components/background-box/index';
import BackgroundGradientBoxControl from '../../components/background-gradient-box/index';
import BackgroundGroupControl from '../../components/background-group/index';
import BorderBoxControl from '../../components/border-box/index';
import BoxShadowControl from '../../components/box-shadow/index';
import ColorPickerControl from '../../components/color-picker/index';

import CSSRulerControl from '../../components/cssruler/index';
import CSSRulerDevices from '../../components/cssruler-devices/index';
import FontsControl from '../../components/fonts/index';
import IconPickerControl from '../../components/icon-picker/index';
import RangeDevicesControl from '../../components/rangecontrol-devices/index';
import StylingControl from '../../components/styling/index';
import TypographyControl from '../../components/typography/index';
import TypographyDropdownControl from '../../components/typography-dropdown/index';

const { PanelBody } = wp.components;

registerBlockType( 'pm-blocks/test-components', {
	title: __( 'PM: Test Components' ), 
	icon: 'shield',
	category: 'common',
	keywords: [
		__( 'Test Components' ),
		__( 'PM Test Components' ),
	],
	attributes: {
		uniqueID: {
			type: 'string',
		},
		background_box: {
			type: 'object',
		},
		bg_gradient_box: {
			type: 'object'
		},
		background_group: {
			type: 'object'
		},
		border_box: {
			type: 'object'
		},
		color_picker: {
			type: 'object'
		},
		color_palette: {
			type: 'object'
		},
		css_ruler: {
			type: 'object'
		},
		cssruler_devices: {
			type: 'object'
		},
		fonts: {
			type: 'object'
		},
		icon_picker: {
			type: 'object'
		},
		rangecontrol_devices: {
			type: 'object'
		},
		styling: {
			type: 'object'
		},
		typography: {
			type: 'object'
		},
		typography_dropdown: {
			type: 'object'
		},
	},
	
	edit: function( props ) {
		const {
			setAttributes
		} = props;
		const { 
			background_box,
			bg_gradient_box,
			background_group,
			border_box,
			box_shadow,
			color_picker,
			color_palette,
			css_ruler,
			cssruler_devices,
			fonts,
			icon_picker,
			rangecontrol_devices,
			styling,
			typography,
			typography_dropdown
		} = props.attributes;

		const PMAllComponents = (
			<div className="wrap-all-components">
				<AccordionControl label="Component Accordion">
					<div label="Accordion 01" defaultOpen={true}>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
					</div>
					<div label="Accordion 02" defaultOpen={true}>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
					</div>
				</AccordionControl>

				<BackgroundBoxControl value={background_box} label={__("Component Normal BG")} onBackgroundChange={(new_value) => {setAttributes({background_box:new_value}); }}/>

				<BackgroundGradientBoxControl value={bg_gradient_box} label={__("Component Gradient BG")} onBgGradientChange={(new_value) => {setAttributes({bg_gradient_box:new_value});}}/>

				<BackgroundGroupControl value={background_group} label={__("Background Group")} onBackgroundGroupChange={(new_value) => {setAttributes({background_group:new_value});}}/>

				<BorderBoxControl value={border_box} label={__("Border Box")} onBorderBoxChange={new_value => {setAttributes({border_box:new_value});}}/>

				<BoxShadowControl value={box_shadow} label={__("Box Shadow")} onBoxShadowChange={new_value => {setAttributes({box_shadow:new_value});}}/>

				<ColorPickerControl 
					label={__("Color")} 
					disableAlpha="true" 
					value={color_picker} 
					onColorChangeComplete={ new_value => setAttributes( { color_picker: new_value} ) } 
				/>

				<CSSRulerControl value={css_ruler} label={__("CSS Ruler")} onCSSRulerChange={ new_value =>setAttributes({css_ruler: new_value})}/>

				<CSSRulerDevices value={cssruler_devices} label={__("CSS Ruler Devices")} onCSSRulerDevicesChange={ (value) => setAttributes({cssruler_devices: value})}/>
				
				<FontsControl value={fonts} label={__("Fonts")} onFontsChange={(new_value) => {setAttributes({fonts:new_value});}}/>

				<IconPickerControl value={icon_picker} label={__("Icon Picker")} onIconChange={(new_value) => {setAttributes({icon_picker:new_value}); }}/>

				<RangeDevicesControl value={rangecontrol_devices} label={__("Range Control Devices")} onRangeDeviceChange={(new_value) => { setAttributes({rangecontrol_devices: new_value});}}/>

				<StylingControl value={styling} label={__("Styling")} onStylingChange={(new_value) => {setAttributes({styling:new_value}); }}/>

				<TypographyControl value={typography} label={__("Typography")} onTypographyChange={(new_value) => {setAttributes({typography:new_value});}}/>

				<TypographyDropdownControl value={typography_dropdown} label={__("Typography Dropdown")} onTypographyDropdownChange={(new_value) => {setAttributes({typography_dropdown:new_value});}}/>
			</div>
		);
		
		return (
			<div className={ props.className }>
				{PMAllComponents}
				<InspectorControls>
					<PanelBody title={ __( 'All components' ) }>
						{PMAllComponents}
					</PanelBody>
				</InspectorControls>

				<p>Test all components</p>
			</div>
		);
	},

	save: function( props ) {
		return (
			<div className={ props.className }>
				<p>Test all components</p>
			</div>
		);
	},
} );
