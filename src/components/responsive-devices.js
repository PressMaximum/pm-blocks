const { __ } = wp.i18n;
import { defaults } from "lodash";
const { Component } = wp.element;
const {
	TabPanel,
	Dashicon,
} = wp.components;
const { withInstanceId } = wp.compose;
var closest = require("dom-closest");
var responsiveDevicesConfigs;
class ResponsiveDevices extends Component {
	constructor() {
		super(...arguments);
		/**
		const default_value = {
			top: "",
			left: "",
			bottom: "",
			right: "",
			link: true
		}; 

		this.state = defaults(this.props.value, default_value);*/

		responsiveDevicesConfigs = [
			{
				name: "desktop",
				title: <Dashicon icon="desktop" />,
				className: "cssruler-desk-tab"
			},
			{
				name: "tablet",
				title: <Dashicon icon="tablet" />,
				className: "cssruler-tablet-tab"
			},
			{
				name: "mobile",
				title: <Dashicon icon="smartphone" />,
				className: "cssruler-mobile-tab"
			}
		];
	}

	render() {
		const {
			onTabSelect,
			className,
			label,
			value,
			padding,
			instanceId,
			...props
		} = this.props;
		const id = `responsive-devices-control-${instanceId}`;

		return (
			<TabPanel id={id} className="responsive-devices-wrap" {...props}
				activeClass="active-tab"
				onSelect={ onTabSelect }
				tabs={ responsiveDevicesConfigs }>
				{
					( tab ) => <div className="devices-content">{this.props.children}</div>
				}
				
			</TabPanel>
		);
	}
}

export default withInstanceId(ResponsiveDevices);
