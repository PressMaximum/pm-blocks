import './editor.scss';
const { __ } = wp.i18n;
const { Component } = wp.element;
const {
	TabPanel,
	Dashicon,
} = wp.components;
const { withInstanceId } = wp.compose;
var devicesSettings, pmSelectedTab;
import {NavigableMenuControl} from "./navigable-container.js";
import PMHelper from '../../helper/helper.js';
const pmHelper = new PMHelper();

const TabButtonControl = ( { tabId, onClick, onFocus, children, selected, ...rest } ) => (
	<button role="tab"
		tabIndex={ selected ? null : -1 }
		aria-selected={ selected }
		id={ tabId }
		onClick={ onClick }
		onFocus={ onFocus }
		{ ...rest }
	>
		{ children }
	</button>
);

function pmSetTabState( tab ){
	this.setState({
		selected: tab
	});
	pmSelectedTab = tab;
}

function pmSetDeviceTabState( tab ){
	this.setState({
		tab_selected: tab
	});
	pmSelectedTab = tab;
}

class TabPanelControl extends Component {
	constructor() {
		super( ...arguments );
		const { tabs, initialTabName } = this.props;

		this.handleClick = this.handleClick.bind( this );
		this.onNavigate = this.onNavigate.bind( this );

		this.state = {
			selected: pmSelectedTab || initialTabName || ( tabs.length > 0 ? tabs[ 0 ].name : null ),
		};

		pmSetTabState = pmSetTabState.bind(this);
		this.handleFocus = this.handleFocus.bind(this);
	}

	handleClick( e, tabKey ) {
		e.preventDefault();
		pmSelectedTab = tabKey;
		const { onSelect } = this.props;
		this.setState( {
			selected: tabKey,
		} );
		onSelect( tabKey );
		pmSetDeviceTabState( tabKey );
	}

	onNavigate( childIndex, child ) {
		child.click();
	}

	handleFocus( e, tabKey ) {
		this.setState( {
			selected: tabKey,
		} );
	}
  

	render() {
		const { selected } = this.state;
		const {
			activeClass = 'is-active',
			className,
			instanceId,
			orientation = 'horizontal',
			tabs,
		} = this.props;

		let selectedTab = {};
		pmHelper.mapObject(tabs, (tabData, index) => {
			if( tabData.name === selected ) {
				selectedTab = tabData;
			}
		});
		
		const selectedId = instanceId + '-' + selectedTab.name;
		return (
			<div className={ className }>
				<NavigableMenuControl
					role="tablist"
					orientation={ orientation }
					onNavigate={ this.onNavigate }
					className="components-tab-panel__tabs"
				>
					{ tabs.map( ( tab ) => (
						<TabButtonControl className={ `${ tab.className } ${ tab.name === selected ? activeClass : '' }` }
							tabId={ instanceId + '-' + tab.name }
							aria-controls={ instanceId + '-' + tab.name + '-view' }
							selected={ tab.name === selected }
							key={ tab.name }
							onClick={ (e) => this.handleClick( e, tab.name ) }
							onFocus={ (e) => this.handleFocus( e, tab.name ) }
						>
							{ tab.title }
						</TabButtonControl>
					) ) }
				</NavigableMenuControl>
				
				{ selectedTab && (
					<div aria-labelledby={ selectedId }
						role="tabpanel"
						id={ selectedId + '-view' }
						className="components-tab-panel__tab-content"
						tabIndex="0"
					>
						{ this.props.children( Object.assign( new String( selectedTab.name ), selectedTab ) ) }
					</div>
				) }
			</div>
		);
	}
}

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
		this.toggleDevice = this.toggleDevice.bind(this);
		pmSetDeviceTabState = pmSetDeviceTabState.bind(this);
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
		pmSetTabState( value );
		this.props.onDeviceSelected( value );
		this.toggleDevice( value );
	}

	toggleDevice( value ) {
		const bodyClassList = document.querySelector('body').classList;
		let listDevice = this.getDevicesSetting();
		let listDeviceClass = [];
		pmHelper.map( listDevice, (val, index) => {
			if( !pmHelper.isUndefined(val.name) ) {
				listDeviceClass.push( val.name );
			}
		});
		bodyClassList.remove( ...listDeviceClass);
		bodyClassList.add(value);


		let deviceBtnClass = '.cssruler-'+value+'-tab';
		if( 'desktop' === value ) {
			deviceBtnClass = '.cssruler-desk-tab';
		}
		const mobileTabEl = document.querySelectorAll( deviceBtnClass );
		if( mobileTabEl.length > 0 ) {
			for( let i=0; i<mobileTabEl.length; i++ ) {
				let val = mobileTabEl[i];
				val.focus();
			}
			
		}
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
		
		console.log('pmClickToTab: ',pmSelectedTab);
		
		return (
			<TabPanelControl id={id} className="responsive-devices-wrap" {...props}
				activeClass="active-tab"
				onSelect={ this.onTabSelect }
				initialTabName={ pmSelectedTab }
				tabs={ devicesSettings }>
				{
					( tab ) => <div className="devices-content">{childrenWithProps}</div>
				}
			</TabPanelControl>
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