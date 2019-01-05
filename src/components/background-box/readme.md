# BackgroundBoxControl
Group of normal background box fields: color, image, size, attachment, position, repeat

# Usage
```js
var background_box = {
	color: {
		rgba: '',
		hex: '',
	},
	image: {
		id: '',
		url: ''
	},
	size: '',
	position: '',
	repeat: 'repeat',
	attachment: ''
};
<BackgroundBoxControl value={background_box} onBackgroundChange={(new_value) => {setAttributes({background_box:new_value}); console.log('BG Box Change Value: ', new_value) }}/>
```

# Props
The component accepts the following props:

### value
The value for **BackgroundBoxControl**
* Type: **Object**
* Required: **Yes**

### onBackgroundChange
The callback function for **BackgroundBoxControl**
* Type: **Function**
* Required: **Yes**