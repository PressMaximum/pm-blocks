const { __ } = wp.i18n;
const { Component } = wp.element;
import PMHelper from '../../helper/helper.js';
const { withInstanceId } = wp.compose;

import CSSRulerControl from "../cssruler/index";
import ResponsiveDevices from "../responsive-devices/index";

class CSSRulerDevices extends Component {
	constructor() {
		super(...arguments);

		var default_value = {
			top: "",
			right: "",
			bottom: "",
			left: "",
			link: true,

			top_tablet: "",
			right_tablet: "",
			bottom_tablet: "",
			left_tablet: "",
			link_tablet: true,

			top_mobile: "",
			right_mobile: "",
			bottom_mobile: "",
			left_mobile: "",
			link_mobile: true,

			current_tab: "desktop",

			input_value: {
				top: "",
				right: "",
				bottom: "",
				left: "",
				link: true
			}
		};

		//First initial value

		if ("undefined" !== typeof this.props) {
			if ("undefined" !== typeof this.props.value) {
				if ("undefined" !== typeof this.props.value.input_value) {
					if (
						this.props.value.input_value.top !==
						this.props.value.top
					) {
						this.props.value.input_value.top = this.props.value.top;
					}

					if (
						this.props.value.input_value.right !==
						this.props.value.right
					) {
						this.props.value.input_value.right = this.props.value.right;
					}

					if (
						this.props.value.input_value.bottom !==
						this.props.value.bottom
					) {
						this.props.value.input_value.bottom = this.props.value.bottom;
					}

					if (
						this.props.value.input_value.left !==
						this.props.value.left
					) {
						this.props.value.input_value.left = this.props.value.left;
					}

					if (
						this.props.value.input_value.link !==
						this.props.value.link
					) {
						this.props.value.input_value.link = this.props.value.link;
					}
				}

				if ( typeof this.props.value.current_tab !== 'undefined' ) {
					
					if ("desktop" !== this.props.value.current_tab) {
						this.props.value.current_tab = "desktop";
					}
				}
			}
		}

		

		//Set state
		const pmHelper = new PMHelper();
		this.state = pmHelper.defaults(this.props.value, default_value);

		this.onCSSRulerChange = this.onCSSRulerChange.bind(this);
		this.onDeviceSelected = this.onDeviceSelected.bind(this);
	}

	onCSSRulerChange(new_value) {
		var current_tab = this.state.current_tab;
		var key_top = "top";
		var key_right = "right";
		var key_bottom = "bottom";
		var key_left = "left";
		var key_link = "link";
		if ("desktop" !== current_tab) {
			key_top = "top_" + current_tab;
			key_right = "right_" + current_tab;
			key_bottom = "bottom_" + current_tab;
			key_left = "left_" + current_tab;
			key_link = "link_" + current_tab;
		}

		var new_state = {};
		new_state[key_top] = new_value["top"];
		new_state[key_right] = new_value["right"];
		new_state[key_bottom] = new_value["bottom"];
		new_state[key_left] = new_value["left"];
		new_state[key_link] = new_value["link"];

		this.setState(new_state);
		this.setState({
			input_value: {
				top: new_value["top"],
				right: new_value["right"],
				bottom: new_value["bottom"],
				left: new_value["left"],
				link: new_value["link"]
			}
		});
		let current_state = this.state;
		let current_data = Object.assign({}, current_state, new_state);
		this.props.onCSSRulerDevicesChange(current_data);
	}

	onDeviceSelected(value) {
		this.setState({
			current_tab: value
		});

		var key_top = "top";
		var key_right = "right";
		var key_bottom = "bottom";
		var key_left = "left";
		var key_link = "link";

		if ("desktop" !== value) {
			key_top = "top_" + value;
			key_right = "right_" + value;
			key_bottom = "bottom_" + value;
			key_left = "left_" + value;
			key_link = "link_" + value;
		}

		var new_value_state = {
			top: this.state[key_top],
			right: this.state[key_right],
			bottom: this.state[key_bottom],
			left: this.state[key_left],
			link: this.state[key_link]
		};

		this.setState({ input_value: new_value_state });
	}

	render() {
		const {
			className,
			label,
			value,
			instanceId,
			onCSSRulerDevicesChange,
			...props
		} = this.props;
		const id = `responsive-devices-control-${instanceId}`;
		const input_value = this.state.input_value;

		let wraperClassName = "responsive-devices-control";
		if ("undefined" != typeof className) {
			wraperClassName += " " + className;
		}
		if ("" != label) {
			wraperClassName += " has-label";
		}

		return (
			<div className={wraperClassName}>
				{label && <span className="control-label">{label}</span>}
				<ResponsiveDevices
					onDeviceSelected={this.onDeviceSelected}
					onCSSRulerChange={this.onCSSRulerChange}
					id={id}
					className="cssruler-devices-wrap"
					{...props}
				>
					<CSSRulerControl value={input_value} />
				</ResponsiveDevices>
			</div>
		);
	}
}

export default withInstanceId(CSSRulerDevices);
/**
 * Using:
 * <CSSRulerDevices label="Padding" value={cssruler_devices} onCSSRulerDevicesChange={ (value) => setAttributes({cssruler_devices: value})}/>
 */