import t from 'typy';

import PMHelper from './helper.js';
const { applyFilters } =  wp.hooks;
const pmHelper = new PMHelper();
/**
var pmBlocksStyle ={
	"pm-blocks/block-my-heading" : {
		"h2": {
			"styling": "styling",
			"typography": "typo",
			"color": "color.hex"
		},
		".post_excerpt": {
			"background": "color.rgba",
			"margin": "styling.normal.border_box.width",
			"padding": "styling.normal.border_box.width",
			"marginDevices": "styling.normal.margin",
			"paddingDevices": "styling.normal.padding",
			"borderWidth": "styling.normal.border_box.width",
			"borderWidthDevices": "styling.normal.margin",
			
			"line-height": {
				"attrValue" : "styling.normal.margin",
				"outputValue" : "{{VALUE_TOP}}px", // {{VALUE}} - {{VALUE_MOBILE}} - {{VALUE_TABLET}} - {{VALUE_TOP}} - {{VALUE_RIGHT}} - {{VALUE_BOTTOM}} - {{VALUE_LEFT}} - {{VALUE_LINK}} - {{VALUE_TOP_MOBILE}} - {{VALUE_TOP_TABLET}} - {{VALUE_RIGHT_MOBILE}} - {{VALUE_RIGHT_TABLET}} - {{VALUE_BOTTOM_MOBILE}} - {{VALUE_BOTTOM_TABLET}} - {{VALUE_LEFT_MOBILE}} - {{VALUE_LEFT_TABLET}}
			}
		}
	}
};
 */
