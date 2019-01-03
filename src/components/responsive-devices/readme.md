# ResponsiveDevices
Wrap children components with devices tab such as: desktop, tablet, mobile

# Usage
```js
<ResponsiveDevices onCSSRulerChange={ onChildChange } >
	<CSSRulerControl value={padding} />
</ResponsiveDevices>
```

# Props
The component accepts the following props:

### devicesSettings
The settings for which devices are print in devices tab
* Type: Array | Object
* Required: No
* Default: desktop, tablet, mobile

If settings your custom devices, you can declare an array like: 

```js
const supportDevices = [
	'desktop', 'tablet', 'mobile'
];
```

or an object like: 
```js
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
```

then call:
```js
<ResponsiveDevices onCSSRulerChange={ onChildChange } devicesSettings={supportDevices}>
	<CSSRulerControl value={padding} />
</ResponsiveDevices>
```

### Children props
This components also support all children props such as: 
> **<CSSRulerControl>** is a child of **<ResponsiveDevices>**
All child props will be pass to **ResponsiveDevices** parent
Such as: general **<CSSRulerControl onCSSRulerChange={ padding =>setAttributes({padding})}/>** has props **onCSSRulerChange** then now it will be **<ResponsiveDevices onCSSRulerChange={ onCSSRulerChange }>** .
