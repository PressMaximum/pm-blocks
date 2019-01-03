# Box Shadow
Group of box shadow fields: color, x, y, blur, spread, inset

# Usage
```js
this.state = {
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


<BoxShadowControl value={this.state.shadow} onBoxShadowChange={ new_value => this.onChangeHandler( { key: "shadow", value : new_value} ) }/>
```

# Props
The component accepts the following props:

### value
The value for border box
* Type: Object
* Required: Yes

### onBoxShadowChange
The callback function for BoxShadowControl
* Type: Function
* Required: Yes