var pmBlocksStyle ={
	
	"pm-blocks/advance-posts" : {
		".post--item_title a": {
			"typography": "titleTypo",
			"color": "titleColor.hex",
			"font-size": {
				"attrValue" : "titleFontSize",
				"outputValue" : "{{VALUE}}px", // {{VALUE}} - {{VALUE_MOBILE}} - {{VALUE_TABLET}} - {{VALUE_TOP}} - {{VALUE_RIGHT}} - {{VALUE_BOTTOM}} - {{VALUE_LEFT}} - {{VALUE_LINK}} - {{VALUE_TOP_MOBILE}} - {{VALUE_TOP_TABLET}} - {{VALUE_RIGHT_MOBILE}} - {{VALUE_RIGHT_TABLET}} - {{VALUE_BOTTOM_MOBILE}} - {{VALUE_BOTTOM_TABLET}} - {{VALUE_LEFT_MOBILE}} - {{VALUE_LEFT_TABLET}}
			},
			
		},
		".post--item_excerpt": {
			"typography": "excerptTypo",
			"color": "excerptColor.hex",
		},
		".post--item_meta" : {
			"fonts" : "excerptFonts"
		},
		".block-advance-posts" : {
			"height": {
				"attrValue" : "divHeight",
				"outputValue" : "{{VALUE}}px", // {{VALUE}} - {{VALUE_MOBILE}} - {{VALUE_TABLET}} - {{VALUE_TOP}} - {{VALUE_RIGHT}} - {{VALUE_BOTTOM}} - {{VALUE_LEFT}} - {{VALUE_LINK}} - {{VALUE_TOP_MOBILE}} - {{VALUE_TOP_TABLET}} - {{VALUE_RIGHT_MOBILE}} - {{VALUE_RIGHT_TABLET}} - {{VALUE_BOTTOM_MOBILE}} - {{VALUE_BOTTOM_TABLET}} - {{VALUE_LEFT_MOBILE}} - {{VALUE_LEFT_TABLET}}
			}
		}
	},
	"pm-blocks/block-my-heading" : {
		"h2": {
			"styling": "styling",
			"typography": "typo",
			"color": "color.hex"
		},
	},
	"pm-blocks/test-live-css-color" : {
		".color-test" : {
			"background": "bgColor",
			"color": "color",
			"height": {
				"attrValue" : "divHeight",
				"outputValue" : "{{VALUE}}px", // {{VALUE}} - {{VALUE_MOBILE}} - {{VALUE_TABLET}} - {{VALUE_TOP}} - {{VALUE_RIGHT}} - {{VALUE_BOTTOM}} - {{VALUE_LEFT}} - {{VALUE_LINK}} - {{VALUE_TOP_MOBILE}} - {{VALUE_TOP_TABLET}} - {{VALUE_RIGHT_MOBILE}} - {{VALUE_RIGHT_TABLET}} - {{VALUE_BOTTOM_MOBILE}} - {{VALUE_BOTTOM_TABLET}} - {{VALUE_LEFT_MOBILE}} - {{VALUE_LEFT_TABLET}}
			}
		},
	},
	"pm-blocks/test-live-css-fonts" : {
		".font-test" : {
			"fonts" : "fonts",
			"height": {
				"attrValue" : "divHeight",
				"outputValue" : "{{VALUE}}px", // {{VALUE}} - {{VALUE_MOBILE}} - {{VALUE_TABLET}} - {{VALUE_TOP}} - {{VALUE_RIGHT}} - {{VALUE_BOTTOM}} - {{VALUE_LEFT}} - {{VALUE_LINK}} - {{VALUE_TOP_MOBILE}} - {{VALUE_TOP_TABLET}} - {{VALUE_RIGHT_MOBILE}} - {{VALUE_RIGHT_TABLET}} - {{VALUE_BOTTOM_MOBILE}} - {{VALUE_BOTTOM_TABLET}} - {{VALUE_LEFT_MOBILE}} - {{VALUE_LEFT_TABLET}}
			}
		}
	}, 
	"pm-blocks/test-live-gradient-bg" :  {
		".gradient-bg-test" : {
			"gradient-background": "gradientBG",
			"height": {
				"attrValue" : "divHeight",
				"outputValue" : "{{VALUE}}px", // {{VALUE}} - {{VALUE_MOBILE}} - {{VALUE_TABLET}} - {{VALUE_TOP}} - {{VALUE_RIGHT}} - {{VALUE_BOTTOM}} - {{VALUE_LEFT}} - {{VALUE_LINK}} - {{VALUE_TOP_MOBILE}} - {{VALUE_TOP_TABLET}} - {{VALUE_RIGHT_MOBILE}} - {{VALUE_RIGHT_TABLET}} - {{VALUE_BOTTOM_MOBILE}} - {{VALUE_BOTTOM_TABLET}} - {{VALUE_LEFT_MOBILE}} - {{VALUE_LEFT_TABLET}}
			}
		}
	},
	"pm-blocks/test-live-normal-bg" :  {
		".normal-bg-test" : {
			"normal-background": "normalBG",
			"height": {
				"attrValue" : "divHeight",
				"outputValue" : "{{VALUE}}px", // {{VALUE}} - {{VALUE_MOBILE}} - {{VALUE_TABLET}} - {{VALUE_TOP}} - {{VALUE_RIGHT}} - {{VALUE_BOTTOM}} - {{VALUE_LEFT}} - {{VALUE_LINK}} - {{VALUE_TOP_MOBILE}} - {{VALUE_TOP_TABLET}} - {{VALUE_RIGHT_MOBILE}} - {{VALUE_RIGHT_TABLET}} - {{VALUE_BOTTOM_MOBILE}} - {{VALUE_BOTTOM_TABLET}} - {{VALUE_LEFT_MOBILE}} - {{VALUE_LEFT_TABLET}}
			}
		},
		
	}, 
	
	"pm-blocks/test-live-css-spacing" : {
		".spacing-test > p" : {
			"padding" : "padding",
			"margin"  : "margin",
			"height": {
				"attrValue" : "divHeight",
				"outputValue" : "{{VALUE}}px", // {{VALUE}} - {{VALUE_MOBILE}} - {{VALUE_TABLET}} - {{VALUE_TOP}} - {{VALUE_RIGHT}} - {{VALUE_BOTTOM}} - {{VALUE_LEFT}} - {{VALUE_LINK}} - {{VALUE_TOP_MOBILE}} - {{VALUE_TOP_TABLET}} - {{VALUE_RIGHT_MOBILE}} - {{VALUE_RIGHT_TABLET}} - {{VALUE_BOTTOM_MOBILE}} - {{VALUE_BOTTOM_TABLET}} - {{VALUE_LEFT_MOBILE}} - {{VALUE_LEFT_TABLET}}
			}
		}
	},
	"pm-blocks/test-live-css-spacing-devices" : {
		".spacing-devices-test > p" : {
			"marginDevices": "marginDevices",
			"paddingDevices": "paddingDevices",
			"height": {
				"attrValue" : "divHeight",
				"outputValue" : "{{VALUE}}px", // {{VALUE}} - {{VALUE_MOBILE}} - {{VALUE_TABLET}} - {{VALUE_TOP}} - {{VALUE_RIGHT}} - {{VALUE_BOTTOM}} - {{VALUE_LEFT}} - {{VALUE_LINK}} - {{VALUE_TOP_MOBILE}} - {{VALUE_TOP_TABLET}} - {{VALUE_RIGHT_MOBILE}} - {{VALUE_RIGHT_TABLET}} - {{VALUE_BOTTOM_MOBILE}} - {{VALUE_BOTTOM_TABLET}} - {{VALUE_LEFT_MOBILE}} - {{VALUE_LEFT_TABLET}}
			}
		}
	}, 
	"pm-blocks/test-live-css-boxshadow" : {
		".boxshadow-test" : {
			"boxShadow" : "boxShadow",
			"height": {
				"attrValue" : "divHeight",
				"outputValue" : "{{VALUE}}px", // {{VALUE}} - {{VALUE_MOBILE}} - {{VALUE_TABLET}} - {{VALUE_TOP}} - {{VALUE_RIGHT}} - {{VALUE_BOTTOM}} - {{VALUE_LEFT}} - {{VALUE_LINK}} - {{VALUE_TOP_MOBILE}} - {{VALUE_TOP_TABLET}} - {{VALUE_RIGHT_MOBILE}} - {{VALUE_RIGHT_TABLET}} - {{VALUE_BOTTOM_MOBILE}} - {{VALUE_BOTTOM_TABLET}} - {{VALUE_LEFT_MOBILE}} - {{VALUE_LEFT_TABLET}}
			}
		}
	},
	"pm-blocks/test-live-css-borderbox" : {
		".border-box-test" : {
			"borderBox" : "borderBox",
			"height": {
				"attrValue" : "divHeight",
				"outputValue" : "{{VALUE}}px", // {{VALUE}} - {{VALUE_MOBILE}} - {{VALUE_TABLET}} - {{VALUE_TOP}} - {{VALUE_RIGHT}} - {{VALUE_BOTTOM}} - {{VALUE_LEFT}} - {{VALUE_LINK}} - {{VALUE_TOP_MOBILE}} - {{VALUE_TOP_TABLET}} - {{VALUE_RIGHT_MOBILE}} - {{VALUE_RIGHT_TABLET}} - {{VALUE_BOTTOM_MOBILE}} - {{VALUE_BOTTOM_TABLET}} - {{VALUE_LEFT_MOBILE}} - {{VALUE_LEFT_TABLET}}
			}
		}
	},
	"pm-blocks/test-live-css-styling" : {
		".styling-test" : {
			"styling" : "styling",
			"height": {
				"attrValue" : "divHeight",
				"outputValue" : "{{VALUE}}px", // {{VALUE}} - {{VALUE_MOBILE}} - {{VALUE_TABLET}} - {{VALUE_TOP}} - {{VALUE_RIGHT}} - {{VALUE_BOTTOM}} - {{VALUE_LEFT}} - {{VALUE_LINK}} - {{VALUE_TOP_MOBILE}} - {{VALUE_TOP_TABLET}} - {{VALUE_RIGHT_MOBILE}} - {{VALUE_RIGHT_TABLET}} - {{VALUE_BOTTOM_MOBILE}} - {{VALUE_BOTTOM_TABLET}} - {{VALUE_LEFT_MOBILE}} - {{VALUE_LEFT_TABLET}}
			}
		}
	}, 
	"pm-blocks/test-live-css-typo" : {
		".typo-test > p" : {
			"typography" : "typography",
			"height": {
				"attrValue" : "divHeight",
				"outputValue" : "{{VALUE}}px", // {{VALUE}} - {{VALUE_MOBILE}} - {{VALUE_TABLET}} - {{VALUE_TOP}} - {{VALUE_RIGHT}} - {{VALUE_BOTTOM}} - {{VALUE_LEFT}} - {{VALUE_LINK}} - {{VALUE_TOP_MOBILE}} - {{VALUE_TOP_TABLET}} - {{VALUE_RIGHT_MOBILE}} - {{VALUE_RIGHT_TABLET}} - {{VALUE_BOTTOM_MOBILE}} - {{VALUE_BOTTOM_TABLET}} - {{VALUE_LEFT_MOBILE}} - {{VALUE_LEFT_TABLET}}
			}
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
			},
			"height": {
				"attrValue" : "divHeight",
				"outputValue" : "{{VALUE}}px", // {{VALUE}} - {{VALUE_MOBILE}} - {{VALUE_TABLET}} - {{VALUE_TOP}} - {{VALUE_RIGHT}} - {{VALUE_BOTTOM}} - {{VALUE_LEFT}} - {{VALUE_LINK}} - {{VALUE_TOP_MOBILE}} - {{VALUE_TOP_TABLET}} - {{VALUE_RIGHT_MOBILE}} - {{VALUE_RIGHT_TABLET}} - {{VALUE_BOTTOM_MOBILE}} - {{VALUE_BOTTOM_TABLET}} - {{VALUE_LEFT_MOBILE}} - {{VALUE_LEFT_TABLET}}
			}
		}
	},
	"core/heading" : {
		"h2" : {
			"fonts" : "fonts"
		}
	},
	"core/latest-posts" : {
		".wp-block-latest-posts li a" : {
			"typography" : "typography"
		},
		".wp-block-latest-posts" : {
			"height" : {
				"attrValue" : "divHeight",
				"outputValue" : "{{VALUE}}px",
			}
		}
	},
	
};

