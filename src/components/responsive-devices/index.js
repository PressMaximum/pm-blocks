import './editor.scss';
const { __ } = wp.i18n;
const { Component } = wp.element;
const {
	TabPanel,
	Dashicon,
} = wp.components;
const { withInstanceId } = wp.compose;
var devicesSettings;
class ResponsiveDevices extends Component {
	constructor() {
		super(...arguments);
		devicesSettings = this.getDevicesSetting();

		if( devicesSettings[0]['name'] ) {
			this.state = {
				tab_selected : devicesSettings[0]['name']
			};
		}

		this.onTabSelect = this.onTabSelect.bind(this);
	} 

	getDevicesSetting() {
		var devices = this.props.devicesSettings;
		var settings = [
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

		if( typeof devices === "object" && !Array.isArray(devices) && devices !== null ) { // An object
			const device_keys = Object.keys( devices );
			if( device_keys.length > 0 ) {
				settings = [];
				for( var i=0; i<device_keys.length; i++ ){
					let tab_item_config = {};
					tab_item_config["name"] = device_keys[i];
					tab_item_config["title"] = devices[device_keys[i]]["title"];
					tab_item_config["className"] = devices[device_keys[i]]["className"];
					settings.push(tab_item_config);
				}
			}

		} else if ( Array.isArray( devices ) ) {
			if( devices.length > 0 ) {
				settings = [];
				for( var j=0; j<devices.length; j++ ) {
					
					let tab_item_config = {};
					let icon_name = devices[j];
					if( 'mobile' === devices[j] ) {
						icon_name = 'smartphone';
					}
					tab_item_config["name"] = devices[j];
					tab_item_config["title"] = <Dashicon icon={icon_name} />;
					tab_item_config["className"] = `cssruler-${devices[j]}-tab`;
					
					settings.push(tab_item_config);
				}
			}
		}
		return settings;
	}

	onTabSelect( value ) {
		this.setState({
			tab_selected: value
		});
		this.props.onDeviceSelected( value );
	}

	render() {
		const {
			className,
			label,
			value,
			padding,
			instanceId,
			...props
		} = this.props;
		const id = `responsive-devices-control-${instanceId}`;
		const getParentProps = this.props;
		const parentPropsKeys = Object.keys(getParentProps);
		var parentProps = {};
		for( var i=0; i<parentPropsKeys.length; i++ ) {
			let key = parentPropsKeys[i];
			if( 'children' !== key ) {
				parentProps[key] = getParentProps[key];
			}
		}
		parentProps['parentStates'] = this.state;
		var childrenWithProps = React.Children.map(this.props.children, (child) => React.cloneElement(child, parentProps));
		
		return (
			<TabPanel id={id} className="responsive-devices-wrap" {...props}
				activeClass="active-tab"
				onSelect={ this.onTabSelect }
				tabs={ devicesSettings }>
				{
					( tab ) => <div className="devices-content">{childrenWithProps}</div>
				}
			</TabPanel>
		);
	}
}

export default withInstanceId(ResponsiveDevices);

/**
 * Using
 * 
 *  Default if no devicesSettings props => display default 3 tab: desktop, tablet, mobile
 *  <ResponsiveDevices onCSSRulerChange={ onChildChange } >
		<CSSRulerControl value={padding} />
	</ResponsiveDevices>

	If settings your custom devices, pls do same things
	const supportDevices = [
		'desktop', 'tablet', 'mobile'
	];
	OR like this
	const supportDevices = {
		desktop: {
			title: <Dashicon icon="desktop" />,
			className: "desk-tab"
		},
		tablet: {
			title: <Dashicon icon="tablet" />,
			className: "tablet-tab"
		},
		mobile: {
			title: <Dashicon icon="smartphone" />,
			className: "mobile-tab"
		},
		smallphone: {
			title: <Dashicon icon="smartphone" />,
			className: "smallphone-tab"
		}
	};
	then call:
	<ResponsiveDevices onCSSRulerChange={ onChildChange } devicesSettings={supportDevices2}>
		<CSSRulerControl value={padding} />
	</ResponsiveDevices>

	<CSSRulerControl> is a child of <ResponsiveDevices>
	All child props will be pass by <ResponsiveDevices> parent
	Such as: general <CSSRulerControl onCSSRulerChange={ padding =>setAttributes({padding})}/> has props onChange
	then now it will be <ResponsiveDevices onCSSRulerChange={ onCSSRulerChange }>
 */