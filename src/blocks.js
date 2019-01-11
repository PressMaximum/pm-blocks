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

import PMLiveCSS from './helper/live-css';

const { subscribe } = wp.data;
const MyChange = subscribe( ( a ) => {
    // You could use this opportunity to test whether the derived result of a
	// selector has subsequently changed as the result of a state update.
	const editor = wp.data.select('core/editor');
	const currentPost = editor.getCurrentPost();
	
	console.log('editor admin: ',editor);
	console.log('Method getPostEdits: ', editor.getPostEdits());
	console.log('Method getReferenceByDistinctEdits: ', editor.getReferenceByDistinctEdits());

	if ( editor.hasChangedContent() && ! editor.isTyping() ) {
		const blocks = editor.getBlocks();
		let runableCSS = PMLiveCSS(blocks);

		const currentMeta = wp.data.select( 'core/editor' ).getEditedPostAttribute( 'meta' );
		console.log('currentMeta: ', currentMeta);
		
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
