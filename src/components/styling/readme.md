# StylingControl
Group of normal and hover styling fields: color, layout, background, border

# Usage
```javascript
var styling = {
	normal: {
		border_box: {},
		background: {},
		padding: {},
		margin: {},
		color: {},
		link_color: {}
	},
	hover: {
		border_box: {},
		background: {},
		padding: {},
		margin: {},
		color: {},
		link_color: {}
	}
};
<StylingControl value={styling} onStylingChange={(new_value) => {setAttributes({styling:new_value}); console.log('Styling changed: ', new_value) }}/>
```

# Props
The component accepts the following props:

### value
The value for **StylingControl**
* Type: **Object**
* Required: **Yes**

### onStylingChange
The callback function for **StylingControl**
* Type: **Function**
* Required: **Yes**