class PMLiveCSS {
	constructor( ) {
		this.pmBlocksStyle = pmBlocksStyle;
		this.googleFonts = {};
	}

	getCSSRulerCSS( input, cssProp, unit ){
		let returnValue = '';
		let link = ( this.definedNotEmpty(input.link) && input.link ) ? true : false;
		let listAttrs = ['top', 'right', 'bottom', 'left'];
		
		for(let i=0;i<listAttrs.length;i++){
			let key = listAttrs[i];
			let value = input[key];
			if( this.definedNotEmpty( value ) ) {
				if( link ) {
					returnValue = `${cssProp}:${value}${unit};`;
					break;
				} else {
					returnValue += `${cssProp}-${key}:${value}${unit};`;
				}
			}
		}
		return returnValue;
	}

	getCSSRulerDeviceCSS ( input, cssProp, unit ) {
		let returnValue = {
			desktop: '',
			tablet: '',
			mobile: '',
		};
		let listAttr = {
			desktop: ['top', 'right', 'bottom', 'left', 'link'],
			tablet: ['top_tablet', 'right_tablet', 'bottom_tablet', 'left_tablet', 'link_tablet'],
			mobile: ['top_mobile', 'right_mobile', 'bottom_mobile', 'left_mobile', 'link_mobile']
		};
		let attrKey = Object.keys(listAttr);
		for( let i=0; i<attrKey.length; i++ ) {
			let attrDeviceKey = attrKey[i];
			let attrDeviceVal = listAttr[attrDeviceKey];
			let valueObj = {};
			for( let j=0; j<attrDeviceVal.length; j++ ) {
				let key = attrDeviceVal[j];
				let value = input[key];
				
				if( this.definedNotEmpty(value) ) {
					if( key.includes( 'top' ) ) {
						valueObj['top'] = value;
					} else if( key.includes( 'right' ) ) {
						valueObj['right'] = value;
					} else if ( key.includes( 'bottom' ) ) {
						valueObj['bottom'] = value;
					} else if ( key.includes( 'left' ) ) {
						valueObj['left'] = value;
					} else if ( key.includes( 'link' ) ) {
						valueObj['link'] = value;
					}
				}
			}
			
			returnValue[attrDeviceKey] = this.getCSSRulerCSS( valueObj, cssProp, unit);
		}
		return returnValue;
	}
	
	getRangeDeviceCSS ( input, cssProp, unit ) {
		let returnValue = {};
		let listAttr = {
			desktop : 'value',
			tablet: 'value_tablet',
			mobile: 'value_mobile',
		};

		let listAttrkeys = Object.keys(listAttr);
		for( let i=0; i<=listAttrkeys.length; i++ ) {
			let objKey = listAttrkeys[i];
			let inputKey = listAttr[objKey];

			if( this.definedNotEmpty( input[inputKey] ) ) {
				returnValue[objKey] = `${cssProp}:${input[inputKey]}${unit};`;
			}
		}
		if( '' !== returnValue ){
			return returnValue;
		}
		return '';
	}
	
	getFontCSS ( fontData ) {
		let fontCSS = '';
		let fontFamily = ( this.definedNotEmpty( fontData.family ) ) ? fontData.family: '';
		let fontSubset = ( this.definedNotEmpty( fontData.subsets ) ) ? fontData.subsets: [];
		if( '' !== fontFamily ){ 
			fontCSS += `font-family:'${fontFamily}';`;
		}

		let googleFont = {};
		
		if( !pmHelper.isUndefined( fontData.font_type ) ){ 
			let fontType = 'normal';
			if( 'normal' !== fontData.font_type && '' !== fontData.font_type ) {
				fontType = fontData.font_type;
			}

			if( 'normal' !== fontType ) {
				if( 'google' === fontType ) {
					if( '' !== fontFamily ){ 
						googleFont['family'] = fontFamily;
					}
	
					if( fontSubset.length > 0 ) {
						googleFont['subsets'] = fontSubset;
					}
				}
				if( !pmHelper.isUndefined( fontData.variant ) && '' !== fontData.variant ){
					if( 'regular' == fontData.variant || !isNaN( fontData.variant ) ) {
						fontCSS += `font-weight:${fontData.variant};`;
					} else if( fontData.variant.includes( "italic" ) ) {
						let fontWeight = fontData.variant.replace( 'italic', '' );
						let fontVariant = fontData.variant;
						if( 'italic' !== fontData.variant ) {
							fontVariant = fontData.variant.replace( 'italic', 'i' );
						}
						googleFont['variant'] = fontVariant;

						fontCSS += `font-style:italic;`;
						if( '' !== fontWeight ){
							fontCSS += `font-weight:${fontWeight};`;
						}
					}
				}
			} else{
				if( this.definedNotEmpty( fontData.style ) ){ 
					fontCSS += `font-style:${fontData.style};`;
				}

				if( !pmHelper.isUndefined( fontData.variant ) && '' !== fontData.variant ){ 
					fontCSS += `font-weight:${fontData.variant};`;
				}
			}
		}

		let returnValue = {
			cssRule: fontCSS,
		}
		if( '' !== googleFont ) {
			returnValue['googleFont'] = googleFont;
		}
		return returnValue;
	}

	definedNotEmpty ( value ) {
		if( (!pmHelper.isUndefined( value )) && '' !== value && null !== value ) {
			return true;
		}
		return false;
	}
	
	getNormalBackgroundCSS ( normalBackground ) {
		let cssRule = '';
		let bgKeys = [
			'attachment',
			'image',
			'position',
			'repeat',
			'size',
			'color'
		];
		
		if( this.definedNotEmpty( normalBackground ) ){
			for( let i=0; i<bgKeys.length; i++ ) {
				let bgKey = bgKeys[i];
				
				if( this.definedNotEmpty( normalBackground[bgKey] ) ) {
					if( 'color' === bgKey ) {
						let bgColor = this.getColorCSS(normalBackground[bgKey]);
						if( '' !== bgColor ) {
							cssRule += `background-color:${bgColor};`;
						}
					} else if( 'image' === bgKey ) {
						if( this.definedNotEmpty( normalBackground[bgKey]['url'] ) ) {
							cssRule += `background-image:url(${normalBackground[bgKey]['url']});`;
						}
					} else { 
						cssRule += `background-${bgKey}:${normalBackground[bgKey]};`;
					}
				}
			}
		}
		return cssRule;
	};
	
