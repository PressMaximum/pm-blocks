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
import "./blocks/test-live-css/block.js";


const {
	isEmpty, isUndefined, assign
} = lodash;
const { hooks } = wp;
const {
    createHigherOrderComponent,
} = wp.compose;

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

		console.log('output styles: ',styles);
	}
});

// Hook to exist pm-block and create a wrapper with uniqueID.
const pmBlockEditCB = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		if ( !isUndefined(props.name) && props.name.includes('pm-blocks/') ) {
			const {
				attributes,
				setAttributes,
				clientId
			} = props;
	
			const {
				uniqueID
			} = attributes;
	
			if( isUndefined( uniqueID ) || '' == uniqueID ) {
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

wp.hooks.addFilter(
	'blocks.getSaveElement',
	'pm-blocks/modify-get-save-content-extra-props',
	pmBlockGetSaveElementCB
);


function pmBlockGetSaveElementCB( element, blockType, attributes  ) {
	// Check if that is not a table block.
	if ( !blockType.name.includes( 'pm-blocks/' ) || isUndefined(attributes.uniqueID) || '' === attributes.uniqueID || null === attributes.uniqueID ) {
		return element;
	}
	return (
		<div id={`block-${attributes.uniqueID}`}>
			{element}
		</div>
	);
}

/**
wp.hooks.addFilter(
	'blocks.registerBlockType',
	'pm-block/settings/attributes',
	function( settings, name ) {
		console.log('block name: ',name);
		if ( name.includes('pm-blocks/') ) {
			settings = assign( {}, settings, {
				attributes: assign( {}, settings.attributes, {
					uniqueID: {
						type: 'string',
					},
				} ),
			} ); 
	
		}
		return settings;
	} 
);
 */