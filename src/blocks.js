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


// const { subscribe } = wp.data;
// const MyChange = subscribe( ( a ) => {
//     // You could use this opportunity to test whether the derived result of a
// 	// selector has subsequently changed as the result of a state update.
// 	const editor = wp.data.select('core/editor');
// 	if ( editor.hasChangedContent() && ! editor.isTyping() ) {
// 		// const blocks = editor.getBlocks();
// 		// console.log( 'a', a );
// 		console.log( 'changed_content',  );

// 		// check bock edit or removed.
// 	}
	
// } );



import "./blocks/call-to-action/block.js";
import "./blocks/border-box/block.js";
import "./blocks/rangecontrol-devices/block.js";
import "./blocks/background-box/block.js";
import "./blocks/background-gradient-box/block.js";
import "./blocks/posts/block.js";
import "./blocks/repeater/repeater.js";
import "./blocks/repeater/item.js";
import "./blocks/fonts/block.js";

