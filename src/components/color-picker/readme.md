# Color picker
Allow you pick color in popover

# Usage
```js
this.state = {
	color: {
		hex: '',
		rgba: ''
	},
};


<ColorPickerControl label={__("Color")} disableAlpha="true" value={this.state.color} onColorChangeComplete={ new_value => this.onChangeHandler( { key: "color", value : new_value} ) } />
```

# Props
The component accepts the following props:
### label
The label for color picker
* Type: String
* Required: No

### disableAlpha
If set true it will disable alpha option
* Type: Boolean
* Required: No

### value
The value for color picker
* Type: Object
* Required: Yes

### onColorChangeComplete
The callback function for ColorPickerControl fire when pick color event done
* Type: Function
* Required: Yes