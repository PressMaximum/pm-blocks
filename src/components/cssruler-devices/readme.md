# CSSRulerDevices
Group fields store 5 values: top, right, bottom, left, link(if **true** all values are same) with 3 devices mode: desktop, tablet, mobile

# Usage
```js
const cssruler_devices= {
	top: "",
	right: "",
	bottom: "",
	left: "",
	link: true,

	top_tablet: "",
	right_tablet: "",
	bottom_tablet: "",
	left_tablet: "",
	link_tablet: true,

	top_mobile: "",
	right_mobile: "",
	bottom_mobile: "",
	left_mobile: "",
	link_mobile: true,

};

<CSSRulerDevices label="Padding" value={cssruler_devices} onCSSRulerDevicesChange={ (value) => setAttributes({cssruler_devices: value})}/>
```
### label
The label for **CSSRulerDevices**
* Type: **String**
* Required: **No**

### value
The value for **CSSRulerDevices**
* Type: **Object**
* Required: **Yes**

### onCSSRulerDevicesChange
The callback function for **CSSRulerDevices** fire when an input field changed or when device changed
* Type: **Function**
* Required: **Yes**