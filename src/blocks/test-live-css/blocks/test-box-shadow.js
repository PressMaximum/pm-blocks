import BoxShadowControl from '../../../components/box-shadow/index';

const { __ } = wp.i18n; 
const { registerBlockType } = wp.blocks;
const {
	InspectorControls,
} = wp.editor;

const { PanelBody, RangeControl } = wp.components;

registerBlockType( 'pm-blocks/test-live-css-boxshadow', {
	title: __( 'PM CSS: Box Shadow' ), 
	icon: 'shield',
	category: 'common',
	keywords: [
		__( 'Box Shadow' ),
		__( 'PM Box Shadow' ),
	],
	attributes: {
		boxShadow: {
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
		const { boxShadow, divHeight } = props.attributes;
		
		return (
			<div className={ props.className }>
				<InspectorControls>
					<PanelBody title={ __( 'Styling Settings' ) }>
						<BoxShadowControl value={boxShadow} onBoxShadowChange={ (new_value) => setAttributes({boxShadow: new_value}) }/>
						<RangeControl
							label="Height"
							value={ divHeight }
							onChange={ ( new_value ) => setAttributes( { divHeight: new_value } ) }
							min={ 1 }
						/>
					</PanelBody>
				</InspectorControls>
				<div className="boxshadow-test" style={{border: '1px solid #eee', padding: '10px 25px'}}>
					<p class="content">Live CSS - Box Shadow</p>
				</div>
			</div>
		);
	},

	save: function( props ) {
		return (
			<div className={ props.className }>
				<div className="boxshadow-test" style={{border: '1px solid #eee', padding: '10px 25px'}}>
					<p class="content">Live CSS - Box Shadow</p>
				</div>
			</div>
		);
	},
} );
