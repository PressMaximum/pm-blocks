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

//import "./blocks/call-to-action/block.js";
//import "./blocks/border-box/block.js";
//import "./blocks/rangecontrol-devices/block.js";
//import "./blocks/background-box/block.js";
//import "./blocks/background-gradient-box/block.js";
//import "./blocks/posts/block.js";
//import "./blocks/repeater/repeater.js";
//import "./blocks/repeater/item.js";
//import "./blocks/fonts/block.js";
//import "./blocks/typography/block.js";
//import "./blocks/background-group/block.js";
//import "./blocks/accordion/block.js";
//import "./blocks/styling/block.js";
//import "./blocks/icon-picker/block.js";
//import "./blocks/custom-heading/block.js";
import "./blocks/test-live-css/block.js";
//import "./blocks/test/block.js";


import "./extends/blocks.js";
import PMHelper from './helper/helper.js';

const { hooks } = wp;
const {
    createHigherOrderComponent,
} = wp.compose;

const { subscribe } = wp.data;

const pmHelper = new PMHelper();

const MyChange = subscribe( (sub) => {
	// You could use this opportunity to test whether the derived result of a
	// selector has subsequently changed as the result of a state update.
	const editor = wp.data.select("core/editor");
	
	if (editor.hasChangedContent() && !editor.isTyping()) {
		const blocks = editor.getBlocks();
		const selectedBlock = editor.getSelectedBlock();
		console.log('all blocks changed: ', blocks);
		let pmLiveCSS = new PMLiveCSS();
		// Add style tag.
		let styles =  pmLiveCSS.getBlockOutputCSS( blocks, selectedBlock );
		let maybeGFontUrl = pmLiveCSS.getGoogleFontURL();
		let renderStyleTag = pmLiveCSS.renderStyleTag(styles, maybeGFontUrl);
	}
});

// Filter to exists blocks structure.
const pmCoreBlockWithUniqueID = [
	'core/heading',
	'core/latest-posts'
];
const pmBlockEditCB = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		if ( !pmHelper.isUndefined(props.name) && (props.name.includes('pm-blocks/') || pmCoreBlockWithUniqueID.includes(props.name)) ) {
			const {
				attributes,
				setAttributes,
				clientId
			} = props;
	
			const {
				uniqueID
			} = attributes;
	
			if( pmHelper.isUndefined( uniqueID ) || '' == uniqueID ) {
				setAttributes( {uniqueID: clientId });
			}
			
			let listBlocks = wp.data.select("core/editor").getBlocks();
			
			if( Array.isArray(listBlocks) && listBlocks.length > 0 ) {
				let count = 0;
				for( let i=0; i<listBlocks.length; i++ ) {
					let blockAttr = listBlocks[i].attributes;
					let blockUniqueID = blockAttr.uniqueID;
					if( uniqueID === blockUniqueID ) {
						if( count > 0 ) {
							setAttributes( {uniqueID: clientId });
						} 
						count++;
					}
				}
			}

			return (
				<div id={`block-${uniqueID}`}>
					<BlockEdit { ...props } />
				</div>
			);
		}
		return (
			<BlockEdit {...props} />
		);
	};
} );

wp.hooks.addFilter( 'editor.BlockEdit', 'pm-blocks/block-edit', pmBlockEditCB );

const registerCoreUniqueID = ( settings, name ) => {
	//console.log('block name: ', name);
	if ( pmCoreBlockWithUniqueID.includes(name) ) {
		settings.attributes = Object.assign( settings.attributes, {
			uniqueID: {
				type: 'string'
			},
		} );
	}

	return settings;
};
wp.hooks.addFilter( 'blocks.registerBlockType', 'pm-blocks/core-blocks/uniqueID', registerCoreUniqueID );

wp.hooks.addFilter( 'blocks.getSaveElement', 'pm-blocks/modify-get-save-content-extra-props', pmBlockGetSaveElementCB );
function pmBlockGetSaveElementCB( element, blockType, attributes  ) {
	if ( (blockType.name.includes( 'pm-blocks/' ) || pmCoreBlockWithUniqueID.includes(blockType.name) ) && !pmHelper.isUndefined(attributes.uniqueID) && '' !== attributes.uniqueID && null !== attributes.uniqueID ) {
		if( pmCoreBlockWithUniqueID.includes(blockType.name) ) {
			if( null !== element && !pmHelper.isUndefined(element) && !pmHelper.isUndefined(element.props) && !pmHelper.isUndefined( element.props.id ) ) {
				element.props.id = undefined; // Should remove exist id to prevent expected error.
			}
		}
		return (
			<div id={`block-${attributes.uniqueID}`}>{element}</div>
		);
	}
	return element;
}
