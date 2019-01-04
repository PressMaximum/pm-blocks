# BackgroundGradientBoxControl
Group of gradient background box fields: color, location, second color, second location, type, angle

# Usage
```js
var bg_gradient_box = {
	color: {
		rgba: '',
		hex: '',
	},
	location: '',
	second_color: {
		rgba: '',
		hex: '',
	},
	second_location: '',
	type: 'linear',
	angle: '',
};
<BackgroundGradientBoxControl value={bg_gradient_box} onBgGradientChange={(new_value) => {setAttributes({bg_gradient_box:new_value}); console.log('BG Gradient Box Change Value: ', new_value) }}/>
```

# Props
The component accepts the following props:

### value
The value for onBgGradientChange
* Type: Object
* Required: Yes

### onBgGradientChange
The callback function for onBgGradientChange
* Type: Function
* Required: Yes