	getGradientBackgroundCSS ( gradientBackground ) {
		let bgCSS = '';
		if( 'undefined' !== typeof( gradientBackground ) ){
			let type = ( this.definedNotEmpty( gradientBackground.type ) ) ? gradientBackground.type : 'linear';
			let color = ( this.definedNotEmpty( gradientBackground.color ) ) ? gradientBackground.color : '';
			let second_color = ( this.definedNotEmpty( gradientBackground.second_color ) ) ? gradientBackground.second_color : '';
			let location = ( this.definedNotEmpty( gradientBackground.location ) ) ? gradientBackground.location : '';
			let second_location = ( this.definedNotEmpty( gradientBackground.second_location ) ) ? gradientBackground.second_location : '';
			let angle = ( this.definedNotEmpty( gradientBackground.angle ) ) ? gradientBackground.angle : '';
	
			if( '' !== type && '' !== color && '' !== second_color && '' !== location && '' !== second_color && '' !== angle ){
				bgCSS = `background-color: rgba(${color.rgba.r},${color.rgba.g},${color.rgba.b},${color.rgba.a});`;
				if( 'linear' === type ) {
					bgCSS += `background-image: linear-gradient(${angle}deg, rgba(${color.rgba.r},${color.rgba.g},${color.rgba.b},${color.rgba.a}) ${location}%, rgba(${second_color.rgba.r},${second_color.rgba.g},${second_color.rgba.b},${second_color.rgba.a}) ${second_location}%);`;
				}else{
					bgCSS += `background-image: radial-gradient(circle, rgba(${color.rgba.r},${color.rgba.g},${color.rgba.b},${color.rgba.a}) ${location}%, rgba(${second_color.rgba.r},${second_color.rgba.g},${second_color.rgba.b},${second_color.rgba.a}) ${second_location}%);`;
				}
			}
		}
		return bgCSS;
	}
	
	getBorderWidthCSS (width, unit ) {
		let borderCSS = '';
		let listKeys = [
			'top', 'right', 'bottom', 'left'
		];

		let link = ( this.definedNotEmpty( width.link ) && width.link ) ? true : false;
		for( let i=0; i<listKeys.length; i++ ) {
			let key = listKeys[i];
			if( this.definedNotEmpty( width[key] ) ) {
				if( link ) {
						borderCSS = `border-width: ${width[key]}${unit};`;
						break;
					
				} else {
					borderCSS += `border-${key}-width: ${width[key]}${unit};`;
				}
			}
		}
		return borderCSS;
	}

	getBorderWidthDevicesCSS ( input, unit ) {
		let returnValue = {
			desktop: '',
			tablet: '',
			mobile: '',
		};
		let listAttr = {
			desktop: ['top', 'right', 'bottom', 'left', 'link'],
			tablet: ['top_tablet', 'right_tablet', 'bottom_tablet', 'left_tablet', 'link_tablet'],
			mobile: ['top_mobile', 'right_mobile', 'bottom_mobile', 'left_mobile', 'link_mobile']
		};
		let attrKey = Object.keys(listAttr);
		for( let i=0; i<attrKey.length; i++ ) {
			let attrDeviceKey = attrKey[i];
			let attrDeviceVal = listAttr[attrDeviceKey];
			let valueObj = {};
			for( let j=0; j<attrDeviceVal.length; j++ ) {
				let key = attrDeviceVal[j];
				let value = input[key];
				
				if( this.definedNotEmpty(value) ) {
					if( key.includes( 'top' ) ) {
						valueObj['top'] = value;
					} else if( key.includes( 'right' ) ) {
						valueObj['right'] = value;
					} else if ( key.includes( 'bottom' ) ) {
						valueObj['bottom'] = value;
					} else if ( key.includes( 'left' ) ) {
						valueObj['left'] = value;
					} else if ( key.includes( 'link' ) ) {
						valueObj['link'] = value;
					}
				}
			}
			
			returnValue[attrDeviceKey] = this.getBorderWidthCSS( valueObj, unit);
		}
		return returnValue;
	}
	
	getBorderRadiusCSS (radius) {
		let radiusCSS = '';
		let link = ( this.definedNotEmpty( radius.link ) && radius.link ) ? true : false;
		let listKeys = {
			top: 'top-left',
			right: 'top-right',
			bottom: 'bottom-right',
			left: 'bottom-left',
		};

		let keys = Object.keys(listKeys);

		for( let i=0; i<keys.length; i++ ) {
			let key = keys[i];
			let keyValue = listKeys[key];

			if( this.definedNotEmpty( radius[key] ) ) {
				if( link ) {
					radiusCSS = `border-radius: ${radius[key]}px;`;
					break;
				} else {
					radiusCSS += `border-${keyValue}-radius: ${radius[key]}px;`;
				}
			}
		}
		return radiusCSS;
	}
	
	getColorCSS (color) {
		let colorStr = '';
		if( !pmHelper.isUndefined( color.hex ) ) {
			colorStr = color.hex;
	
			if( !pmHelper.isUndefined( color.rgba ) ) {
				if( !pmHelper.isUndefined( color.rgba.a ) && color.rgba.a < 1 ){ 
					colorStr = `rgba(${color.rgba.r}, ${color.rgba.g}, ${color.rgba.b}, ${color.rgba.a})`;
				}
			}
		}
	
		return colorStr;
	}
	
	getBorderBoxCSS (borderBox){
		let borderCSS = '';
		if( !pmHelper.isUndefined( borderBox ) ){
			let color = ( this.definedNotEmpty( borderBox.color ) ) ? borderBox.color : '';
			let radius = ( this.definedNotEmpty( borderBox.radius ) ) ? borderBox.radius : ''
			let shadow = ( this.definedNotEmpty( borderBox.shadow ) ) ? borderBox.shadow : '';
			let style = ( this.definedNotEmpty( borderBox.style ) ) ? borderBox.style : '';
			let width = ( this.definedNotEmpty( borderBox.width ) ) ? borderBox.width : '';
	
			if( '' !== style ) {
				borderCSS += `border-style: ${style};`;
			}
			if( '' !== color ) {
				let colorVal = this.getColorCSS( color );
				if( '' !== colorVal ) {
					borderCSS += `border-color: ${colorVal};`;
				}
			}
			if( this.definedNotEmpty( width ) ) {
				borderCSS += this.getBorderWidthCSS(width, 'px');
			}
			if( this.definedNotEmpty( radius ) ) {
				borderCSS += this.getBorderRadiusCSS( radius );
			}
			if( this.definedNotEmpty( shadow ) ) {
				borderCSS += this.getBoxShadowCSS( shadow );
			}
		}
		return borderCSS;
	}
	
