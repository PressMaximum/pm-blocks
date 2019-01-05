const { __ } = wp.i18n;
const { Component } = wp.element;
import { defaults } from "lodash";
import AccordionControl from "../accordion/index";
import BackgroundGroupControl from "../background-group/index";
import ColorPickerControl from '../color-picker/index';
import BorderBoxControl from '../../components/border-box/index';
import CSSRulerDevices from '../cssruler-devices/index';
const { TabPanel } = wp.components;
const { withInstanceId } = wp.compose;

class StylingControl extends Component {
	constructor() {
		super(...arguments);

		var default_value = {
			normal: {
				border_box: {},
				background: {},
				padding: {},
				margin: {},
				color: {},
				link_color: {},
			},
			hover: {
				border_box: {},
				background: {},
				padding: {},
				margin: {},
				color: {},
				link_color: {},
			}
		};
		//Set state
		this.state = defaults(this.props.value, default_value);
		this.onChangeHandler = this.onChangeHandler.bind(this);
	}
	onChangeHandler(data) {
		var changed_value = {};

		switch (data.key) {
			case "font":
				changed_value.font = data.value;
				break;
			case "font_size":
				changed_value.font_size = data.value;
				break;
		}

		this.setState(changed_value);
		if ("function" === typeof this.props.onStylingChange) {
			let current_state = this.state;
			let current_data = Object.assign({}, current_state, changed_value);
			this.props.onStylingChange(current_data);
		}
	}

	render() {
		const {
			className,
			label,
			value,
			instanceId,
			onStylingChange,
			...props
		} = this.props;
		const id = `styling-control-${instanceId}`;

		let wraperClassName = "styling-control";
		if ("undefined" != typeof className) {
			wraperClassName += " " + className;
		}
		if ("" != label) {
			wraperClassName += " has-label";
		}
		return (
			<div className={wraperClassName} id={id} {...props}>
				{label && <span className="control-label">{label}</span>}
				<TabPanel
					className="my-tab-panel"
					activeClass="active-tab"
					onSelect={this.onTabSelect}
					initialTabName={this.state.bg_type}
					tabs={[
						{
							name: "normal",
							title: __("Normal"),
							className: "tab-normal",
							tab_content: (
								<AccordionControl>
									<div label={__("Color")}>
										<ColorPickerControl label={__("Color")} disableAlpha="true" value={this.state.normal.color} onColorChangeComplete={ new_value => console.log('color: ', new_value ) } />
										<ColorPickerControl label={__("Link color")} disableAlpha="true" value={this.state.normal.link_color} onColorChangeComplete={ new_value => console.log('link color: ', new_value ) } />
									</div>
									<div label={__("Layout")}>
										<CSSRulerDevices label={__("Padding")} value={this.state.normal.padding} onCSSRulerDevicesChange={ (value) => console.log('padding: ', new_value ) }/>
										<CSSRulerDevices label={__("Margin")} value={this.state.normal.margin} onCSSRulerDevicesChange={ (value) => console.log('margin: ', new_value ) }/>
									</div>
									<div label={__("Background")}>
										<BackgroundGroupControl value={this.state.normal.background} onBackgroundGroupChange={(new_value) => {console.log('new value: ', new_value ) }}/>
									</div>
									<div label={__("Border")}>
										<BorderBoxControl value={this.state.normal.border_box} onBorderBoxChange={new_value => { console.log('New value: ', new_value)} }/>
									</div>
								</AccordionControl>
							)
						},
						{
							name: "hover",
							title: __("Hover"),
							className: "tab-hover",
							tab_content: (
								<AccordionControl>
									<div label={__("Color")}>
										<ColorPickerControl label={__("Color")} disableAlpha="true" value={this.state.hover.color} onColorChangeComplete={ new_value => console.log('color: ', new_value ) } />
										<ColorPickerControl label={__("Link color")} disableAlpha="true" value={this.state.hover.link_color} onColorChangeComplete={ new_value => console.log('link color: ', new_value ) } />
									</div>
									<div label={__("Layout")}>
										<CSSRulerDevices label={__("Padding")} value={this.state.hover.padding} onCSSRulerDevicesChange={ (value) => console.log('padding: ', new_value ) }/>
										<CSSRulerDevices label={__("Margin")} value={this.state.hover.margin} onCSSRulerDevicesChange={ (value) => console.log('margin: ', new_value ) }/>
									</div>
									<div label={__("Background")}>
										<BackgroundGroupControl value={this.state.hover.background} onBackgroundGroupChange={(new_value) => {console.log('new value: ', new_value ) }}/>
									</div>
									<div label={__("Border")}>
										<BorderBoxControl value={this.state.hover.border_box} onBorderBoxChange={new_value => { console.log('New value: ', new_value)} }/>
									</div>
								</AccordionControl>
							)
						}
					]}
				>
					{tab => <p>{tab.tab_content}</p>}
				</TabPanel>
			</div>
		);
	}
}

export default withInstanceId(StylingControl);
