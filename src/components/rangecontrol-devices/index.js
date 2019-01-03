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
			current_tab: 'desktop',
			input_value: ''
		};

		//Set state
		this.state = defaults(this.props.value, default_value);
		this.onDeviceSelected = this.onDeviceSelected.bind(this);
		this.onRangeChanged = this.onRangeChanged.bind(this);
	}

	onRangeChanged( new_value ) {
		console.log('new value: ', new_value );
		this.setState({input_value: new_value});
	}

	onCSSRulerChange(new_value) {
		
	}

	onDeviceSelected(value) {
		this.setState({
			current_tab: value
		});

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
		const id = `range-devices-control-${instanceId}`;
		const input_value = this.state.input_value;

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
						label="Columns"
						value={ this.state.input_value }
						min={ 2 }
						max={ 10 }
						
					/>
				</ResponsiveDevices>
			</div>
		);
	}
}

export default withInstanceId(RangeDevicesControl);
