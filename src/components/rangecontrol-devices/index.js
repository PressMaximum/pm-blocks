const { __ } = wp.i18n;
const { Component } = wp.element;
import { defaults } from "lodash";
const { RangeControl } = wp.components;
const { withInstanceId } = wp.compose;

import ResponsiveDevices from "../responsive-devices/index";

class RangeDevicesControl extends Component {
	constructor() {
		super(...arguments);

		var default_value = {
			value: '',
			value_tablet: '',
			value_mobile: '',

			current_tab: 'desktop',
			input_value: '',
		};

		//Set state
		let merge_value = defaults(this.props.value, default_value);

		switch( merge_value.current_tab ) {
			case 'tablet': 
				merge_value.input_value = merge_value.value_tablet;
				break;
			case 'mobile': 
				merge_value.input_value = merge_value.value_mobile;
				break;
			default: 
				merge_value.input_value = merge_value.value;
				break;
		}

		this.state = merge_value;
		this.onDeviceSelected = this.onDeviceSelected.bind(this);
		this.onRangeChanged = this.onRangeChanged.bind(this);
	}

	onRangeChanged( new_value ) {
		let new_input = {};
		switch( this.state.current_tab ) {
			case 'tablet':
				new_input.value_tablet = new_value;
				new_input.input_value = new_value;
				break;
			case 'mobile':
				new_input.value_mobile = new_value;
				new_input.input_value = new_value;
				break;	
			default: 
				new_input.value = new_value;
				new_input.input_value = new_value;
				break;
		}
		this.setState(new_input);

		if( 'function' == typeof( this.props.onRangeDeviceChange ) ) {
			let current_state = this.state;
			let current_data = Object.assign({}, current_state, new_input);
			let return_value = {
				value: current_data.value,
				value_mobile: current_data.value_mobile,
				value_tablet: current_data.value_tablet
			};

			this.props.onRangeDeviceChange( return_value );
		}
	}
	onDeviceSelected(value) {
		this.setState({
			current_tab: value
		});

		switch( value ) {
			case 'tablet':
				this.setState({
					input_value: this.state.value_tablet
				});
				break;
			case 'mobile':
				this.setState({
					input_value: this.state.value_mobile
				});
				break;	
			default: 
				this.setState({
					input_value: this.state.value
				});
				break;
		}
	}
	render() {
		const {
			className,
			label,
			value,
			min,
			max,
			instanceId,
			onRangeDeviceChange,
			...props
		} = this.props;
		const id = `range-devices-control-${instanceId}`;
		let wraperClassName = "range-devices-control";
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
					onChange={ this.onRangeChanged }
					id={id}
					className="range-devices-wrap"
					{...props}
				>
					<RangeControl
						value={ this.state.input_value }
						min={ min }
						max={ max }
					/>
				</ResponsiveDevices>
			</div>
		);
	}
}

export default withInstanceId(RangeDevicesControl);
