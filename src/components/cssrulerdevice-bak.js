const { __ } = wp.i18n;
import { defaults } from "lodash";
const { Component } = wp.element;
const {
	TextControl,
	CheckboxControl,
	IconButton,
	TabPanel,
	Dashicon,
	Fragment,
	BaseControl
} = wp.components;
const { withState, withInstanceId } = wp.compose;
const closest = require('dom-closest');
var tabConfigs = [];
var boxLabel;

class CSSRulerDevicesControl extends Component {

	constructor() {
		super(...arguments);

		const {
			label,
			devices
		} = this.props;
		
		tabConfigs = [
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
				tabConfigs = [];
				for( var i=0; i<device_keys.length; i++ ){
					let tab_item_config = {};
					tab_item_config["name"] = device_keys[i];
					tab_item_config["title"] = devices[device_keys[i]]["title"];
					tab_item_config["className"] = devices[device_keys[i]]["className"];
					tabConfigs.push(tab_item_config);
				}
			}

		} else if ( Array.isArray( devices ) ) {
			if( devices.length > 0 ) {
				tabConfigs = [];
				for( var j=0; j<devices.length; j++ ) {
					
					let tab_item_config = {};
					let icon_name = devices[j];
					if( 'mobile' === devices[j] ) {
						icon_name = 'smartphone';
					}
					tab_item_config["name"] = devices[j];
					tab_item_config["title"] = <Dashicon icon={icon_name} />;
					tab_item_config["className"] = `cssruler-${devices[j]}-tab`;
					
					tabConfigs.push(tab_item_config);
				}
			}
		}

		boxLabel = label;
		if( 'undefined' === typeof label || '' === label ) {
			boxLabel = __( "CSS Ruler" );
		}
		
		const default_value = { };
		if( tabConfigs.length > 0 ) {
			var list_attributes = [ "top", "left", "bottom", "right", "link" ];
			for( var i=0; i<tabConfigs.length; i++ ) {
				for( var j=0; j<list_attributes.length; j++ ) {
					let default_key = list_attributes[j];
					if( 'desktop' !== tabConfigs[i].name ) {
						default_key = list_attributes[j] + '_' + tabConfigs[i].name;
					}
					default_value[default_key] = "";
					if( 'link' === list_attributes[j] ) {
						default_value[default_key] = true;
					}
				}
			}
		}
		
		console.log('default_value', default_value);

		let value = this.props.value;
		
		if ( typeof value === "undefined" ) {
			value = {};
		}
		
		this.state = defaults( this.props.value, default_value );
	
