import t from 'typy';
var pmBlocksStyle ={
	"pm-blocks/block-my-heading" : {
		"h2": {
			"styling": "styling",
			"typography": "typo",
			"color": "color.hex"
		},
		".post_excerpt": {
			"background": "color.rgba"
		}
	}
};
var pmCSS = {
	desktop: '',
	tablet: '',
	mobile: '',
};

var pmCSSResponsive = [];

export default function PMLiveCSS( guternbergBlocks ){
	const isHexColor = ( string_color ) => {
		var isHex  = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(string_color);
	
		return !!isHex;
	};
	
	const getCSSRulerCSS = ( input, cssProp, unit ) => {
		let returnValue = '';
		let link = ( definedNotEmpty(input.link) ) ? true : false;
		let listAttrs = ['top', 'right', 'bottom', 'left', 'link'];
		
		for(let i=0;i<listAttrs.length;i++){
			let key = listAttrs[i];
			let value = input[key];

			if( link ) {
				if( definedNotEmpty( value ) ) {
					returnValue = `${cssProp}:${value}${unit}`;
					break;
				}
			} else {
				returnValue += `${cssProp}-${key}:${value}${unit}`;
			}
		}
		return returnValue;
	};
	
	const getCSSRulerDeviceCSS = ( input, cssProp, unit ) => {
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
				let value = input[attrDeviceVal];
				if( definedNotEmpty(value) ) {
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
			returnValue[attrDeviceKey] = getCSSRulerCSS( valueObj, cssProp, unit);
		}
		return returnValue;
	};
	
	const getRangeDeviceCSS = ( input, cssProp, unit ) => {
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

			if( definedNotEmpty( input[inputKey] ) ) {
				returnValue[objKey] = `${cssProp}:${input[inputKey]}${unit};`;
			}
		}
		return returnValue;
	};
	
	const getFontCSS = ( fontData ) => {
		let fontCSS = '';
		let fontFamily = ( definedNotEmpty( fontData.family ) ) ? fontData.family: '';
		let fontSubset = ( definedNotEmpty( fontData.subsets ) ) ? fontData.subsets: [];
		if( '' !== fontFamily ){ 
			fontCSS += `font-family:${fontFamily};`;
		}
	
		if( definedNotEmpty( fontData.font_type ) ){ 
			if( 'normal' !== fontData.font_type ) {
				if( 'google' === fontData.font_type ) {
					let googleFontURL = 'https://fonts.googleapis.com/css';
					if( '' !== fontFamily ){ 
						googleFontURL += `?family=${fontFamily.split(' ').join('+')}`;
					}
	
					if( fontSubset.length > 0 ) {
						googleFontURL += `&subset=${fontSubset.join(',')}`;
					}
				}
				if( 'undefined' !== typeof ( fontData.variant ) && '' !== fontData.variant ){
					if( 'regular' == fontData.variant || !isNaN( fontData.variant ) ) {
						fontCSS += `font-weight:${fontData.variant};`;
					} else if( fontData.variant.includes( "italic" ) ) {
						let fontWeight = fontData.variant.replace( 'italic', '' );
						fontCSS += `font-style:italic;`;
						if( '' !== fontWeight ){
							fontCSS += `font-weight:${fontWeight};`;
						}
					}
					//fontCSS += `font-style:${fontData.variant}`;
				}
			} else{
				if( definedNotEmpty( fontData.style ) ){ 
					fontCSS += `font-style:${fontData.variant}`;
				}
			}
		}
		return fontCSS;
	};
	const definedNotEmpty = ( value ) => {
		if( 'undefined' !== typeof ( value ) && '' !== value ) {
			return true;
		}
		return false;
	};
	
	const getNormalBackgroundCSS = ( normalBackground ) => {
		let cssRule = '';
		let bgKeys = [
			'attachment',
			'image',
			'position',
			'repeat',
			'size',
			'color'
		];

		if( definedNotEmpty( normalBackground ) ){
			for( let i=0; i<bgKeys.length; i++ ) {
				let bgKey = bgKeys[i];
				if( definedNotEmpty( normalBackground[bgKey] ) ) {
					if( 'color' === bgKey ) {
						let bgColor = getColorCSS(normalBackground[bgKey]);
						if( '' !== bgColor ) {
							cssRule += `background-color:${normalBackground[bgKey]};`;
						}
					} else if( 'image' === bgKey ) {
						if( definedNotEmpty( normalBackground[bgKey]['url'] ) ) {
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
	
	const getGradientBackgroundCSS = ( gradientBackground ) => {
		let bgCSS = '';
		if( 'undefined' !== typeof( gradientBackground ) ){
			let type = ( definedNotEmpty( gradientBackground.type ) ) ? gradientBackground.type : 'linear';
			let color = ( definedNotEmpty( gradientBackground.color ) ) ? gradientBackground.color : '';
			let second_color = ( definedNotEmpty( gradientBackground.second_color ) ) ? gradientBackground.second_color : '';
			let location = ( definedNotEmpty( gradientBackground.location ) ) ? gradientBackground.location : '';
			let second_location = ( definedNotEmpty( gradientBackground.second_location ) ) ? gradientBackground.second_location : '';
			let angle = ( definedNotEmpty( gradientBackground.angle ) ) ? gradientBackground.angle : '';
	
			if( '' !== type && '' !== color && '' !== second_color && '' !== location && '' !== second_color && '' !== angle ){
				bgCSS = `background: rgb(${color.r},${color.g},${color.b});`;
				if( 'linear' === type ) {
					bgCSS += `background: linear-gradient(${angle}deg, rgba(${color.r},${color.g},${color.b},${color.a}) ${location}%, rgba(${second_color.r},${second_color.g},${second_color.b},${second_color.a}) ${second_location}%);`;
				}else{
					bgCSS += `background: radial-gradient(circle, rgba(${color.r},${color.g},${color.b},${color.a}) ${location}%, rgba(${second_color.r},${second_color.g},${second_color.b},${second_color.a}) ${second_location}%);`;
				}
			}
		}
		return bgCSS;
	};
	
	const getBorderWidthCSS = (width) => {
		let borderCSS = '';
		let listKeys = [
			'top', 'right', 'bottom', 'left'
		];

		let link = ( definedNotEmpty( width.link ) && width.link ) ? true : false;
		for( let i=0; i<listKeys.length; i++ ) {
			let key = listKeys[i];
			if( link ) {
				if( definedNotEmpty( width[key] ) ) {
					borderCSS = `border-width: ${width[key]};`;
					break;
				}
			} else {
				borderCSS += `border-${key}-width: ${width[key]};`;
			}
		}
		return borderCSS;
	};
	
	const getBorderRadiusCSS = (radius) => {
		let radiusCSS = '';
		let link = ( definedNotEmpty( radius.link ) && radius.link ) ? true : false;
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

			if( link ) {
				if( definedNotEmpty( width[key] ) ) {
					radiusCSS = `border-radius: ${radius[width[key]]};`;
					break;
				}
			} else {
				radiusCSS += `border-${keyValue}-radius: ${radius[width[key]]};`;
			}
		}
		return radiusCSS;
	};
	
	const getColorCSS = (color) => {
		let colorStr = '';
		if( 'undefined' !== typeof( color.hex ) ) {
			colorStr = color.hex;
	
			if( 'undefined' !== typeof( color.rgba ) ) {
				if( 'undefined' !== typeof( color.rgba.a ) && color.rgba.a < 1 ){ 
					colorStr = `rgba(${color.rgba.r}, ${color.rgba.g}, ${color.rgba.b}, ${color.rgba.a})`;
				}
			}
		}
	
		return colorStr;
	};
	
	const getBorderBoxCSS = (borderBox) => {
		let borderCSS = '';
		if( 'undefined' !== typeof( borderBox ) ){
			let color = ( definedNotEmpty( borderBox.color ) ) ? borderBox.color : {};
			let radius = ( definedNotEmpty( borderBox.radius ) ) ? borderBox.radius : {};
			let shadow = ( definedNotEmpty( borderBox.shadow ) ) ? borderBox.shadow : {};
			let style = ( definedNotEmpty( borderBox.style ) ) ? borderBox.style : '';
			let width = ( definedNotEmpty( borderBox.width ) ) ? borderBox.width : {};
	
			if( '' !== style ) {
				borderCSS += `border-style: ${style};`;
			}
			if( '' !== color ) {
				let colorVal = getColorCSS( color );
				if( '' !== colorVal ) {
					borderCSS += `border-color: ${colorVal};`;
				}
			}
			if( 'undefined' !== typeof( width.top ) ) {
				borderCSS = getBorderWidthCSS(width);
			}
			if( 'undefined' !== typeof( radius.top ) ) {
				borderCSS = getBorderRadiusCSS( radius );
			}
			if( shadow ) {
				borderCSS += getBoxShadowCSS( shadow );
			}
		}
		return borderCSS;
	};
	
	const getBoxShadowCSS = (boxShadow) => {
		let boxShadowCSS = '';
		if( definedNotEmpty( boxShadow ) ){
			let color = ( definedNotEmpty( boxShadow.color ) ) ? boxShadow.color : '';
			let x = ( definedNotEmpty( boxShadow.x ) ) ? boxShadow.x : '';
			let y = ( definedNotEmpty( boxShadow.y ) ) ? boxShadow.y : '';
			let blur = ( definedNotEmpty( boxShadow.blur ) ) ? boxShadow.blur : '';
			let spread = ( definedNotEmpty( boxShadow.spread ) ) ? boxShadow.spread : '';
			let inset = ( definedNotEmpty( boxShadow.inset ) && boxShadow.inset ) ? true : false;
	
			if( '' !== color && '' !== x && '' !== y && '' !== blur && '' !== spread ){
				if ( inset ) {
					boxShadowCSS = `box-shadow: inset ${x} ${y} ${blur} ${spread} rgba(${color.r}, ${color.g}, ${color.b}, ${color.a});`;
				} else {
					boxShadowCSS = `box-shadow: ${x} ${y} ${blur} ${spread} rgba(${color.r}, ${color.g}, ${color.b}, ${color.a});`;
				}
			}
			
		}
		return boxShadowCSS;
	};
	
	const getStylingCSS = (styling) => {
		let returnValue = {};
		let stylingType = [ 'normal', 'hover' ];

		if( definedNotEmpty( styling ) ){
			// Styling normal.
			for( let i=0; i<stylingType.length; i++ ) {
				let key = stylingType[i];
				let stylingData = styling[key];
				let stylingCSS = '';
				if( definedNotEmpty( stylingData ) ){
					// Get background CSS.
					if( definedNotEmpty( stylingData.background ) ){
						let normalBGType = ( definedNotEmpty( stylingData.background.bg_type ) ) ? stylingData.background.bg_type : '';
						
						if( 'normal' === normalBGType ) {
							if( definedNotEmpty( stylingData.background.bg_value.normal ) ){
								stylingCSS += getNormalBackgroundCSS( stylingData.background.bg_value.normal );
							}
						} else if( 'gradient' === normalBGType ) {
							if( definedNotEmpty( stylingData.background.bg_value.gradient ) ){
								stylingCSS += getGradientBackgroundCSS( stylingData.background.bg_value.gradient );
							}
						}
					}
					// Get border box CSS.
					if( definedNotEmpty( stylingData.border_box ) ){
						stylingCSS += getBorderBoxCSS( stylingData.border_box );
					}
					// Get color CSS.
					if( definedNotEmpty( stylingData.color ) ){
						let colorStr = getColorCSS(stylingData.color);
						if( '' !== colorStr ) {
							stylingCSS += `color:${colorStr};`;
						}
					}
					// Get link color CSS.
				
					// Get margin.
					if( definedNotEmpty( stylingData.margin ) ){
						let deviceMargin = getCSSRulerDeviceCSS( stylingData.margin, 'margin', 'px' );
					}
		
					// Get padding.
					if( definedNotEmpty( stylingData.padding ) ){
						let devicePadding = getCSSRulerDeviceCSS( stylingData.padding, 'padding', 'px' );
					}
					returnValue[key] = '';
				}
			}
		}
		return returnValue;
	};
	
	const getTypographyCSS = (typography) => {
		let typoCSS = '';
		if( definedNotEmpty( typography ) ){
			if( definedNotEmpty( typography.text_decoration ) ){
				typoCSS += `text-decoration: ${typography.text_decoration}`;
			}
			if( definedNotEmpty ( typography.text_transform ) ){
				typoCSS += `text-transform: ${typography.text_transform}`;
			}
	
			if( definedNotEmpty( typography.font ) ){
				let fontCSS = getFontCSS( typography.font );
				if( '' !== fontCSS ) {
					typoCSS += fontCSS;
				}
			}
	
			if( definedNotEmpty( typography.font_size ) ){
				let getFontSize = getRangeDeviceCSS( typography.font_size, 'font-size', 'px' );
			}
	
			if( definedNotEmpty( typography.letter_spacing ) ){
				let getLetterSpacing = getRangeDeviceCSS( typography.letter_spacing, 'letter-spacing', 'px' );
			}
			if( definedNotEmpty( typography.line_height ) ){
				let getLineHeight = getRangeDeviceCSS( typography.line_height, 'line-height', 'px' );
			}
		}
		return typoCSS;
	};

	const getBlockCSS = (blocks ) => {
		//blocks = this.gutenBlocks;
		let blockCSS = '';
		for( let i=0; i<blocks.length; i++ ) {
			let currentBlock = blocks[i];
			let blockName = currentBlock.name;
			let blockId = currentBlock.clientId;
			let blockAttr = currentBlock.attributes;
			let blockOriginContent = currentBlock.originalContent;
	
			let parser = new DOMParser();
			let parsedHtml = parser.parseFromString(blockOriginContent, 'text/html');
			let firtChild = parsedHtml.body.childNodes;
			let targetSelector = '';
			let targetID = firtChild[0].id;
			let targetClassName = firtChild[0].getAttribute('class');
			
			if( 'undefined' !== typeof( targetID ) && null !== targetID ) {
				targetSelector = `#${targetID}`;
			} else if( 'undefined' !== typeof( targetClassName ) && null !== targetClassName ) {
				targetClassName = targetClassName.split(' ').join('.').replace('.undefined', '');
				if( '' != targetClassName ) {
					targetSelector = `.${targetClassName}`;
				}
			}
			
			
			if( 'undefined' !== typeof( pmBlocksStyle[ blockName ] ) ) {
				let blockStyle = pmBlocksStyle[ blockName ];
				
				let entries = Object.entries(blockStyle);
				for( let j=0; j<entries.length; j++ ) {
					let selector = entries[j][0];
					selector = `${targetSelector} ${selector}`;
					let cssRule = '', cssRuleResponsive = '';
					let cssProperties = entries[j][1];
					
					let cssProps = Object.keys(cssProperties);
					for( let a=0; a<cssProps.length; a++ ) {
						let propKey = cssProps[a];
						let propVal = cssProperties[cssProps[a]];
						let cssResponsive = { desktop: '', tablet : '', mobile : '' };
						
						if( 'undefined' !== propKey && '' !== propKey ) {
							let getPropVal = t(blockAttr, propVal).safeObject;
							switch( propKey ) {
								case "styling":
									if( 'undefined' !== typeof( getPropVal ) ){ 
										let stylingCSS = getStylingCSS( getPropVal );
										if( '' !== stylingCSS ) {
											console.log('stylingCSS: ',  stylingCSS);
											cssRule += stylingCSS;
										}
									}
									//bla
									break;
								case "typography":
									if( 'undefined' !== typeof( getPropVal ) ){ 
										let typoCSS = getTypographyCSS(getPropVal);
										if( '' !== typoCSS ) {
											console.log('typoCSS: ', typoCSS);
											cssRule += typoCSS;
										}
									}
									break;
								case "color":
								case "border-color":
								case "background":
								case "background-color":
									if( 'undefined' !== typeof( getPropVal ) ){
										if( 'undefined' !== typeof( getPropVal.r ) && 'undefined' !== typeof( getPropVal.g ) && 'undefined' !== typeof( getPropVal.b ) && 'undefined' !== typeof( getPropVal.a ) ) {
											cssRule += `${propKey}: rgba( ${getPropVal.r}, ${getPropVal.g}, ${getPropVal.b}, ${getPropVal.a});`;
										} else if ( isHexColor( getPropVal ) ) {
											cssRule += `${propKey}:${getPropVal};`;
										}
									}
									break;
								case "normal-background":
									if( 'undefined' !== typeof( getPropVal ) ){
										cssRule += getNormalBackgroundCSS( getPropVal );
	
										console.log('normalBG: ', getNormalBackgroundCSS( getPropVal ));
									}
									break;
								case "gradient-background":
									if( 'undefined' !== typeof( getPropVal ) ){
										cssRule += getGradientBackgroundCSS( getPropVal );
										console.log('gradientBG: ', getGradientBackgroundCSS( getPropVal ));
									}
									break;
								default:
									if( 'undefined' !== typeof( getPropVal ) ){
										cssRule += `${propKey}:${getPropVal};`;
									}
									break;
							} //End switch.
						}
					}
	
					//if( '' !== cssRule ) { 
						blockCSS += `${selector}: {${cssRule}}`;
					//} 
					
				}
			}
			
		}
		
		return blockCSS;
		
	};

	return getBlockCSS(guternbergBlocks);
}