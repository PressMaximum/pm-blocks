# TypographyControl
Group of typograply fields: fonts, font size, line-height, letter spacing, text-decoration, text-transform

# Usage
```javascript
var default_fonts = {
	family: "",
	style: "",
	subsets: [],
	variant: '',
	font_type: '',
};
<TypographyControl value={typography} onTypographyChange={(new_value) => {setAttributes({typography:new_value}); console.log('Typography changed: ', new_value) }}/>
```

# Props
The component accepts the following props:

### value
The value for **TypographyControl**
* Type: **Object**
* Required: **Yes**

### onTypographyChange
The callback function for **TypographyControl**
* Type: **Function**
* Required: **Yes**
