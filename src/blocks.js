/**
 * Gutenberg Blocks
 *
 * All blocks related JavaScript files should be imported here.
 * You can create a new block folder in this dir and include code
 * for that block here as well.
 *
 * All blocks should be included here since this is the file that
 * Webpack is compiling as the input file.
 */
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
var pmCSS = '';

const isHexColor = ( string_color ) => {
	var isHex  = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(string_color);

	return !!isHex;
};

const getCSSRangeDeviceControl = ( input, css_prop, unit ) => {
	let return_value = {
		desktop: '',
		tablet: '',
		mobile: '',
	};
	if( 'undefined' !== typeof ( input.value ) && '' !== input.value ){
		return_value.desktop = `${css_prop}:${input.value}${unit};`;
	}
	if( 'undefined' !== typeof ( input.value_tablet ) && '' !== input.value_tablet ){
		return_value.tablet = `${css_prop}:${input.value_tablet}${unit};`;
	}
	if( 'undefined' !== typeof ( input.value_mobile ) && '' !== input.value_mobile ){
		return_value.mobile = `${css_prop}:${input.value_mobile}${unit};`;
	}
	return return_value;
}

const getFontCSS = ( fontData ) => {
	let fontCSS = '';
	let fontFamily = ( 'undefined' !== typeof ( fontData.family ) && '' !== fontData.family ) ? fontData.family: '';
	let fontSubset = ( 'undefined' !== typeof ( fontData.subsets ) && '' !== fontData.subsets ) ? fontData.subsets: [];
	if( '' !== fontFamily ){ 
		fontCSS += `font-family:${fontFamily};`;
	}

	if( 'undefined' !== typeof ( fontData.font_type ) && '' !== fontData.font_type ){ 
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
			if( 'undefined' !== typeof ( fontData.style ) && '' !== fontData.style ){ 
				fontCSS += `font-style:${fontData.variant}`;
			}
		}
	}
	return fontCSS;
}

const getNormalBackgroundCSS = ( normalBackground ) => {
	if( 'undefined' !== typeof( normalBackground ) ){
		if( 'undefined' !== typeof ( normalBackground.attachment ) ){
			cssRule += `background-attachment:${normalBackground.attachment };`;
		}
		if( 'undefined' !== typeof ( normalBackground.image ) && 'undefined' !== typeof ( normalBackground.image.url ) ){
			cssRule += `background-image:url(${normalBackground.image.url });`;
		}
		if( 'undefined' !== typeof ( normalBackground.position ) ){
			cssRule += `background-position:${normalBackground.position };`;
		}
		if( 'undefined' !== typeof ( normalBackground.repeat ) ){
			cssRule += `background-repeat:${normalBackground.repeat };`;
		}
		if( 'undefined' !== typeof ( normalBackground.size ) ){
			cssRule += `background-size:${normalBackground.size };`;
		}
		if( 'undefined' !== typeof ( normalBackground.color ) ){
			if( 'undefined' !== typeof( normalBackground.color.r ) && 'undefined' !== typeof( normalBackground.color.g ) && 'undefined' !== typeof( normalBackground.color.b ) && 'undefined' !== typeof( normalBackground.color.a ) ) {
				cssRule += `background-color: rgba( ${normalBackground.color.r}, ${normalBackground.color.g}, ${normalBackground.color.b}, ${normalBackground.color.a});`;
			} else if ( isHexColor( normalBackground.color.hex ) ) {
				cssRule += `background-color:${normalBackground.color.hex};`;
			}
		}
	}
}