	getBoxShadowCSS (boxShadow) {
		let boxShadowCSS = '';
		if( this.definedNotEmpty( boxShadow ) ){
			let color = ( this.definedNotEmpty( boxShadow.color ) ) ? boxShadow.color : '';
			let x = ( this.definedNotEmpty( boxShadow.x ) ) ? boxShadow.x : '';
			let y = ( this.definedNotEmpty( boxShadow.y ) ) ? boxShadow.y : '';
			let blur = ( this.definedNotEmpty( boxShadow.blur ) ) ? boxShadow.blur : '';
			let spread = ( this.definedNotEmpty( boxShadow.spread ) ) ? boxShadow.spread : '';
			let inset = ( this.definedNotEmpty( boxShadow.inset ) && boxShadow.inset ) ? true : false;
	
			if( '' !== color && '' !== x && '' !== y && '' !== blur && '' !== spread ){
				let colorStr = this.getColorCSS( color );
				if( '' !== colorStr ){
					if ( inset ) {
						boxShadowCSS = `box-shadow: inset ${x}px ${y}px ${blur}px ${spread}px ${colorStr};`;
					} else {
						boxShadowCSS = `box-shadow: ${x}px ${y}px ${blur}px ${spread}px ${colorStr};`;
					}
				}
			}
			
		}
		return boxShadowCSS;
	}
	
	getStylingCSS (styling){
		let returnValue = {};
		let stylingType = [ 'normal', 'hover' ];
		
		if( this.definedNotEmpty( styling ) ){
			// Styling normal.
			for( let i=0; i<stylingType.length; i++ ) {
				let key = stylingType[i];
				let stylingData = styling[key];
				let stylingCSS = '', stylingResponsive = [];
				
				if( this.definedNotEmpty( stylingData ) ){
					// Get background CSS.
					if( this.definedNotEmpty( stylingData.background ) ){
						let normalBGType = ( this.definedNotEmpty( stylingData.background.bg_type ) ) ? stylingData.background.bg_type : '';
						
						if( 'normal' === normalBGType ) {
							if( this.definedNotEmpty( stylingData.background.bg_value.normal ) ){
								stylingCSS += this.getNormalBackgroundCSS( stylingData.background.bg_value.normal );
							}
						} else if( 'gradient' === normalBGType ) {
							if( this.definedNotEmpty( stylingData.background.bg_value.gradient ) ){
								stylingCSS += this.getGradientBackgroundCSS( stylingData.background.bg_value.gradient );
							}
						}
					}
					// Get border box CSS.
					if( this.definedNotEmpty( stylingData.border_box ) ){
						stylingCSS += this.getBorderBoxCSS( stylingData.border_box );
					}
					// Get color CSS.
					if( this.definedNotEmpty( stylingData.color ) ){
						let colorStr = this.getColorCSS(stylingData.color);
						if( '' !== colorStr ) {
							stylingCSS += `color:${colorStr};`;
						}
					}
					
					// Get margin.
					if( this.definedNotEmpty( stylingData.margin ) ){
						let deviceMargin = this.getCSSRulerDeviceCSS( stylingData.margin, 'margin', 'px' );
						stylingResponsive.push( deviceMargin );
					}
		
					// Get padding.
					if( this.definedNotEmpty( stylingData.padding ) ){
						let devicePadding = this.getCSSRulerDeviceCSS( stylingData.padding, 'padding', 'px' );
						stylingResponsive.push( devicePadding );
					}
					returnValue[key] = {
						cssRule: stylingCSS,
						responsive: this.getGroupStylingResponsive(stylingResponsive)
					};
				}
			}
		}
		if( '' !== returnValue ){
			return returnValue;
		}
		return '';
	}
	
	getTypographyCSS (typography) {
		let typoCSS = '';
		let stylingResponsive = [];
		let googleFont;
		if( this.definedNotEmpty( typography ) ){
			if( this.definedNotEmpty( typography.text_decoration ) ){
				typoCSS += `text-decoration: ${typography.text_decoration};`;
			}
			if( this.definedNotEmpty ( typography.text_transform ) ){
				typoCSS += `text-transform: ${typography.text_transform};`;
			}
	
			if( this.definedNotEmpty( typography.font ) ){
				let fontCSS = this.getFontCSS( typography.font );
				if( this.definedNotEmpty( fontCSS.cssRule ) ) {
					typoCSS += fontCSS.cssRule;
				}

				if( this.definedNotEmpty( fontCSS.googleFont ) ) {
					googleFont = fontCSS.googleFont;
				}
			}
	
			if( this.definedNotEmpty( typography.font_size ) ){
				let getFontSize = this.getRangeDeviceCSS( typography.font_size, 'font-size', 'px' );
				stylingResponsive.push( getFontSize );
			}
	
			if( this.definedNotEmpty( typography.letter_spacing ) ){
				let getLetterSpacing = this.getRangeDeviceCSS( typography.letter_spacing, 'letter-spacing', 'px' );
				stylingResponsive.push( getLetterSpacing );
			}
			if( this.definedNotEmpty( typography.line_height ) ){
				let getLineHeight = this.getRangeDeviceCSS( typography.line_height, 'line-height', 'px' );
				stylingResponsive.push( getLineHeight );
			}
		}
		
		let returnValue = {
			cssRule: typoCSS,
			responsive: this.getGroupStylingResponsive( stylingResponsive )
		};
		if ( '' !== googleFont ) {
			returnValue['googleFont'] = googleFont;
		}
		return returnValue;
	}


	getGroupStylingResponsive (stylingResponsive) {
		let returnValue = {};
		if( '' !== stylingResponsive ) {
			let desktop = [], tablet=[], mobile = [];
			for( let i=0; i<stylingResponsive.length; i++ ) {
				let value = stylingResponsive[i];
				if( this.definedNotEmpty( value.desktop ) ) {
					desktop.push( value.desktop );
				}

				if( this.definedNotEmpty( value.tablet ) ) {
					tablet.push( value.tablet );
				}

				if( this.definedNotEmpty( value.mobile ) ) {
					mobile.push( value.mobile );
				}
			}
			
			if( '' !== desktop ) {
				returnValue['desktop'] = desktop.join(' ');
			}
			if( '' !== tablet ) {
				returnValue['tablet'] = tablet.join(' ');
			}
			if( '' !== mobile ) {
				returnValue['mobile'] = mobile.join(' ');
			}
		}
		if( '' !== returnValue ){
			return returnValue;
		}
		return '';
	}

	groupCSSByDevice ( storeVal, responsive ) {
		if( this.definedNotEmpty(responsive.desktop) ) {
			storeVal.desktop.push(responsive.desktop);
		}

		if( this.definedNotEmpty(responsive.tablet) ) {
			storeVal.tablet.push(responsive.tablet);
		}

		if( this.definedNotEmpty(responsive.mobile) ) {
			storeVal.mobile.push(responsive.mobile);
		}
		return storeVal;
	}

