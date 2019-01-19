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
	},
	"pm-blocks/advance-posts" : {
		".post--item_title a": {
			"typography": "titleTypo",
			"color": "titleColor.hex",
			"font-size": {
				"attrValue" : "titleFontSize",
				"outputValue" : "{{VALUE}}px", // {{VALUE}} - {{VALUE_MOBILE}} - {{VALUE_TABLET}} - {{VALUE_TOP}} - {{VALUE_RIGHT}} - {{VALUE_BOTTOM}} - {{VALUE_LEFT}} - {{VALUE_LINK}} - {{VALUE_TOP_MOBILE}} - {{VALUE_TOP_TABLET}} - {{VALUE_RIGHT_MOBILE}} - {{VALUE_RIGHT_TABLET}} - {{VALUE_BOTTOM_MOBILE}} - {{VALUE_BOTTOM_TABLET}} - {{VALUE_LEFT_MOBILE}} - {{VALUE_LEFT_TABLET}}
			}
		},
		".post--item_excerpt": {
			"typography": "excerptTypo",
			"color": "excerptColor.hex",
		},
		".post--item_meta" : {
			"fonts" : "excerptFonts"
		}
	},
	"pm-blocks/test-live-css-color" : {
		".color-test" : {
			"background": "bgColor",
			"color": "color",
		},
	},
	"pm-blocks/test-live-css-fonts" : {
		".font-test" : {
			"fonts" : "fonts"
		}
	}, 
	"pm-blocks/test-live-gradient-bg" :  {
		".gradient-bg-test" : {
			"gradient-background": "gradientBG"
		}
	},
	"pm-blocks/test-live-normal-bg" :  {
		".normal-bg-test" : {
			"normal-background": "normalBG"
		}
	}, 
	"pm-blocks/test-live-css-spacing" : {
		".spacing-test > p" : {
			"padding" : "padding",
			"margin"  : "margin"
		}
	},
	"pm-blocks/test-live-css-spacing-devices" : {
		".spacing-devices-test > p" : {
			"marginDevices": "marginDevices",
			"paddingDevices": "paddingDevices",
		}
	}, 
	"pm-blocks/test-live-css-boxshadow" : {
		".boxshadow-test" : {
			"boxShadow" : "boxShadow"
		}
	},
	"pm-blocks/test-live-css-borderbox" : {
		".border-box-test" : {
			"borderBox" : "borderBox"
		}
	},
	"pm-blocks/test-live-css-styling" : {
		".styling-test" : {
			"styling" : "styling"
		}
	}, 
	"pm-blocks/test-live-css-typo" : {
		".typo-test > p" : {
			"typography" : "typography"
		}
	},
	"pm-blocks/test-live-css-manual" : {
		".manual-test" : {
			"border-style": {
				"attrValue" : "borderStyle",
				"outputValue" : "{{VALUE}}",
			},
			"border-top-width": {
				"attrValue" : "borderWidth",
				"outputValue" : "{{VALUE_TOP}}px",
			},
			"border-right-width": {
				"attrValue" : "borderWidth",
				"outputValue" : "{{VALUE_RIGHT}}px",
			},
			"border-bottom-width": {
				"attrValue" : "borderWidth",
				"outputValue" : "{{VALUE_BOTTOM}}px",
			},
			"border-left-width": {
				"attrValue" : "borderWidth",
				"outputValue" : "{{VALUE_LEFT}}px",
			},
			"border-color": "borderColor",
			"border-top-left-radius": {
				"attrValue" : "borderRadius",
				"outputValue" : "{{VALUE_TOP}}px",
			},
			"border-top-right-radius": {
				"attrValue" : "borderRadius",
				"outputValue" : "{{VALUE_RIGHT}}px",
			},
			"border-bottom-right-radius": {
				"attrValue" : "borderRadius",
				"outputValue" : "{{VALUE_BOTTOM}}px",
			},
			"border-bottom-left-radius": {
				"attrValue" : "borderRadius",
				"outputValue" : "{{VALUE_LEFT}}px",
			}
		},
		".manual-test .content" : {
			"line-height": {
				"attrValue" : "lineHeight",
				"outputValue" : "{{VALUE}}px",
			}
		}
	}
};
```

Now ready to listen all blocks attributes change to get live css.
``` javascript
const { subscribe } = wp.data;
const MyChange = subscribe( (sub) => {

	// You could use this opportunity to test whether the derived result of a
	// selector has subsequently changed as the result of a state update.
	const editor = wp.data.select("core/editor");
	
	if (editor.hasChangedContent() && !editor.isTyping()) {
		const blocks = editor.getBlocks();
		const selectedBlock = editor.getSelectedBlock();
		
		let pmLiveCSS = new PMLiveCSS();
		// Add style tag.
		let styles =  pmLiveCSS.getBlockOutputCSS( blocks, selectedBlock );
		let maybeGFontUrl = pmLiveCSS.getGoogleFontURL();
		let renderStyleTag = pmLiveCSS.renderStyleTag(styles, maybeGFontUrl);

		console.log('live styles: ', styles);
	}
});
```

