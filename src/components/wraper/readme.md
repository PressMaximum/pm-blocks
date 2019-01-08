# AccordionControl
Display content in accordion mode

# Usage
```javascript
<AccordionControl label="Block Accordion">
	<div label="Item 01" defaultOpen={true}>
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
	</div>
	<div label="Item 02" defaultOpen={false}>
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
	</div>

	<div label="Item 03">
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
	</div>

	<div label="Item 04">
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
	</div>
</AccordionControl>
```

# Props
The component accepts the following props:

### label
The label for **AccordionControl**
* Type: **String**
* Required: **No**

### Children props
Each children accepts the following props:
#### label
The label for section 
* Type: **String**
* Required: **No**

#### defaultOpen
Default open this section or not
* Type: **Boolean**
* Required: **No**
* Default: **true**