	getOtherCSSRule (blockAttr, propKey, propVal) {
		let cssOrigin = '';
		if( this.definedNotEmpty( propVal.attrValue ) && this.definedNotEmpty( propVal.outputValue ) ) {
			let customVal = t(blockAttr, propVal.attrValue).safeObject;
			let propOutput = '';
			let listPropKey = [ '', 'mobile', 'tablet', 'top', 'right', 'bottom', 'left', 'link', 'top_mobile', 'top_tablet', 'right_mobile', 'right_tablet', 'bottom_mobile', 'bottom_tablet', 'left_mobile', 'left_tablet' ];
			if( this.definedNotEmpty( customVal ) ) {
				for( let k = 0; k<listPropKey.length; k++ ) {
					let connectChar = ( listPropKey[k].length > 0 ) ? '_' : '';
					let key = listPropKey[k];
					let valueKey = 'value' + connectChar + listPropKey[k];
					let valueKeyUC = '{{' + valueKey.toUpperCase() + '}}';
					
					if( '{{VALUE}}' === valueKeyUC ) {
						let propval = '';
						if( 'string' === typeof( customVal ) || !isNaN( customVal ) ) {
							propval = customVal;
						} else if( this.definedNotEmpty(customVal.value) && ( 'string' === typeof( customVal.value ) || !isNaN( customVal.value ) ) ) {
							propval = customVal.value;
						}
						if( '' !== propval ) {
							propOutput = propVal.outputValue.replace( '{{VALUE}}', propval );
							cssOrigin += `${propKey}:${propOutput};`;
						}
					}else if( propVal.outputValue.includes( valueKeyUC )  ) {
						if( this.definedNotEmpty( customVal[key] ) ) {
							propOutput = propVal.outputValue.replace( valueKeyUC, customVal[key] );
							cssOrigin += `${propKey}:${propOutput};`;
						}
					}
				}
			}
		}
		return cssOrigin;
	}

	arrayUnique( arrArg ) {
		return arrArg.filter(function(elem, pos,arr) {
			return arr.indexOf(elem) == pos;
		});
	}

	maybeHasGoogleFont( typoCSS ) {
		if( this.definedNotEmpty(typoCSS.googleFont) && this.definedNotEmpty(typoCSS.googleFont.family) ) {
			let gFont = typoCSS.googleFont;
			
			let normalFontFamily = gFont.family;
			let fontFamily = normalFontFamily.replace(' ', '_');
			
			if( this.definedNotEmpty(this.googleFonts[fontFamily]) ) {
				let gFontSubsets = (this.definedNotEmpty(this.googleFonts[fontFamily]['subsets'])) ? this.googleFonts[fontFamily]['subsets'] : [];
				let gFontVariant = (this.definedNotEmpty(this.googleFonts[fontFamily]['variant'])) ? this.googleFonts[fontFamily]['variant'] : [];
				
				if( this.definedNotEmpty( gFont.subsets ) ) {
					gFontSubsets = gFontSubsets.concat(gFont.subsets);
				}

				if( this.definedNotEmpty( gFont.variant ) ) {
					gFontVariant.push( gFont.variant );
				}
				let data = {
					family: normalFontFamily,
					subsets: this.arrayUnique( gFontSubsets ),
					variant: this.arrayUnique( gFontVariant )
				};
				this.googleFonts[fontFamily] = data;
			} else {
				let data = {
					family: normalFontFamily,
					subsets: (this.definedNotEmpty(gFont.subsets) && Array.isArray( gFont.subsets )) ? gFont.subsets : [] ,
					variant: (this.definedNotEmpty(gFont.variant)) ? [gFont.variant] : []
				};
				this.googleFonts[fontFamily] = data;
			}
		}
	}

