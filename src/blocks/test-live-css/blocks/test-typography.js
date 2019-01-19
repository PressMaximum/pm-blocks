import TypographyControl from '../../../components/typography/index';

const { __ } = wp.i18n; 
const { registerBlockType } = wp.blocks;
const {
	InspectorControls,
} = wp.editor;

const { PanelBody, RangeControl } = wp.components;

registerBlockType( 'pm-blocks/test-live-css-typo', {
	title: __( 'PM CSS: Typography' ), 
	icon: 'shield',
	category: 'common',
	keywords: [
		__( 'Typo' ),
		__( 'PM Typo' ),
	],
	attributes: {
		typography: {
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
		const { typography, divHeight } = props.attributes;
		
		return (
			<div className={ props.className }>
				<InspectorControls>
					<PanelBody title={ __( 'Typography Settings' ) }>
						<TypographyControl value={typography} onTypographyChange={(new_value) => {setAttributes({typography:new_value}); }}/>
						<RangeControl
							label="Height"
							value={ divHeight }
							onChange={ ( new_value ) => setAttributes( { divHeight: new_value } ) }
							min={ 1 }
						/>
					</PanelBody>
				</InspectorControls>
				<div className="typo-test">
					<p class="content">Live CSS - Typography</p>
				</div>
			</div>
		);
	},

	save: function( props ) {
		return (
			<div className={ props.className }>
				<div className="typo-test">
					<p class="content">Live CSS - Typography</p>
				</div>
			</div>
		);
	},
} );
