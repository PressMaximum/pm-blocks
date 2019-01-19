import StylingControl from '../../../components/styling/index';

const { __ } = wp.i18n; 
const { registerBlockType } = wp.blocks;
const {
	InspectorControls,
} = wp.editor;

const { PanelBody, RangeControl } = wp.components;

registerBlockType( 'pm-blocks/test-live-css-styling', {
	title: __( 'PM CSS: Styling' ), 
	icon: 'shield',
	category: 'common',
	keywords: [
		__( 'Styling' ),
		__( 'PM Styling' ),
	],
	attributes: {
		styling: {
			type: 'object',
		},
		divHeight: {
			type: 'number',
		},
		uniqueID: {
			type: 'string',
		}
	},
	
	edit: function( props ) {
		const {
			setAttributes
		} = props;
		const { styling, divHeight } = props.attributes;
		
		return (
			<div className={ props.className }>
				<InspectorControls>
					<PanelBody title={ __( 'Styling Settings' ) }>
						<StylingControl value={styling} onStylingChange={(new_value) => {setAttributes({styling:new_value}); }}/>
						<RangeControl
							label="Height"
							value={ divHeight }
							onChange={ ( new_value ) => setAttributes( { divHeight: new_value } ) }
							min={ 1 }
						/>
					</PanelBody>
				</InspectorControls>
				<div className="styling-test">
					<p class="content">Live CSS - Styling</p>
					<a class="link-tag" href="#">Click here</a>
				</div>
			</div>
		);
	},

	save: function( props ) {
		return (
			<div className={ props.className }>
				<div className="styling-test">
					<p class="content">Live CSS - Styling</p>
					<a class="link-tag" href="#">Click here</a>
				</div>
			</div>
		);
	},
} );
