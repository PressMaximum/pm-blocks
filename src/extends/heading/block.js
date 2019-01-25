import FontsControl from '../../components/fonts/index';

const {
	createHigherOrderComponent
} = wp.compose;

const {
	CheckboxControl,
	PanelBody,
	TextControl,
	TextareaControl,
} = wp.components;

const { __ } = wp.i18n; 

const {
	InspectorControls
} = wp.editor;

const {
	Fragment,
	RawHTML,
	renderToString
} = wp.element;


const registerCoreHeadingAttributes = ( settings, name ) => {
	if ( 'core/heading' === name ) {
		settings.attributes = Object.assign( settings.attributes, {
			fonts: {
				type: 'object'
			},
		} );
		
	}

	return settings;
};
wp.hooks.addFilter( 'blocks.registerBlockType', 'pm-blocks/core-heading/attributes', registerCoreHeadingAttributes );

const pmRegisterCoreHeadingFields = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		if ( 'core/heading' !== props.name ) {
			return (
				<BlockEdit {...props} />
			);
		}

		const {
			attributes,
			setAttributes,
		} = props;

		const {
			fonts,
		} = attributes;
		
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'PM Fonts Settings' ) }>
						<FontsControl value={fonts} onFontsChange={(new_value) => {setAttributes({fonts:new_value});  }}/>
					</PanelBody>
				</InspectorControls>
				<BlockEdit { ...props } />
			</Fragment>
		);
	};
} );

wp.hooks.addFilter( 'editor.BlockEdit', 'pm-blocks/core-heading/blockEdit', pmRegisterCoreHeadingFields );
