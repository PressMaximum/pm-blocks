# Live CSS
Generate live css for gutenberg blocks when attributes changed.

### Usage
Define style for each block.
``` javascript
var pmBlocksStyle ={
	"pm-blocks/block-my-heading" : {
		"h2": {
			"styling": "styling", // css with group styling value.
			"typography": "typo", // css with group typography value.
			"color": "color.hex"
		},
		".post_excerpt": {
			"background": "color.rgba", 
			"margin": "styling.normal.border_box.width", // css with group margin value: top, right, bottom, left.
			"padding": "styling.normal.border_box.width", // css with group padding value: top, right, bottom, left.
			"marginDevices": "styling.normal.margin", // css with group responsive margin value: top, right, bottom, left for devices: desktop, tablet, mobile.
			"paddingDevices": "styling.normal.padding", // css with group responsive padding value: top, right, bottom, left for devices: desktop, tablet, mobile.
			"borderWidth": "styling.normal.border_box.width", // css with group border width value: top, right, bottom, left.
			"borderWidthDevices": "styling.normal.margin",// css with group responsive border width value: top, right, bottom, left for devices: desktop, tablet, mobile.
			
			"line-height": { // Define a custom style
				"attrValue" : "styling.normal.margin", // Attribute value for css property
				"outputValue" : "{{VALUE_TOP}}px", // Output value with valid keys are {{VALUE}} - {{VALUE_MOBILE}} - {{VALUE_TABLET}} - {{VALUE_TOP}} - {{VALUE_RIGHT}} - {{VALUE_BOTTOM}} - {{VALUE_LEFT}} - {{VALUE_LINK}} - {{VALUE_TOP_MOBILE}} - {{VALUE_TOP_TABLET}} - {{VALUE_RIGHT_MOBILE}} - {{VALUE_RIGHT_TABLET}} - {{VALUE_BOTTOM_MOBILE}} - {{VALUE_BOTTOM_TABLET}} - {{VALUE_LEFT_MOBILE}} - {{VALUE_LEFT_TABLET}}
			}
		},
		".post--item_meta" : {
			"fonts" : "excerptFonts" // css with group fonts value.
		}
	}
};
```
