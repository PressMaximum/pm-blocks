# Border Box
Group of border box fields: border style, border width, border color, border radius, box shadow

# Usage
```js
var border_box = {
	style: '',
	width: {
		top: '',
		right: '',
		bottom: '',
		left: '',
		link: true
	},
	color: {
		hex: '',
		rgba: ''
	},
	radius: {
		top: '',
		right: '',
		bottom: '',
		left: '',
		link: true
	},
	shadow: {
		color: {
			rgba: '',
			hex: ''
		},
		x: '',
		y: '',
		blur: '',
		spread: '',
		inset: ''
	}
};
<BorderBoxControl value={border_box} onBorderBoxChange={new_value => {setAttributes({border_box:new_value}); console.log('new border_box: ', new_value)}}/>
```

# Props
The component accepts the following props:

### value
The value for border box
* Type: **Object**
* Required: **Yes**

### onBorderBoxChange
The callback function for **BorderBoxControl**
* Type: **Function**
* Required: **Yes**