	getBlockCSS (currentBlock ) {
		if( null === currentBlock ){
			return;
		}
		let blockCSS = {};
		let blockName = (this.definedNotEmpty(currentBlock.name)) ? currentBlock.name : '';
		let blockId = (this.definedNotEmpty(currentBlock.clientId)) ? currentBlock.clientId: '';
		let blockAttr = (this.definedNotEmpty(currentBlock.attributes)) ? currentBlock.attributes : '';
		let blockOriginContent = (this.definedNotEmpty(currentBlock.originalContent)) ? currentBlock.originalContent : '';

		let parser = new DOMParser();
		let parsedHtml = parser.parseFromString(blockOriginContent, 'text/html');
		let firtChild = parsedHtml.body.childNodes;
		let targetSelector = '';
		
		let targetID = 'block-' + blockId;
		if( this.definedNotEmpty(blockAttr.uniqueID)) {
			targetID = 'block-' + blockAttr.uniqueID;
		} else if (firtChild.length > 0 && this.definedNotEmpty(firtChild[0].id)) {
			targetID = firtChild[0].id;
		}

		let targetClassName = '';
		if( this.definedNotEmpty(firtChild[0]) && 'function' === typeof( firtChild[0].getAttribute ) ) {
			targetClassName = firtChild[0].getAttribute('class');
		}
		
		if( !pmHelper.isUndefined( targetID ) && null !== targetID ) {
			targetSelector = `#${targetID}`;
		} else if( !pmHelper.isUndefined( targetClassName ) && null !== targetClassName ) {
			targetClassName = targetClassName.split(' ').join('.').replace('.undefined', '');
			if( '' != targetClassName ) {
				targetSelector = `.${targetClassName}`;
			}
		}
		
		if( !pmHelper.isUndefined( pmBlocksStyle[ blockName ] ) ) {
			let blockStyle = pmBlocksStyle[ blockName ];
			let selectorCSS = {};
			let entries = Object.entries(blockStyle);
			for( let j=0; j<entries.length; j++ ) {
				let selector = entries[j][0];
				selector = `${targetSelector} ${selector}`;
				
				let cssOrigin = '', cssHover = ''; 
				let cssDevices = {
					desktop: [],
					tablet: [],
					mobile: []
				};
				let cssProperties = entries[j][1];
				
				let cssProps = Object.keys(cssProperties);
			
				for( let a=0; a<cssProps.length; a++ ) {
					let propKey = cssProps[a];
					let propVal = cssProperties[cssProps[a]];
					if( this.definedNotEmpty( propKey ) && !pmHelper.isUndefined( propVal ) ) {
						let getPropVal = propVal;
						
						if( 'string' === typeof( propVal ) ) {
							getPropVal = t(blockAttr, propVal).safeObject;
						}
						
						if( !pmHelper.isUndefined( getPropVal ) ){ 
							switch( propKey ) {
								case "styling":
									let stylingCSS = this.getStylingCSS( getPropVal );
									if( '' !== stylingCSS ) {
										//CSS Normal.
										if( this.definedNotEmpty( stylingCSS.normal ) ) {
											if( this.definedNotEmpty( stylingCSS.normal.cssRule ) ) {
												cssOrigin += stylingCSS.normal.cssRule;
											}
											cssDevices = this.groupCSSByDevice( cssDevices, stylingCSS.normal.responsive );
											
											// Add css for a tag if has value.
											if( this.definedNotEmpty(getPropVal.normal.link_color)) {
												let linkColor = this.getColorCSS(getPropVal.normal.link_color);
												if( '' !== linkColor ) {
													selectorCSS[selector+' a'] = {
														css: `color: ${linkColor};`,
													};
												}
											}
										}
										//CSS Hover.
										if( this.definedNotEmpty( stylingCSS.hover ) ) {
											if( this.definedNotEmpty( stylingCSS.hover.cssRule ) ) {
												let cssHoverDevices = this.groupCSSByDevice( {desktop:[], tablet: [], mobile: []}, stylingCSS.hover.responsive );
												selectorCSS[selector+':hover'] = {
													css: stylingCSS.hover.cssRule,
													responsive: {
														desktop: (cssHoverDevices.desktop.length > 0) ? cssHoverDevices.desktop.join(' ') : '',
														tablet: (cssHoverDevices.tablet.length > 0) ? cssHoverDevices.tablet.join(' ') : '',
														mobile: (cssHoverDevices.mobile.length > 0 ) ? cssHoverDevices.mobile.join(' ') : '',
													}
												};

												// Add css for a tag if has value.
												if( this.definedNotEmpty(getPropVal.hover.link_color)) {
													let hoverLinkColor = this.getColorCSS(getPropVal.hover.link_color);
													if( '' !== hoverLinkColor ) {
														selectorCSS[selector+' a:hover'] = {
															css: `color: ${hoverLinkColor};`,
														};
													}
												}
											}
										}

									}
									
									break;
								case "typography":
									let typoCSS = this.getTypographyCSS(getPropVal);
									if( '' !== typoCSS ) {
										if( this.definedNotEmpty( typoCSS.cssRule ) ) {
											cssOrigin += typoCSS.cssRule;
										}
										cssDevices = this.groupCSSByDevice( cssDevices, typoCSS.responsive );
									}
									this.maybeHasGoogleFont( typoCSS );
									break;
								case "fonts":
									let fontsCSS = this.getFontCSS(getPropVal);
									if( '' !== fontsCSS ) {
										if( this.definedNotEmpty( fontsCSS.cssRule ) ) {
											cssOrigin += fontsCSS.cssRule;
										}
									}
									this.maybeHasGoogleFont( fontsCSS );
									break;
								case "color":
								case "border-color":
								case "background":
								case "background-color":
									let colorRule = '';
									let colorStr = this.getColorCSS( getPropVal );
									if( 'string' === typeof( getPropVal ) && this.isHexColor( getPropVal ) ) {
										colorStr = getPropVal;
									}
									if( '' !== colorStr ) {
										colorRule = `${propKey}:${colorStr};`;
										cssOrigin += colorRule;
									}
									
									break;
								case "normal-background":
									if( '' !== this.getNormalBackgroundCSS( getPropVal ) ) {
										cssOrigin += this.getNormalBackgroundCSS( getPropVal );
									}
									
									break;
								case "gradient-background":
									if( '' !== this.getGradientBackgroundCSS( getPropVal ) ) {
										cssOrigin += this.getGradientBackgroundCSS( getPropVal );
									}
									
									break;
								case "margin":
								case "padding":
									if( '' !== this.getCSSRulerCSS( getPropVal, propKey, 'px') ) {
										cssOrigin += this.getCSSRulerCSS( getPropVal, propKey, 'px');
									}
									break;
								case "marginDevices": 
								case "paddingDevices": 
									let spacingResponsive = this.getCSSRulerDeviceCSS( getPropVal, propKey.replace('Devices',''), 'px');
									cssDevices = this.groupCSSByDevice( cssDevices, spacingResponsive );
									break;
								case "borderWidth":
									if( '' !== this.getBorderWidthCSS( getPropVal, 'px' ) ) {
										cssOrigin += this.getBorderWidthCSS( getPropVal, 'px' );
									}
									break;
								case "borderWidthDevices":
									let borderWidthResponsive = this.getBorderWidthDevicesCSS( getPropVal, 'px');
									cssDevices = this.groupCSSByDevice( cssDevices, borderWidthResponsive );
									break;
								case "boxShadow" :
									if( '' !== this.getBoxShadowCSS( getPropVal ) ) {
										cssOrigin += this.getBoxShadowCSS( getPropVal );
									}
									break;
								case "borderBox" : 
									if( '' !== this.getBorderBoxCSS( getPropVal ) ) {
										cssOrigin += this.getBorderBoxCSS( getPropVal );
									}
									break;
								case "borderRadius": 
									if( '' !== this.getBorderRadiusCSS( getPropVal ) ) {
										cssOrigin += this.getBorderRadiusCSS( getPropVal );
									}
									break;
								default:
									let otherCSSRule = this.getOtherCSSRule(blockAttr, propKey, propVal);
									
									if( '' !== otherCSSRule ) {
										otherCSSRule = applyFilters( 'pmLiveCSSGetOtherCSSRule', otherCSSRule );
										cssOrigin += otherCSSRule;
									}
									break;
							} //End switch.
						}//IF propVal
					}
				}
				
				selectorCSS[selector] = {
					css: cssOrigin,
					responsive: {
						desktop: (cssDevices.desktop.length > 0) ? cssDevices.desktop.join(' ') : '',
						tablet: (cssDevices.tablet) ? cssDevices.tablet.join(' ') : '',
						mobile: (cssDevices.mobile) ? cssDevices.mobile.join(' ') : '',
					}
				};
				blockCSS[targetID] = selectorCSS;
			}
		}
		return applyFilters( 'pmLiveCSSGetBlockCSS', blockCSS );
	}

	isHexColor ( string_color ) {
		var isHex  = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(string_color);
		return !!isHex;
	}

	getAllBlocksCSS (blocks ) {
		let blockCSS = {};
		for( let i=0; i<blocks.length; i++ ) {
			let getBlockCSS = this.getBlockCSS( blocks[i] );
			
			if( '' !== getBlockCSS ) {
				let blockKey = Object.keys(getBlockCSS);
				for( let j=0; j<blockKey.length; j++ ) {
					blockCSS[blockKey[j]] = getBlockCSS[blockKey[j]];
				}
				
			}
		}
		return applyFilters( 'pmLiveCSSGetAllBlocksCSS', blockCSS, blocks );
	}

