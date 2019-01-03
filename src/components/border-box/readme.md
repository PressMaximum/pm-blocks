# Border Box
Group of border box fields: border style, border width, border color, border radius, box shadow

# Usage
```js
<BorderBoxControl value={border_box} onBorderBoxChange={new_value => {setAttributes({border_box:new_value}); console.log('new border_box: ', new_value)}}/>
```

# Props
The component accepts the following props:

### value
The value for border box
* Type: Object
* Required: No

### onBorderBoxChange
The callback function for BorderBoxControl
* Type: Function
* Required: Yes