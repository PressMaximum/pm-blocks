# CSSRulerControl
Group fields store 5 values: top, right, bottom, left, link(if **true** all values are same)

# Usage
```js
this.state = {
	padding: {
		top: "",
		left: "",
		bottom: "",
		right: "",
		link: true
	},
};

<CSSRulerControl value={this.state.padding} onCSSRulerChange={ padding =>setAttributes({padding})}/>
```
### value
The value for CSSRuler
* Type: Object
* Required: Yes

### onCSSRulerChange
The callback function for onCSSRulerChange fire when an input field changed
* Type: Function
* Required: Yes