	getReadableCSS ( allBlockCSS ){
		let blockCSS = allBlockCSS;
		let cssAll = [], cssDesktop = [], cssTablet = [], cssMobile = [];
		
		let targetKeys = Object.keys(blockCSS);
		for( let i=0; i<targetKeys.length; i++ ) {
			let targetKey = targetKeys[i];
			let targetSelector = blockCSS[targetKey];

			let targetSelectorKeys = Object.keys(targetSelector);
			for( let j=0;j<targetSelectorKeys.length; j++ ) {
				let targetSelectorKey = targetSelectorKeys[j];
				let targetCSSData = targetSelector[targetSelectorKey];
				if( this.definedNotEmpty( targetCSSData.css ) ) {
					cssAll.push( `${targetSelectorKey} { ${targetCSSData.css} }` );
				}

				if( this.definedNotEmpty( targetCSSData.responsive ) ) {
					if( this.definedNotEmpty( targetCSSData.responsive.desktop ) ) {
						cssDesktop.push( `${targetSelectorKey} { ${targetCSSData.responsive.desktop} }` );
					}
					if( this.definedNotEmpty( targetCSSData.responsive.mobile ) ) {
						cssMobile.push( `${targetSelectorKey} { ${targetCSSData.responsive.mobile} }` );
						cssAll.push( `.pm-match-mobile ${targetSelectorKey} { ${targetCSSData.responsive.mobile} }` );
					}
					if( this.definedNotEmpty( targetCSSData.responsive.tablet ) ) {
						cssTablet.push( `${targetSelectorKey} { ${targetCSSData.responsive.tablet} }` );
						cssAll.push( `.pm-match-tablet ${targetSelectorKey} { ${targetCSSData.responsive.tablet} }` );
					}
				}
			}
		}

		let cssReable = {
			all: (cssAll.length > 0) ? cssAll.join( ' ' ) : '',
			desktop: (cssDesktop.length > 0) ? cssDesktop.join( ' ' ) : '',
			tablet: (cssTablet.length > 0) ? cssTablet.join( ' ' ) : '',
			mobile: (cssMobile.length > 0) ? cssMobile.join( ' ' ) : '',
		};
		return applyFilters( 'pmLiveCSSGetReadableCSS', cssReable, allBlockCSS );
	}

	getRunableCSS (readableCSS){
		
		let runableCSS = '';
		let mediaQueries = {
			all 	: '{{VALUE}}',
			desktop : '{{VALUE}}',
			tablet  : '@media screen and (max-width: 1024px) { {{VALUE}} }',
			mobile  : '@media screen and (max-width: 568px) { {{VALUE}} }',
		};

		mediaQueries = applyFilters( 'pmLiveCSSMediaQueries', mediaQueries, readableCSS );

		let deviceKeys = Object.keys(mediaQueries);
		for( let i=0;i<deviceKeys.length; i++ ) {
			let key = deviceKeys[i];
			if( this.definedNotEmpty( readableCSS[key] ) ) {
				let cssByDevice = readableCSS[key];
				let mediaQuery = mediaQueries[key];

				runableCSS += mediaQuery.replace('{{VALUE}}', cssByDevice) + '\n';
			}
		}
		return applyFilters( 'pmLiveCSSGetRunableCSS', runableCSS, readableCSS );
	}

	getBlockOutputCSS( allBlocks, selectedBlock ) {
		let allBlocksCSS = this.getAllBlocksCSS( allBlocks );
		//let blockChangedCSS = this.getBlockCSS( selectedBlock );
		let readableCSS = this.getReadableCSS( allBlocksCSS );
		let runableCSS = this.getRunableCSS( readableCSS );
		return applyFilters( 'pmLiveCSSGetBlockOutputCSS', runableCSS, allBlocks, selectedBlock );
	}

	getGoogleFontURL () {
		let gFontURL = '';
		let maybeGFont = this.googleFonts;
		let listGFont = Object.keys(this.googleFonts);
		
		if( listGFont.length > 0 ) {
			let gFontFamily = [], gFontSubsets = [];
			for( let i=0; i<listGFont.length; i++ ) {
				let fontKey = listGFont[i];
				let fontItem = maybeGFont[fontKey];
				let itemFamily = '';
				if( this.definedNotEmpty(fontItem.family) ) {
					itemFamily = fontItem.family.replace(' ', '+');
					if( this.definedNotEmpty(fontItem.variant) && '' !== fontItem.variant ) {
						itemFamily += ':' + fontItem.variant.join(',');
					}
					gFontFamily.push(itemFamily);
				}
				if( this.definedNotEmpty(fontItem.subsets) ) {
					gFontSubsets = gFontSubsets.concat(fontItem.subsets);
				}
			}
			
			if( gFontFamily.length > 0 ) {
				gFontFamily = applyFilters( 'pmLiveCSSGoogleFontFamily', gFontFamily, maybeGFont );
				gFontURL = 'https://fonts.googleapis.com/css?family=' + gFontFamily.join('|');
				
				if( gFontSubsets.length > 0 ) {
					gFontSubsets = applyFilters( 'pmLiveCSSGoogleFontSubsets', gFontSubsets, maybeGFont );
					gFontURL += '&subset=' + gFontSubsets.join(',');
				}
				
			}
			
		}
		return applyFilters( 'pmLiveCSSGoogleFontURL', gFontURL, maybeGFont );
	}

	renderStyleTag( styles, maybeGFontUrl ) {
		let cssRunableInput = document.getElementById('pm_blocks_style_css');
		let maybeGFontUrlInput = document.getElementById('pm_blocks_maybe_gfont_url');
		let css;
		
		if( 'string' === typeof (styles) && styles.length > 0 ) {
			cssRunableInput.value = styles;
		}
		let headTag = document.getElementsByTagName("head");
		// Add google font link.
		if( 'string' === typeof( maybeGFontUrl ) && maybeGFontUrl.length > 0 )  {
			if( null !== document.getElementById("pm_blocks-maybe-gfont-url-css") ){
				let existLinkTag = document.getElementById("pm_blocks-maybe-gfont-url-css");
				existLinkTag.href = maybeGFontUrl;
			}else{
				let linkTag = document.createElement('link');
				linkTag.rel = 'stylesheet';
				linkTag.id = 'pm_blocks-maybe-gfont-url-css';
				linkTag.href = maybeGFontUrl;
				headTag[0].insertBefore(linkTag, headTag[0].childNodes[0]);
			}
			maybeGFontUrlInput.value = maybeGFontUrl;
		}

		if( null !== document.getElementById("pm_blocks-cgb-block-editor-css-inline-css") ){
			css = document.getElementById("pm_blocks-cgb-block-editor-css-inline-css");
			if (css.styleSheet) {
				css.styleSheet.cssText = styles;
			} else {
				css.innerHTML = styles;
			}
		} else {
			css = document.createElement("style");
			css.type = "text/css";
			css.id = "pm_blocks-cgb-block-editor-css-inline-css";
			if (css.styleSheet) {
				css.styleSheet.cssText = styles;
			} else {
				css.appendChild(document.createTextNode(styles));
			}
			headTag[0].appendChild(css);
		}
	}

	outputLiveCSS( blocks, selectedBlock ) {
		let styles =  this.getBlockOutputCSS( blocks, selectedBlock );
		let maybeGFontUrl = this.getGoogleFontURL();
		let renderStyleTag = this.renderStyleTag(styles, maybeGFontUrl);
	}
}

export default PMLiveCSS;