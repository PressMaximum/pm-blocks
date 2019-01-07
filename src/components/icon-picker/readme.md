# IconPickerControl
Icon picker component

# Usage
```javascript
var icon_picker = 'fab fa-500px';
<IconPickerControl value={icon_picker} onIconChange={(new_value) => {setAttributes({icon_picker:new_value}); console.log('IconPicker changed: ', new_value) }}/>
```

# Props
The component accepts the following props:

### value
The value for **IconPickerControl**
* Type: **String**
* Required: **Yes**

### onIconChange
The callback function for **IconPickerControl**
* Type: **Function**
* Required: **Yes**
