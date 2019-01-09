import './style.scss';
import './editor.scss';

import BorderBoxControl from '../../components/border-box/index';
import CustomHeadingToolbar from './heading-toolbar';
import TypographyControl from '../../components/typography/index';
import StylingControl from '../../components/styling/index';
import ColorPickerControl from '../../components/color-picker/index';
import { pmUniqueID } from '../../helper/unique-id.js';

const { __, sprintf } = wp.i18n;
const { data } = wp;
const { registerBlockType } = wp.blocks;
const { Fragment, Component } = wp.element;
const { PanelBody, Toolbar } = wp.components;
const { createBlock } = wp.blocks;
const { RichText, BlockControls, InspectorControls, AlignmentToolbar } = wp.editor;
const schema = {
	content: {
		source: 'html',
		selector: 'h1,h2,h3,h4,h5,h6',
	},
	level: {
		type: 'number',
		default: 2,
	},
	align: {
		type: 'string',
	},
	placeholder: {
		type: 'string',
	},
	styling: {
		type: 'object',
	},
	typo: {
		type: 'object',
	},
	color: {
		type: 'object'
	},

	uniqueID: {
		type: 'string',
	},
};

registerBlockType( 'pm-blocks/block-my-heading', {
	title: __( 'PM Custom Heading' ), 
	icon: 'shield',
	category: 'common',
	keywords: [
		__( 'Heading' ), 
		__( 'Custom Heading' ), 
		__( 'PM Custom Heading' ),
	],
	attributes: schema,

	edit: function( props ) {
		const {
			setAttributes,
			mergeBlocks,
			insertBlocksAfter,
			onReplace,
			className,
			instanceId,
			clientId
		} = props;
		const { styling,typo, color, align, content, level, placeholder,uniqueID } = props.attributes;
		const tagName = 'h' + level;

		if( 'undefined' == typeof( uniqueID ) || '' == uniqueID ) {
			setAttributes( {uniqueID: clientId });
		}
		
		return (
			<div className={`block-custom-heading ${ props.className }`} id={`block-${uniqueID}`}>
				<Fragment>
					<BlockControls>
						<CustomHeadingToolbar minLevel={ 2 } maxLevel={ 5 } selectedLevel={ level } onChange={ ( newLevel ) => setAttributes( { level: newLevel } ) } />
					</BlockControls>
					<InspectorControls>
						<PanelBody title={ __( 'Heading Settings' ) }>
							<p>{ __( 'Level' ) }</p>
							<CustomHeadingToolbar minLevel={ 1 } maxLevel={ 7 } selectedLevel={ level } onChange={ ( newLevel ) => setAttributes( { level: newLevel } ) } />
							<p>{ __( 'Text Alignment' ) }</p>
							<AlignmentToolbar
								value={ align }
								onChange={ ( nextAlign ) => {
									setAttributes( { align: nextAlign } );
								} }
							/>
						</PanelBody>
						<ColorPickerControl
							label={__("Heading color")}
							disableAlpha="true"
							value={color}
							onColorChangeComplete={new_value => {
								setAttributes( { color: new_value } );
							} }
						/>
						<StylingControl value={styling} onStylingChange={(new_value) => {setAttributes({styling:new_value}); console.log('Styling changed: ', new_value) }}/>
						<TypographyControl value={typo} onTypographyChange={(new_value) => {setAttributes({typo:new_value}); console.log('Typography changed: ', new_value) }}/>
					</InspectorControls>
					<RichText
						wrapperClassName="wp-block-heading"
						tagName={ tagName }
						value={ content }
						onChange={ ( value ) => setAttributes( { content: value } ) }
						onMerge={ mergeBlocks }
						onSplit={
							insertBlocksAfter ?
								( before, after, ...blocks ) => {
									setAttributes( { content: before } );
									insertBlocksAfter( [
										...blocks,
										createBlock( 'core/paragraph', { content: after } ),
									] );
								} :
								undefined
						}
						onRemove={ () => onReplace( [] ) }
						style={ { textAlign: align } }
						className={ className }
						placeholder={ placeholder || __( 'Write heading…' ) }
					/>
				</Fragment>
			</div>
		);
	},

	save: function( props ) {
		const { heading, align, content, level, placeholder, uniqueID } = props.attributes;
		const tagName = 'h' + level;
		return (
			<div className={`block-custom-heading ${ props.className }`} id={`block-${uniqueID}`}>
				<RichText.Content
					tagName={ tagName }
					style={ { textAlign: align } }
					value={ content }
				/>
			</div>
		);
	},
} );
