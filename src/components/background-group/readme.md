# BackgroundGroupControl
Group of normal background and gradient background

# Usage
```javascript
var background_group = {
	bg_type: 'normal',
	bg_value: {
		normal: {
			
		},
		gradient: {
			
		}
	}
};

<BackgroundGroupControl value={background_group} onBackgroundGroupChange={(new_value) => {setAttributes({background_group:new_value}); console.log('BG Group Changed: ', new_value) }}/>
```
### value
The value for **BackgroundGroupControl**
* Type: **Object**
* Required: **Yes**

### onCSSRulerChange
The callback function for **BackgroundGroupControl** fire when an input field changed
* Type: **Function**
* Required: **Yes**