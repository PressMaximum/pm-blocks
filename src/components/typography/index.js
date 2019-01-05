const { __ } = wp.i18n;
const { Component } = wp.element;
import { defaults } from "lodash";
import FontsControl from "../fonts/index";
import RangeDevicesControl from "../rangecontrol-devices/index";
const { SelectControl } = wp.components;
const { withInstanceId } = wp.compose;

class TypographyControl extends Component {
	constructor() {
		super(...arguments);

		var default_value = {
			font: {
				family: "",
				style: "",
				subsets: [],
				variant: "",
				font_type: ""
			},
			font_size: {
				value: "",
				value_tablet: "",
				value_mobile: ""
			},
			line_height: {
				value: "",
				value_tablet: "",
				value_mobile: ""
			},
			letter_spacing: {
				value: "",
				value_tablet: "",
				value_mobile: ""
			},
			text_decoration: "",
			text_transform: ""
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
			case "line_height":
				changed_value.line_height = data.value;
				break;
			case "letter_spacing":
				changed_value.letter_spacing = data.value;
				break;
			case "text_decoration":
				changed_value.text_decoration = data.value;
				break;
			case "text_decoration":
				changed_value.text_decoration = data.value;
				break;
			case "text_transform":
				changed_value.text_transform = data.value;
				break;
		}

		this.setState(changed_value);
		if ("function" === typeof this.props.onTypographyChange) {
			let current_state = this.state;
			let current_data = Object.assign({}, current_state, changed_value);
			this.props.onTypographyChange(current_data);
		}
	}

	render() {
		const {
			className,
			label,
			value,
			instanceId,
			onTypographyChange,
			...props
		} = this.props;
		const id = `typography-control-${instanceId}`;

		let wraperClassName = "typography-control";
		if ("undefined" != typeof className) {
			wraperClassName += " " + className;
		}
		if ("" != label) {
			wraperClassName += " has-label";
		}

		return (
			<div className={wraperClassName} id={id} {...props}>
				{label && <span className="control-label">{label}</span>}
				<FontsControl
					value={this.state.font}
					onFontsChange={new_value => {
						this.onChangeHandler({
							key: "font",
							value: new_value
						})
					}}
				/>
				<RangeDevicesControl
					value={this.state.font_size}
					label={__("Font size")}
					onRangeDeviceChange={new_value => {
						this.onChangeHandler({
							key: "font_size",
							value: new_value
						});
					}}
				/>

				<RangeDevicesControl
					value={this.state.line_height}
					label={__("Line height")}
					onRangeDeviceChange={new_value => {
						this.onChangeHandler({
							key: "line_height",
							value: new_value
						});
					}}
				/>
				<RangeDevicesControl
					value={this.state.letter_spacing}
					label={__("Lerter spacing")}
					onRangeDeviceChange={new_value =>
						this.onChangeHandler({
							key: "letter_spacing",
							value: new_value
						})
					}
				/>
				<SelectControl
					label={__("Text decoration")}
					value={this.state.text_decoration}
					options={[
						{ label: __("Default"), value: "" },
						{ label: __("Underline"), value: "underline" },
						{ label: __("Overline"), value: "overline" },
						{ label: __("Line through"), value: "line-through" },
						{ label: __("None"), value: "none" }
					]}
					onChange={new_value =>
						this.onChangeHandler({
							key: "text_decoration",
							value: new_value
						})
					}
				/>
				<SelectControl
					label={__("Text transform")}
					value={this.state.text_transform}
					options={[
						{ label: __("Default"), value: "" },
						{ label: __("Uppercase"), value: "uppercase" },
						{ label: __("Lowercase"), value: "lowercase" },
						{ label: __("Capitalize"), value: "capitalize" },
						{ label: __("None"), value: "none" }
					]}
					onChange={new_value =>
						this.onChangeHandler({
							key: "text_transform",
							value: new_value
						})
					}
				/>
			</div>
		);
	}
}

export default withInstanceId(TypographyControl);