const getGradientBackgroundCSS = ( gradientBackground ) => {
	let bgCSS = '';
	if( 'undefined' !== typeof( gradientBackground ) ){
		let type = ( 'undefined' !== typeof ( gradientBackground.type ) ) ? gradientBackground.type : 'linear';
		let color = ( 'undefined' !== typeof ( gradientBackground.color ) ) ? gradientBackground.color : '';
		let second_color = ( 'undefined' !== typeof ( gradientBackground.second_color ) ) ? gradientBackground.second_color : '';
		let location = ( 'undefined' !== typeof ( gradientBackground.location ) ) ? gradientBackground.location : '';
		let second_location = ( 'undefined' !== typeof ( gradientBackground.second_location ) ) ? gradientBackground.second_location : '';
		let angle = ( 'undefined' !== typeof ( gradientBackground.angle ) ) ? gradientBackground.angle : '';

		if( '' !== type){
			if( 'linear' === type ) {
				bgCSS = `
				background: rgb(${color.r},${color.g},${color.b});
				background: linear-gradient(${angle}deg, rgba(${color.r},${color.g},${color.b},${color.a}) ${location}%, rgba(${second_color.r},${second_color.g},${second_color.b},${second_color.a}) ${second_location}%);`;
			}else{
				bgCSS = `
				background: rgb(${color.r},${color.g},${color.b});
				background: radial-gradient(circle, rgba(${color.r},${color.g},${color.b},${color.a}) ${location}%, rgba(${second_color.r},${second_color.g},${second_color.b},${second_color.a}) ${second_location}%);`;
			}
		}

	}
	return bgCSS;
};

const getBorderBoxCSS = (borderBox) => {
	let borderCSS = '';
	if( 'undefined' !== typeof( borderBox ) ){
		let color = ( 'undefined' !== typeof ( boxShadow.color ) ) ? boxShadow.color : {};
		let radius = ( 'undefined' !== typeof ( boxShadow.radius ) ) ? boxShadow.radius : {};
		let shadow = ( 'undefined' !== typeof ( boxShadow.shadow ) ) ? boxShadow.shadow : {};
		let style = ( 'undefined' !== typeof ( boxShadow.style ) ) ? boxShadow.style : '';
		let width = ( 'undefined' !== typeof ( boxShadow.width ) ) ? boxShadow.width : {};

		if( '' !== style ) {
			borderCSS += `border-style: ${style};`;
		}

		if( 'undefined' !== typeof( width.top ) ) {
			if( 'undefined' !== typeof( width.link ) && width.link ) {//all value same.
				borderCSS += `border-width: ${width.top};`;
			}else{
				borderCSS += `border-top-width: ${width.top};`;
				borderCSS += `border-right-width: ${width.right};`;
				borderCSS += `border-bottom-width: ${width.bottom};`;
				borderCSS += `border-left-width: ${width.left};`;
			}
		}

		if( 'undefined' !== typeof( radius.top ) ) {
			if( 'undefined' !== typeof( radius.link ) && radius.link ) {//all value same.
				borderCSS += `border-radius: ${radius.top};`;
			}else{
				borderCSS += `border-top-left-radius: ${radius.top};`;
				borderCSS += `border-top-right-radius: ${radius.right};`;
				borderCSS += `border-bottom-right-radius: ${radius.bottom};`;
				borderCSS += `border-bottom-left-radius: ${radius.left};`;
			}
		}

		if( shadow ) {
			borderCSS += getBoxShadowCSS( shadow );
		}
	}
	return borderCSS;
};

