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

export default function PaddingControl( {
	padding,
	onPaddingChange,
	...props
}) {
	var value_together = true;
	var padding_values ={
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
	};

	const onChangeHandler = ( e ) => {
		var current_node = event.target;
		var settings_wrap_node = closest( current_node, '.padding-settings' );
		var current_responsive_mode = settings_wrap_node.getAttribute('data-mode');
		var wraper_node = closest( current_node, '.padding-control-wrap' );
		var value = e;

		var padding_top_node = wraper_node.querySelector(`input[name="${current_responsive_mode}-padding-top"]`);
		var padding_right_node = wraper_node.querySelector(`input[name="${current_responsive_mode}-padding-right"]`);
		var padding_bottom_node = wraper_node.querySelector(`input[name="${current_responsive_mode}-padding-bottom"]`);
		var padding_left_node = wraper_node.querySelector(`input[name="${current_responsive_mode}-padding-left"]`);

		if( value_together ) {
			padding_top_node.value = value;
			padding_right_node.value = value;
			padding_bottom_node.value = value;
			padding_left_node.value = value;
		}

		var device_prefix = '';
		if( 'desktop' !== current_responsive_mode ) {
			device_prefix = '_' + current_responsive_mode;
		}

		var key_padding_top = 'top' + device_prefix; 
		var key_padding_right = 'right' + device_prefix; 
		var key_padding_bottom = 'bottom' + device_prefix; 
		var key_padding_left = 'left' + device_prefix; 

		
		padding_values[key_padding_top] = padding_top_node.value;
		padding_values[key_padding_right] = padding_right_node.value;
		padding_values[key_padding_bottom] = padding_bottom_node.value;
		padding_values[key_padding_left] = padding_left_node.value; 
	
		onPaddingChange(padding_values);
		event.target.focus();
	};

	const maybeValueTogether = ( e ) => {
		var parent_node = closest( event.target, '.padding-together' );

		if( parent_node.classList.contains("active") ) {
			parent_node.classList.remove("active");
		}else{
			parent_node.classList.add("active");
		}
		if( !parent_node.classList.contains("active") ) {
			value_together = false;
		}
	
	}

	const PaddingSettingFields = ( props ) => (
		(
			<div className={`padding-settings padding-for-${props.device_type}`} data-mode={props.device_type}>
				<span>
					<TextControl type="number" min="0" placeholder={__( "Top" )} name={`${props.device_type}-padding-top`} className="padding-top" onChange={onChangeHandler} value="0" />
				</span>
				<span>
					<TextControl type="number" min="0" placeholder={__( "Right" )} name={`${props.device_type}-padding-right`} className="padding-right" onChange={onChangeHandler} value="0"/>
				</span>
				<span>
					<TextControl type="number" min="0" placeholder={__( "Bottom" )} name={`${props.device_type}-padding-bottom`} className="padding-bottom" onChange={onChangeHandler} value="0"/>
				</span>
				<span>
					<TextControl type="number" min="0" placeholder={__( "Left" )} name={`${props.device_type}-padding-left`} className="padding-left" onChange={onChangeHandler} value="0"/>
				</span>
				<span className="toggle_value_together">
					<IconButton className="padding-together active" icon="admin-links" label={__("Padding together")} name={`${props.device_type}-padding-together`} onClick={maybeValueTogether}/>
				</span>

			</div>
		)
	);

	const ResponsiveTab = (
			<TabPanel className="padding-responsive-tabs"
				activeClass="active-tab"
				tabs={ [
					{
						name: 'desktop',
						title: <Dashicon icon="desktop" />,
						className: 'padding-desk-tab',
					},
					{
						name: 'tablet',
						title: <Dashicon icon="tablet" />,
						className: 'padding-tablet-tab'
					},
					{
						name: 'mobile',
						title: <Dashicon icon="smartphone" />,
						className: 'padding-mobile-tab'
					},
				] }>
				{
					( tab ) => {
						return <div className="padding-tab-content"><PaddingSettingFields device_type={tab.name}/></div>;
					}
				}
			</TabPanel>
	);

	return (
		<div className="padding-control-wrap" {...props} onPaddingChange={onPaddingChange}>
			<span class="padding-control-label">{__("Padding")}</span>
			{ResponsiveTab}
		</div>
	);
}