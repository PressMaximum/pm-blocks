import './editor.scss';
const { __ } = wp.i18n;
const { Component } = wp.element;
import PMHelper from '../../helper/helper.js';
import AccordionControl from "../accordion/index";
import BackgroundGroupControl from "../background-group/index";
import ColorPickerControl from "../color-picker/index";
import BorderBoxControl from "../../components/border-box/index";
import CSSRulerDevices from "../cssruler-devices/index";
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
				link_color: {}
			},
			hover: {
				border_box: {},
				background: {},
				padding: {},
				margin: {},
				color: {},
				link_color: {}
			}
		};
		//Set state
		const pmHelper = new PMHelper();
		this.state = pmHelper.defaults(this.props.value, default_value);
		this.onChangeHandler = this.onChangeHandler.bind(this);
		this.onTabSelect = this.onTabSelect.bind(this);
	}
	onChangeHandler(data) {
		var changed_value = this.state;

		switch (data.key) {
			case "normal_color":
				changed_value.normal.color = data.value;
				break;
			case "normal_link_color":
				changed_value.normal.link_color = data.value;
				break;
			case "normal_padding":
				changed_value.normal.padding = data.value;
				break;
			case "normal_margin":
				changed_value.normal.margin = data.value;
				break;
			case "normal_background":
				changed_value.normal.background = data.value;
				break;
			case "normal_border_box":
				changed_value.normal.border_box = data.value;
				break;
			case "hover_color":
				changed_value.hover.color = data.value;
				break;
			case "hover_link_color":
				changed_value.hover.link_color = data.value;
				break;
			case "hover_padding":
				changed_value.hover.padding = data.value;
				break;
			case "hover_margin":
				changed_value.hover.margin = data.value;
				break;
			case "hover_background":
				changed_value.hover.background = data.value;
				break;
			case "hover_border_box":
				changed_value.hover.border_box = data.value;
				break;
		}
		this.setState(changed_value);
		if ("function" === typeof this.props.onStylingChange) {
			let current_state = this.state;
			let current_data = Object.assign({}, current_state, changed_value);
			this.props.onStylingChange(current_data);
		}
	}

	onTabSelect( current_tab ) {
		
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
								<div className="normal-tab-content">
									<AccordionControl key="normal-accordion">
										<div label={__("Color")}>
											<ColorPickerControl
												label={__("Color")}
												disableAlpha="true"
												value={this.state.normal.color}
												onColorChangeComplete={new_value =>
													this.onChangeHandler( { key: "normal_color", value : new_value} )
												}
											/>
											<ColorPickerControl
												label={__("Link color")}
												disableAlpha="true"
												value={this.state.normal.link_color}
												onColorChangeComplete={new_value =>
													this.onChangeHandler( { key: "normal_link_color", value : new_value} )
												}
											/>
										</div>
										<div label={__("Layout")}>
											<CSSRulerDevices
												label={__("Padding")}
												value={this.state.normal.padding}
												onCSSRulerDevicesChange={new_value =>
													this.onChangeHandler( { key: "normal_padding", value : new_value} )
												}
											/>
											<CSSRulerDevices
												label={__("Margin")}
												value={this.state.normal.margin}
												onCSSRulerDevicesChange={new_value =>
													this.onChangeHandler( { key: "normal_margin", value : new_value} )
												}
											/>
										</div>
										<div label={__("Background")}>
											<BackgroundGroupControl
												value={this.state.normal.background}
												onBackgroundGroupChange={new_value => {
													this.onChangeHandler( { key: "normal_background", value : new_value} )
												}}
											/>
										</div>
										<div label={__("Border")}>
											<BorderBoxControl
												value={this.state.normal.border_box}
												onBorderBoxChange={new_value => {
													this.onChangeHandler( { key: "normal_border_box", value : new_value} )
												}}
											/>
										</div>
									</AccordionControl>
								</div>
							)
						},
						{
							name: "hover",
							title: __("Hover"),
							className: "tab-hover",
							tab_content: (
								<div className="hover-tab-content">
									<AccordionControl key="hover-accordion">
										<div label={__("Color")}>
											<ColorPickerControl
												label={__("Color")}
												disableAlpha="true"
												value={this.state.hover.color}
												onColorChangeComplete={new_value =>
													this.onChangeHandler( { key: "hover_color", value : new_value} )
												}
											/>
											<ColorPickerControl
												label={__("Link color")}
												disableAlpha="true"
												value={this.state.hover.link_color}
												onColorChangeComplete={new_value =>
													this.onChangeHandler( { key: "hover_link_color", value : new_value} )
												}
											/>
										</div>
										<div label={__("Layout")}>
											<CSSRulerDevices
												label={__("Padding")}
												value={this.state.hover.padding}
												onCSSRulerDevicesChange={new_value =>
													this.onChangeHandler( { key: "hover_padding", value : new_value} )
												}
												min={ 0 }
											/>
											<CSSRulerDevices
												label={__("Margin")}
												value={this.state.hover.margin}
												onCSSRulerDevicesChange={new_value =>
													this.onChangeHandler( { key: "hover_margin", value : new_value} )
												}
											/>
										</div>
										<div label={__("Background")}>
											<BackgroundGroupControl
												value={this.state.hover.background}
												onBackgroundGroupChange={new_value => {
													this.onChangeHandler( { key: "hover_background", value : new_value} )
												}}
											/>
										</div>
										<div label={__("Border")}>
											<BorderBoxControl
												value={this.state.hover.border_box}
												onBorderBoxChange={new_value => {
													this.onChangeHandler( { key: "hover_border_box", value : new_value} )
												}}
											/>
										</div>
									</AccordionControl>
								</div>
							)
						}
					]}
				>
					{tab => <div className="styling-tab-wrap">{tab.tab_content}</div>}
				</TabPanel>
			</div>
		);
	}
}

export default withInstanceId(StylingControl);