		this.onChangeHandler = this.onChangeHandler.bind( this );
		this.maybeValueTogether = this.maybeValueTogether.bind(this);
	}

	onChangeHandler = data => {
		let value_together_key = 'link_' + data.device;
		let changeData= {};
		let avaiable_key = [ 'top', 'right', 'bottom', 'left' ];
		if( 'desktop' === data.device ) {
			value_together_key = 'link';
		}

		let key = data.key + "_" + data.device;
		if (data.device === "desktop") {
			key = data.key;
		}

		if( this.state[value_together_key] ) {
			for( var i = 0; i < avaiable_key.length; i++ ) {
				key = avaiable_key[i] + "_" + data.device;
				if (data.device === "desktop") {
					key = avaiable_key[i];
				}
			
				changeData[ key ] = data.value ;
			}
		} else {
			changeData[ key ] = data.value ;
		}
		
		this.setState( changeData );
		var current_state = this.state;
		var after_change_value = Object.assign({}, current_state, changeData);
		this.props.onChange( after_change_value );
	};

	maybeValueTogether = data => {
		var button_node = closest(event.target, '.cssruler-together');
		var value_together_key = 'link_' + data.device;
		if( 'desktop' === data.device ) {
			value_together_key = 'link';
		}

		var value_together_state = {};
		

		if ( button_node.classList.contains("active") ) {
			button_node.classList.remove("active");
			value_together_state[value_together_key] = false;
			this.setState( value_together_state );
		} else {
			button_node.classList.add("active");
			value_together_state[value_together_key] = true;
			this.setState( value_together_state );
		}
	}

	render() {
		const {
			onChange,
			className,
			label,
			value,
			instanceId,
			devices,
			...props
		} = this.props;

		var that = this;

		

		const id = `css-ruler-control-${instanceId}`;
		return (
			<BaseControl id={id} className="cssruler-control-wrap" {...props}>
				{boxLabel && 
					<span class="cssruler-control-label">{boxLabel}</span>
				}
				
				<TabPanel
					className="cssruler-responsive-tabs"
					activeClass="active-tab"
					tabs={tabConfigs}
				>
					{tab => {
						let valueTop, valueRight, valueBottom, valueLeft;
						if (tab.name === "desktop") {
							valueTop = this.state["top"];
							valueRight = this.state["right"];
							valueBottom = this.state["bottom"];
							valueLeft = this.state["left"];
						} else {
							valueTop = this.state["top_" + tab.name];
							valueRight = this.state["right_" + tab.name];
							valueBottom = this.state["bottom_" + tab.name];
							valueLeft = this.state["left_" + tab.name];
						}
				
						const prefixId = `${id}-${tab.name}`;
						let value_together_key = "link_" + tab.name;
						if (tab.name === "desktop") { 
							value_together_key = "link";
						}
				
						return (
							<div className="cssruler-tab-content">
								<div
									className={`components components-css-ruler-control cssruler-for-${
										tab.name
									}`}
								>
									<div
										className={`cssruler-settings cssruler-for-${
											tab.name
										}`}
										data-mode={tab.name}
									>
										<span>
											<input
												id={`${prefixId}-top`}
												type="number"
												placeholder={__("Top")}
												className="cssruler-top"
												onChange={e =>
													this.onChangeHandler({
														key: "top",
														value: e.target.value,
														device: tab.name
													})
												}
												value={valueTop}
												{...props}
											/>
										</span>
										<span>
											<input
												id={`${prefixId}-right`}
												type="number"
												placeholder={__("Right")}
												className="cssruler-right"
												onChange={e =>
													this.onChangeHandler({
														key: "right",
														value: e.target.value,
														device: tab.name
													})
												}
												value={valueRight}
												{...props}
											/>
										</span>
										<span>
											<input
												id={`${prefixId}-bottom`}
												type="number"
												placeholder={__("Bottom")}
												className="cssruler-bottom"
												onChange={e =>
													this.onChangeHandler({
														key: "bottom",
														value: e.target.value,
														device: tab.name
													})
												}
												value={valueBottom}
												{...props}
											/>
										</span>
										<span>
											<input
												id={`${prefixId}-left`}
												type="number"
												placeholder={__("Left")}
												className="cssruler-left"
												onChange={e =>
													this.onChangeHandler({
														key: "left",
														value: e.target.value,
														device: tab.name
													})
												}
												value={valueLeft}
												{...props}
											/>
										</span>
										<span className="toggle_value_together">
											<IconButton
												className={this.state[value_together_key] ? "cssruler-together active": "cssruler-together"}
												icon="admin-links"
												label={__("Set value together")}
												onClick = {
													e => this.maybeValueTogether({
														device: tab.name
													})
												}
											/>
										</span>
									</div>
								</div>
							</div>
						);
					 }}
				</TabPanel>
			</BaseControl>
		);
	}
}

export default withInstanceId(CSSRulerDevicesControl);

/**
 * Using
 * <CSSRulerDevicesControl label="Padding" value={padding} onChange={ padding =>setAttributes({padding})} devices={supportDevices}/>
 * Support devices like:
 * const supportDevices = [
		'desktop', 'tablet', 'mobile'
	];
 * Or defined custom devices
 	const supportDevices = {
		desktop: {
			title: <Dashicon icon="desktop" />,
			className: "cssruler-desk-tab"
		},
		tablet: {
			title: <Dashicon icon="tablet" />,
			className: "cssruler-tablet-tab"
		},
		mobile: {
			title: <Dashicon icon="smartphone" />,
			className: "cssruler-mobile-tab"
		},
		smallphone: {
			title: <Dashicon icon="smartphone" />,
			className: "cssruler-smallphone-tab"
		}
	};
 */
