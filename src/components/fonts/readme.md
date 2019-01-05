# FontsControl
Group of fonts fields: family, subset, variant

# Usage
```js
var default_fonts = {
	family: "",
	style: "",
	subsets: [],
	variant: '',
	font_type: '',
};
<FontsControl value={default_fonts} onFontsChange={(new_value) => {setAttributes({default_fonts:new_value}); console.log('fonts changed: ', new_value) }}/>
```

# Props
The component accepts the following props:

### value
The value for **FontsControl**
* Type: **Object**
* Required: **Yes**

### onFontsChange
The callback function for **FontsControl**
* Type: **Function**
* Required: **Yes**