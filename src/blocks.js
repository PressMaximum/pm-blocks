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

import PMLiveCSS from "./helper/live-css";


const { subscribe } = wp.data;
const MyChange = subscribe( (sub) => {

	// You could use this opportunity to test whether the derived result of a
	// selector has subsequently changed as the result of a state update.
	const editor = wp.data.select("core/editor");
	
	if (editor.hasChangedContent() && !editor.isTyping()) {
		const blocks = editor.getBlocks();
		const selectedBlock = editor.getSelectedBlock();
		
		let pmLiveCSS = new PMLiveCSS();
		let cssRunableInput = document.getElementById('pm_blocks_style_css');
		let maybeGFontUrlInput = document.getElementById('pm_blocks_maybe_gfont_url');
		
		// Add style tag.
		let css;
		let styles =  pmLiveCSS.getBlockOutputCSS( blocks, selectedBlock );

		if( '' !== styles ) {
			cssRunableInput.value = styles;
		}
		let headTag = document.getElementsByTagName("head");
		// Add google font link.
		let maybeGFontUrl = pmLiveCSS.getGoogleFontURL();
		if( '' !== maybeGFontUrl )  {
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
});

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