const getBoxShadowCSS = (boxShadow) => {
	let boxShadowCSS = '';
	if( 'undefined' !== typeof( boxShadow ) ){
		let color = ( 'undefined' !== typeof ( boxShadow.color ) ) ? boxShadow.color : '';
		let x = ( 'undefined' !== typeof ( boxShadow.x ) ) ? boxShadow.x : '';
		let y = ( 'undefined' !== typeof ( boxShadow.y ) ) ? boxShadow.y : '';
		let blur = ( 'undefined' !== typeof ( boxShadow.blur ) ) ? boxShadow.blur : '';
		let spread = ( 'undefined' !== typeof ( boxShadow.spread ) ) ? boxShadow.spread : '';
		let inset = ( 'undefined' !== typeof ( boxShadow.inset ) && boxShadow.inset ) ? true : false;

		if ( inset ) {
			boxShadowCSS = `box-shadow: inset ${x} ${y} ${blur} ${spread} rgba(${color.r}, ${color.g}, ${color.b}, ${color.a});`;
		} else {
			boxShadowCSS = `box-shadow: ${x} ${y} ${blur} ${spread} rgba(${color.r}, ${color.g}, ${color.b}, ${color.a});`;
		}
		
	}
	return boxShadowCSS;
};
const getBlockCSS = ( blocks ) => {
	for( let i=0; i<blocks.length; i++ ) {
		let currentBlock = blocks[i];
		let blockName = currentBlock.name;
		let blockId = currentBlock.clientId;
		let blockAttr = currentBlock.attributes;
		
		if( 'undefined' !== typeof( pmBlocksStyle[ blockName ] ) ) {
			let blockStyle = pmBlocksStyle[ blockName ];
			
			let entries = Object.entries(blockStyle);
			for( let j=0; j<entries.length; j++ ) {
				let selector = entries[j][0];
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
								console.log('styling: ' + getPropVal );
								//bla
								break;
							case "typography":
								let typoCSS = '';
								if( 'undefined' !== typeof( getPropVal ) ){ 
									if( 'undefined' !== typeof ( getPropVal.text_decoration ) && '' !== getPropVal.text_decoration ){
										typoCSS += `text-decoration: ${getPropVal.text_decoration}`;
									}
									if( 'undefined' !== typeof ( getPropVal.text_transform ) && '' !== getPropVal.text_transform ){
										typoCSS += `text-transform: ${getPropVal.text_transform}`;
									}

									if( 'undefined' !== typeof ( getPropVal.font ) ){
										let fontCSS = getFontCSS( getPropVal.font );
										if( '' !== fontCSS ) {
											typoCSS += fontCSS;
										}
									}

									if( 'undefined' !== typeof ( getPropVal.font_size ) ){
										let getFontSize = getCSSRangeDeviceControl( getPropVal.font_size, 'font-size', 'px' );
									}

									if( 'undefined' !== typeof ( getPropVal.letter_spacing ) ){
										let getLetterSpacing = getCSSRangeDeviceControl( getPropVal.letter_spacing, 'letter-spacing', 'px' );
									}
									if( 'undefined' !== typeof ( getPropVal.line_height ) ){
										let getLineHeight = getCSSRangeDeviceControl( getPropVal.line_height, 'line-height', 'px' );
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
								
								break;
							default:
								if( 'undefined' !== typeof( getPropVal ) ){
									cssRule += `${propKey}:${getPropVal};`;
								}
								break;
						} //End switch.
					}
				}

				console.log('css ruler: ', cssRule );
			}
		}
		
	}
};

const { subscribe } = wp.data;
const MyChange = subscribe( ( a ) => {
    // You could use this opportunity to test whether the derived result of a
	// selector has subsequently changed as the result of a state update.
	const editor = wp.data.select('core/editor');
	if ( editor.hasChangedContent() && ! editor.isTyping() ) {
		
		const blocks = editor.getBlocks();
		
		let getBlocksCSS = getBlockCSS(blocks);

		console.log('editor blocks: ',blocks);
		
	}
	
} );



import "./blocks/call-to-action/block.js";
import "./blocks/border-box/block.js";
import "./blocks/rangecontrol-devices/block.js";
import "./blocks/background-box/block.js";
import "./blocks/background-gradient-box/block.js";
import "./blocks/posts/block.js";
import "./blocks/repeater/repeater.js";
import "./blocks/repeater/item.js";
import "./blocks/fonts/block.js";
import "./blocks/typography/block.js";
import "./blocks/background-group/block.js";
import "./blocks/accordion/block.js";
import "./blocks/styling/block.js";
import "./blocks/icon-picker/block.js";
import "./blocks/custom-heading/block.js";
