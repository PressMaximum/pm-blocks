# ResponsiveDevices
Range control components with devices: desktop, tablet, mobile

# Usage
```js
<RangeDevicesControl value={rangecontrol_devices} label={__("Range Control Devices")} onRangeDeviceChange={(new_value) => { setAttributes({rangecontrol_devices: new_value}); console.log('onRangeDeviceChange new value: ', new_value)}}/>
```

# Props
The component accepts the following props:

### label
The label for **RangeDevicesControl**
* Type: **String**
* Required: **No**

### value
The value for **RangeDevicesControl**
* Type: **Object**
* Required: **Yes**

### onRangeDeviceChange
The callback function for **RangeDevicesControl** fire when range control changed
* Type: **Function**
* Required: **Yes**