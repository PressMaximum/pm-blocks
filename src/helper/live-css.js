import t from 'typy';
import { isEmpty } from "lodash";
const { applyFilters } =  wp.hooks;

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
			"borderWidthDevices": "styling.normal.margin"
		}
	}
};

export default function PMLiveCSS( guternbergBlocks ){
	const isHexColor = ( string_color ) => {
		var isHex  = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(string_color);
		return !!isHex;
	};
	
	const getCSSRulerCSS = ( input, cssProp, unit ) => {
		let returnValue = '';
		let link = ( definedNotEmpty(input.link) && input.link ) ? true : false;
		let listAttrs = ['top', 'right', 'bottom', 'left'];
		
		for(let i=0;i<listAttrs.length;i++){
			let key = listAttrs[i];
			let value = input[key];
			if( definedNotEmpty( value ) ) {
				if( link ) {
					returnValue = `${cssProp}:${value}${unit};`;
					break;
				} else {
					returnValue += `${cssProp}-${key}:${value}${unit};`;
				}
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
				let value = input[key];
				
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
		if( !isEmpty( returnValue ) ){
			return returnValue;
		}
		return '';
	};
	
	const getFontCSS = ( fontData ) => {
		let fontCSS = '';
		let fontFamily = ( definedNotEmpty( fontData.family ) ) ? fontData.family: '';
		let fontSubset = ( definedNotEmpty( fontData.subsets ) ) ? fontData.subsets: [];
		if( '' !== fontFamily ){ 
			fontCSS += `font-family:'${fontFamily}';`;
		}

		let googleFont = {};
	
		if( definedNotEmpty( fontData.font_type ) ){ 
			if( 'normal' !== fontData.font_type ) {
				if( 'google' === fontData.font_type ) {
					if( '' !== fontFamily ){ 
						googleFont['family'] = fontFamily;
					}
	
					if( fontSubset.length > 0 ) {
						googleFont['subsets'] = fontSubset;
					}
				}
				if( 'undefined' !== typeof ( fontData.variant ) && '' !== fontData.variant ){
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
				if( definedNotEmpty( fontData.style ) ){ 
					fontCSS += `font-style:${fontData.variant}`;
				}
			}
		}

		let returnValue = {
			cssRule: fontCSS,
		}
		if( !isEmpty( googleFont ) ) {
			returnValue['googleFont'] = googleFont;
		}
		return returnValue;
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
							cssRule += `background-color:${bgColor};`;
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
	
	const getBorderWidthCSS = (width, unit ) => {
		let borderCSS = '';
		let listKeys = [
			'top', 'right', 'bottom', 'left'
		];

		let link = ( definedNotEmpty( width.link ) && width.link ) ? true : false;
		for( let i=0; i<listKeys.length; i++ ) {
			let key = listKeys[i];
			if( definedNotEmpty( width[key] ) ) {
				if( link ) {
						borderCSS = `border-width: ${width[key]}${unit};`;
						break;
					
				} else {
					borderCSS += `border-${key}-width: ${width[key]}${unit};`;
				}
			}
		}
		return borderCSS;
	};

	const getBorderWidthDevicesCSS = ( input, unit ) => {
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
			
			returnValue[attrDeviceKey] = getBorderWidthCSS( valueObj, unit);
		}
		return returnValue;
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

			if( definedNotEmpty( radius[key] ) ) {
				if( link ) {
					radiusCSS = `border-radius: ${radius[key]};`;
					break;
				} else {
					radiusCSS += `border-${keyValue}-radius: ${radius[key]};`;
				}
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
			if( definedNotEmpty( width ) ) {
				borderCSS = getBorderWidthCSS(width, 'px');
			}
			if( definedNotEmpty( radius ) ) {
				borderCSS = getBorderRadiusCSS( radius );
			}
			if( definedNotEmpty( shadow ) ) {
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
				let colorStr = getColorCSS( color );
				if( '' !== colorStr ){
					if ( inset ) {
						boxShadowCSS = `box-shadow: inset ${x} ${y} ${blur} ${spread} ${colorStr};`;
					} else {
						boxShadowCSS = `box-shadow: ${x} ${y} ${blur} ${spread} ${colorStr};`;
					}
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
				let stylingCSS = '', stylingResponsive = [];
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
						stylingResponsive.push( deviceMargin );
					}
		
					// Get padding.
					if( definedNotEmpty( stylingData.padding ) ){
						let devicePadding = getCSSRulerDeviceCSS( stylingData.padding, 'padding', 'px' );
						stylingResponsive.push( devicePadding );
					}
					returnValue[key] = {
						cssRule: stylingCSS,
						responsive: getGroupStylingResponsive(stylingResponsive)
					};
				}
			}
		}
		if( !isEmpty( returnValue ) ){
			return returnValue;
		}
		return '';
	};
	
	const getTypographyCSS = (typography) => {
		let typoCSS = '';
		let stylingResponsive = [];
		let googleFont;
		if( definedNotEmpty( typography ) ){
			if( definedNotEmpty( typography.text_decoration ) ){
				typoCSS += `text-decoration: ${typography.text_decoration};`;
			}
			if( definedNotEmpty ( typography.text_transform ) ){
				typoCSS += `text-transform: ${typography.text_transform};`;
			}
	
			if( definedNotEmpty( typography.font ) ){
				let fontCSS = getFontCSS( typography.font );
				if( definedNotEmpty( fontCSS.cssRule ) ) {
					typoCSS += fontCSS.cssRule;
				}

				if( definedNotEmpty( fontCSS.googleFont ) ) {
					googleFont = fontCSS.googleFont;
				}
			}
	
			if( definedNotEmpty( typography.font_size ) ){
				let getFontSize = getRangeDeviceCSS( typography.font_size, 'font-size', 'px' );
				stylingResponsive.push( getFontSize );
			}
	
			if( definedNotEmpty( typography.letter_spacing ) ){
				let getLetterSpacing = getRangeDeviceCSS( typography.letter_spacing, 'letter-spacing', 'px' );
				stylingResponsive.push( getLetterSpacing );
			}
			if( definedNotEmpty( typography.line_height ) ){
				let getLineHeight = getRangeDeviceCSS( typography.line_height, 'line-height', 'px' );
				stylingResponsive.push( getLineHeight );
			}
		}
		
		let returnValue = {
			cssRule: typoCSS,
			responsive: getGroupStylingResponsive( stylingResponsive )
		};
		if ( !isEmpty( googleFont ) ) {
			returnValue['googleFont'] = googleFont;
		}
		return returnValue;
	};

	const getGroupStylingResponsive = (stylingResponsive) => {
		let returnValue = {};
		if( !isEmpty( stylingResponsive ) ) {
			let desktop = [], tablet=[], mobile = [];
			for( let i=0; i<stylingResponsive.length; i++ ) {
				let value = stylingResponsive[i];
				if( definedNotEmpty( value.desktop ) ) {
					desktop.push( value.desktop );
				}

				if( definedNotEmpty( value.tablet ) ) {
					tablet.push( value.tablet );
				}

				if( definedNotEmpty( value.mobile ) ) {
					mobile.push( value.mobile );
				}
			}
			
			if( !isEmpty( desktop ) ) {
				returnValue['desktop'] = desktop.join(' ');
			}
			if( !isEmpty( tablet ) ) {
				returnValue['tablet'] = tablet.join(' ');
			}
			if( !isEmpty( mobile ) ) {
				returnValue['mobile'] = mobile.join(' ');
			}
		}
		if( !isEmpty( returnValue ) ){
			return returnValue;
		}
		return '';
	};

	const groupCSSByDevice = ( storeVal, responsive ) => {
		if( definedNotEmpty(responsive.desktop) ) {
			storeVal.desktop.push(responsive.desktop);
		}

		if( definedNotEmpty(responsive.tablet) ) {
			storeVal.tablet.push(responsive.tablet);
		}

		if( definedNotEmpty(responsive.mobile) ) {
			storeVal.mobile.push(responsive.mobile);
		}
		return storeVal;
	};

	const getBlockCSS = (blocks ) => {
		//blocks = this.gutenBlocks;
		let blockCSS = {};
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
			let targetID = (definedNotEmpty(firtChild[0].id)) ? firtChild[0].id: blockId;
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
						if( definedNotEmpty( propKey ) ) {
							let getPropVal = t(blockAttr, propVal).safeObject;
							switch( propKey ) {
								case "styling":
									if( 'undefined' !== typeof( getPropVal ) ){ 
										let stylingCSS = getStylingCSS( getPropVal );
										if( !isEmpty( stylingCSS ) ) {
											//CSS Normal.
											if( definedNotEmpty( stylingCSS.normal ) ) {
												if( definedNotEmpty( stylingCSS.normal.cssRule ) ) {
													cssOrigin += stylingCSS.normal.cssRule;
												}
												cssDevices = groupCSSByDevice( cssDevices, stylingCSS.normal.responsive );
											}
											//CSS Hover.
											if( definedNotEmpty( stylingCSS.hover ) ) {
												if( definedNotEmpty( stylingCSS.hover.cssRule ) ) {
													let cssHoverDevices = groupCSSByDevice( {desktop:[], tablet: [], mobile: []}, stylingCSS.hover.responsive );
													selectorCSS[selector+':hover'] = {
														css: stylingCSS.hover.cssRule,
														responsive: {
															desktop: cssHoverDevices.desktop.join(' '),
															tablet: cssHoverDevices.tablet.join(' '),
															mobile: cssHoverDevices.mobile.join(' '),
														}
													};
												}
											}

										}
									}
									break;
								case "typography":
									if( 'undefined' !== typeof( getPropVal ) ){ 
										let typoCSS = getTypographyCSS(getPropVal);
										if( !isEmpty( typoCSS ) ) {
											if( definedNotEmpty( typoCSS.cssRule ) ) {
												cssOrigin += typoCSS.cssRule;
											}
											cssDevices = groupCSSByDevice( cssDevices, typoCSS.responsive );
										}
									}
									break;
								case "color":
								case "border-color":
								case "background":
								case "background-color":
									if( 'undefined' !== typeof( getPropVal ) ){
										let colorRule = '';
										let colorStr = getColorCSS( getPropVal );
										if( '' !== colorStr ) {
											colorRule = `${propKey}:${colorStr};`;
										}
										cssOrigin += colorRule;
									}
									break;
								case "normal-background":
									if( 'undefined' !== typeof( getPropVal ) ){
										if( !isEmpty( getNormalBackgroundCSS( getPropVal ) ) ) {
											cssOrigin += getNormalBackgroundCSS( getPropVal );
										}
									}
									break;
								case "gradient-background":
									if( 'undefined' !== typeof( getPropVal ) ){
										if( !isEmpty( getGradientBackgroundCSS( getPropVal ) ) ) {
											cssOrigin += getNormalBackgroundCSS( getPropVal );
										}
									}
									break;
								case "margin":
								case "padding":
									if( 'undefined' !== typeof( getPropVal ) ){
										if( !isEmpty( getCSSRulerCSS( getPropVal, propKey, 'px') ) ) {
											cssOrigin += getCSSRulerCSS( getPropVal, propKey, 'px');
										}
									}
									break;
								case "marginDevices": 
								case "paddingDevices": 
									if( 'undefined' !== typeof( getPropVal ) ){
										let spacingResponsive = getCSSRulerDeviceCSS( getPropVal, propKey.replace('Devices',''), 'px');
										cssDevices = groupCSSByDevice( cssDevices, spacingResponsive );
									}
									break;
								case "borderWidth":
									if( 'undefined' !== typeof( getPropVal ) ){
										if( !isEmpty( getBorderWidthCSS( getPropVal, 'px' ) ) ) {
											cssOrigin += getBorderWidthCSS( getPropVal, 'px' );
										}
									}
									break;
								case "borderWidthDevices":
									if( 'undefined' !== typeof( getPropVal ) ){
										let borderWidthResponsive = getBorderWidthDevicesCSS( getPropVal, 'px');
										cssDevices = groupCSSByDevice( cssDevices, borderWidthResponsive );
									}
									break;
								default:
									if( 'undefined' !== typeof( getPropVal ) ){
										cssOrigin += `${propKey}:${getPropVal};`;
									}
									break;
							} //End switch.
						}
					}
					
					selectorCSS[selector] = {
						css: cssOrigin,
						responsive: {
							desktop: cssDevices.desktop.join(' '),
							tablet: cssDevices.tablet.join(' '),
							mobile: cssDevices.mobile.join(' '),
						}
					};
					blockCSS[targetID] = selectorCSS;
				}
			}
		};
		return applyFilters( 'pmLiveCSSGetBlockCSS', blockCSS );
	};

	const getReadableCSS = ( guternbergBlocks ) => {
		let blockCSS = getBlockCSS(guternbergBlocks);
		let cssAll = [], cssDesktop = [], cssTablet = [], cssMobile = [];
		
		let targetKeys = Object.keys(blockCSS);
		for( let i=0; i<targetKeys.length; i++ ) {
			let targetKey = targetKeys[i];
			let targetSelector = blockCSS[targetKey];

			let targetSelectorKeys = Object.keys(targetSelector);
			for( let j=0;j<targetSelectorKeys.length; j++ ) {
				let targetSelectorKey = targetSelectorKeys[j];
				let targetCSSData = targetSelector[targetSelectorKey];

				if( definedNotEmpty( targetCSSData.css ) ) {
					cssAll.push( `${targetSelectorKey} { ${targetCSSData.css} }` );
				}

				if( definedNotEmpty( targetCSSData.responsive ) ) {
					if( definedNotEmpty( targetCSSData.responsive.desktop ) ) {
						cssDesktop.push( `${targetSelectorKey} { ${targetCSSData.responsive.desktop} }` );
					}

					if( definedNotEmpty( targetCSSData.responsive.mobile ) ) {
						cssTablet.push( `${targetSelectorKey} { ${targetCSSData.responsive.mobile} }` );
					}

					if( definedNotEmpty( targetCSSData.responsive.tablet ) ) {
						cssMobile.push( `${targetSelectorKey} { ${targetCSSData.responsive.tablet} }` );
					}
				}
			}
		}

		let cssReable = {
			all: cssAll.join( ' ' ),
			desktop: cssDesktop.join( ' ' ),
			tablet: cssTablet.join( ' ' ),
			mobile: cssMobile.join( ' ' ),
		};
		return applyFilters( 'pmLiveCSSGetReadableCSS', cssReable );
	};

	const getRunableCSS = (guternbergBlocks) => {
		let readableCSS = getReadableCSS( guternbergBlocks );
		let runableCSS = '';
		let mediaQueries = {
			all 	: '{{VALUE}}',
			desktop : '{{VALUE}}',
			tablet  : '@media screen and (max-width: 1024px) { {{VALUE}} }',
			mobile  : '@media screen and (max-width: 568px) { {{VALUE}} }',
		};

		let deviceKeys = Object.keys(mediaQueries);
		for( let i=0;i<deviceKeys.length; i++ ) {
			let key = deviceKeys[i];
			let cssByDevice = readableCSS[key];
			let mediaQuery = mediaQueries[key];

			if( definedNotEmpty( cssByDevice ) ) {
				runableCSS += mediaQuery.replace('{{VALUE}}', cssByDevice) + '\n';
			}
		}

		return applyFilters( 'pmLiveCSSGetRunableCSS', runableCSS );
	};

	return getRunableCSS(guternbergBlocks);
}
/**
let ReturnValue = [
	targetID: {
		selector : {
			css: '',
			cssResponsive: {
				desktop: '',
				tablet: '',
				mobile: ''
			}
		},
		selector2 : {
			css: '',
			cssResponsive: ''
		}
	}
]
 */