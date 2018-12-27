const { __ } = wp.i18n;
const {
	Component,
} = wp.element;
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
var closest = require('dom-closest');

class MarginControl extends Component {
	constructor() {
		super( ...arguments );
		this.state = {
			value_together: true,
			tablet_value_together: true,
			mobile_value_together: true,
			current_setting_mode: 'desktop',

			margin_values: {
				top: '',
				left: '',
				bottom: '',
				right: '',
				link: '',

				top_tablet: '',
				left_tablet: '',
				bottom_tablet: '',
				right_tablet: '',
				link_tablet: '',

				top_mobile: '',
				left_mobile: '',
				bottom_mobile: '',
				right_mobile: '',
				link_mobile: '',
				_devices: [],
			},


			top: '',
			right: '',
			bottom: '',
			left: '',
			value_together: true,

			focused_node: '',
		}

		this.onChangeHandler = this.onChangeHandler.bind(this);
		
	}

	onChangeHandler( e ) {
		
		var current_node = event.target;
		var settings_wrap_node = closest( current_node, '.margin-settings' );
		var current_responsive_mode = this.state.current_setting_mode;
		var wraper_node = closest( current_node, '.margin-control-wrap' );
		var value = e;

		var margin_top_node = wraper_node.querySelector(`input[name="${current_responsive_mode}-margin-top"]`);
		var margin_right_node = wraper_node.querySelector(`input[name="${current_responsive_mode}-margin-right"]`);
		var margin_bottom_node = wraper_node.querySelector(`input[name="${current_responsive_mode}-margin-bottom"]`);
		var margin_left_node = wraper_node.querySelector(`input[name="${current_responsive_mode}-margin-left"]`);
		
		this.setState({ top: margin_top_node.value });
		this.setState({ right: margin_right_node.value });
		this.setState({ bottom: margin_bottom_node.value });
		this.setState({ left: margin_left_node.value });

		

		/**
		if( this.state.value_together ) {
			margin_top_node.value = value;
			margin_right_node.value = value;
			margin_bottom_node.value = value;
			margin_left_node.value = value;
		} 

		var device_prefix = '';
		if( 'desktop' !== current_responsive_mode ) {
			device_prefix = '_' + current_responsive_mode;
		}

		var key_margin_top = 'top' + device_prefix; 
		var key_margin_right = 'right' + device_prefix; 
		var key_margin_bottom = 'bottom' + device_prefix; 
		var key_margin_left = 'left' + device_prefix; 

		
		margin_values[key_margin_top] = margin_top_node.value;
		margin_values[key_margin_right] = margin_right_node.value;
		margin_values[key_margin_bottom] = margin_bottom_node.value;
		margin_values[key_margin_left] = margin_left_node.value; 
	
		//const { onMarginChange, margin, ...props } = this.props;
		*/
		const return_value = {
			top: margin_top_node.value,
			right: margin_right_node.value,
			bottom: margin_bottom_node.value,
			left: margin_left_node.value

		};
		event.target.focus();
		

		if ( 'function' === typeof this.props.onMarginChange ) {
			this.props.onMarginChange(return_value);
		}
		
		return false;
	}

	maybeValueTogether( e ) {
		var parent_node = closest( event.target, '.margin-together' );

		if( parent_node.classList.contains("active") ) {
			parent_node.classList.remove("active");
		}else{
			parent_node.classList.add("active");
		}
		if( !parent_node.classList.contains("active") ) {
			value_together = false;
		}
	
	}


	render() {
		const { onMarginChange, margin, ...props } = this.props;
		const MarginSettingFields = ( props ) => (
			(
				<div className={`margin-settings margin-for-${props.device_type}`} data-mode={props.device_type}>
					<span>
						<TextControl key="value-top" type="number" min="0" placeholder={__( "Top" )} name={`${props.device_type}-margin-top`} onChange={this.onChangeHandler} value={this.state.top}/>
					</span>
					<span>
						<TextControl key="value-right" type="number" min="0" placeholder={__( "Right" )} name={`${props.device_type}-margin-right`} onChange={this.onChangeHandler} value={this.state.right}/>
					</span>
					<span>
						<TextControl key="value-bottom" type="number" min="0" placeholder={__( "Bottom" )} name={`${props.device_type}-margin-bottom`} onChange={this.onChangeHandler} value={this.state.bottom}/>
					</span>
					<span>
						<TextControl key="value-left" type="number" min="0" placeholder={__( "Left" )} name={`${props.device_type}-margin-left`} onChange={this.onChangeHandler} value={this.state.left}/>
					</span>
					<span className="toggle_value_together">
						<IconButton className="margin-together active" icon="admin-links" label={__("margin together")} name={`${props.device_type}-margin-together`} onClick={this.maybeValueTogether}/>
					</span>
	
				</div>
			)
		);
		const ResponsiveTab = (
			<TabPanel className="margin-responsive-tabs"
				activeClass="active-tab"
				tabs={ [
					{
						name: 'desktop',
						title: <Dashicon icon="desktop" />,
						className: 'margin-desk-tab',
					},
					{
						name: 'tablet',
						title: <Dashicon icon="tablet" />,
						className: 'margin-tablet-tab'
					},
					{
						name: 'mobile',
						title: <Dashicon icon="smartphone" />,
						className: 'margin-mobile-tab'
					},
				] }>
				{
					( tab ) => {
						return <div className="margin-tab-content"><MarginSettingFields device_type={tab.name}/></div>;
					}
				}
			</TabPanel>
		);

		return (
			<div className="margin-control-wrap" {...props} onMarginChange={onMarginChange}>
				<span class="margin-control-label">{__("Margin")}</span>
				{ResponsiveTab}
			</div>
		);
	}
}

export default MarginControl;