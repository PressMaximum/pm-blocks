# TypographyDropdownControl
Group of typograply fields: fonts, font size, line-height, letter spacing, text-decoration, text-transform in dropdown

# Usage
```javascript
var default_fonts = {
	family: "",
	style: "",
	subsets: [],
	variant: '',
	font_type: '',
};
<TypographyDropdownControl value={typography} onTypographyDropdownChange={(new_value) => {setAttributes({typography:new_value}); console.log('Typography changed: ', new_value) }}/>
```

# Props
The component accepts the following props:

### value
The value for **TypographyDropdownControl**
* Type: **Object**
* Required: **Yes**

### onTypographyDropdownChange
The callback function for **TypographyDropdownControl**
* Type: **Function**
* Required: **Yes**
