import TypographyControl from '../../components/typography/index';

const {
	createHigherOrderComponent
} = wp.compose;

const {
	PanelBody,
	RangeControl,
} = wp.components;

const { __ } = wp.i18n; 

const {
	InspectorControls
} = wp.editor;

const {
	Fragment,
} = wp.element;

const {
	isEmpty, isUndefined
} = lodash;
const registerCoreHeadingAttributes = ( settings, name ) => {
	if ( 'core/latest-posts' === name ) {
		settings.attributes = Object.assign( settings.attributes, {
			typography: {
				type: 'object',
			},
			divHeight : {
				type: 'number'
			}
		} );
		
	}

	return settings;
};
wp.hooks.addFilter( 'blocks.registerBlockType', 'pm-blocks/core-latest-posts/attributes', registerCoreHeadingAttributes );

const pmRegisterCoreHeadingFields = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		if ( 'core/latest-posts' !== props.name ) {
			return (
				<BlockEdit {...props} />
			);
		}

		const {
			attributes,
			setAttributes,
		} = props;

		const {
			typography,
			divHeight
		} = attributes;
		
		return (
			<Fragment>
				<InspectorControls>
					<PanelBody title={ __( 'PM Fonts Settings' ) }>
					<TypographyControl value={typography} onTypographyChange={(new_value) => {setAttributes({typography:new_value}); }}/>
						<RangeControl
							label="Height"
							value={ divHeight }
							onChange={ ( new_value ) => setAttributes( { divHeight: new_value } ) }
							min={ 1 }
							max={2000}
						/>
					</PanelBody>
				</InspectorControls>
				<BlockEdit { ...props } />
			</Fragment>
		);
	};
} );

wp.hooks.addFilter( 'editor.BlockEdit', 'pm-blocks/core-latest-posts/blockEdit', pmRegisterCoreHeadingFields );
