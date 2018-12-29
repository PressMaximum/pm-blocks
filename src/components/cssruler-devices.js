const { __ } = wp.i18n;
const { Component } = wp.element;
import { defaults } from "lodash";
const {
	TabPanel,
	Dashicon,
} = wp.components;
const { withInstanceId } = wp.compose;

import CSSRulerControl from './cssruler';
import ResponsiveDevices from './responsive-devices';

class CSSRulerDevices extends Component {
	constructor() {
		super(...arguments);

		var default_value = {
			top: '',
			right: '',
			bottom: '',
			left: '',
			link: true,

			top_tablet: '',
			right_tablet: '',
			bottom_tablet: '',
			left_tablet: '',
			link_tablet: true,

			top_mobile: '',
			right_mobile: '',
			bottom_mobile: '',
			left_mobile: '',
			link_mobile: true,

			current_tab : '',
		};

		this.state = defaults(this.props.value, default_value);
		this.onCSSRulerChange = this.onCSSRulerChange.bind(this);
		this.onDeviceSelected = this.onDeviceSelected.bind(this);
		
	}

	onCSSRulerChange( value ) {
		var current_tab = this.state.current_tab;
		var new_state = {};
		var key_top = 'top_' + current_tab;
		var key_right = 'right_' + current_tab;
		var key_bottom = 'bottom_' + current_tab;
		var key_left = 'left_' + current_tab;

		if( 'desktop' == current_tab || '' == current_tab ) {
			key_top = 'top';
			key_right = 'right';
			key_bottom = 'bottom';
			key_left = 'left';
		}
		
		new_state[key_top] = value.top;
		new_state[key_right] = value.right;
		new_state[key_bottom] = value.bottom;
		new_state[key_left] = value.left;

		this.setState(new_state);
		console.log('new state: ', new_state);
		console.log('object state: ', this.state);
		

		//let current_state = this.state;
		//let current_data = Object.assign({}, current_state, value);
		//this.props.onCSSRulerDevicesChange( current_data );
	}

	onDeviceSelected ( value ) {
		this.setState({
			current_tab: value,
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
		const id = `responsive-devices-control-${instanceId}`;
		return (
			<ResponsiveDevices onDeviceSelected={this.onDeviceSelected} onCSSRulerChange={ this.onCSSRulerChange } id={id} className="cssruler-devices-wrap" {...props}>
				<CSSRulerControl value={this.state} />
			</ResponsiveDevices>
		);
	}
}

export default withInstanceId(CSSRulerDevices);