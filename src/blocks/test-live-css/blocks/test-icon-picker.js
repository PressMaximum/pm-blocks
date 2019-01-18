import IconPickerControl from '../../../components/icon-picker/index';

const { __ } = wp.i18n; 
const { registerBlockType } = wp.blocks;
const {
	InspectorControls,
} = wp.editor;

const { PanelBody } = wp.components;

registerBlockType( 'pm-blocks/test-live-css-iconpicker', {
	title: __( 'PM CSS: Icon Picker' ), 
	icon: 'shield',
	category: 'common',
	keywords: [
		__( 'Icon Picker' ),
		__( 'PM Icon Picker' ),
	],
	attributes: {
		icon: {
			type: 'string',
		},
		icon2: {
			type: 'string',
		},
		icon3: {
			type: 'string',
		},
		icon4: {
			type: 'string',
		},
		uniqueID: {
			type: 'string',
		}
	},
	
	edit: function( props ) {
		const {
			setAttributes
		} = props;
		const { icon, icon2, icon3, icon4 } = props.attributes;
		
		return (
			<div className={ props.className }>
				<InspectorControls>
					<PanelBody title={ __( 'Icon Picker' ) }>
						<IconPickerControl value={icon} onIconChange={(new_value) => {setAttributes({icon:new_value});  }}/>
						<IconPickerControl value={icon2} onIconChange={(new_value) => {setAttributes({icon2:new_value});  }}/>
						<IconPickerControl value={icon3} onIconChange={(new_value) => {setAttributes({icon3:new_value});  }}/>
						<IconPickerControl value={icon4} onIconChange={(new_value) => {setAttributes({icon4:new_value});  }}/>
					</PanelBody>
				</InspectorControls>

				<div className="manual-test">
					<p class="content">Live CSS - Icon Picker</p>
					{ icon && <p><i className={icon}></i></p> }
					{ icon2 && <p><i className={icon2}></i></p> }
					{ icon3 && <p><i className={icon3}></i></p> }
					{ icon4 && <p><i className={icon4}></i></p> }
				</div>
			</div>
		);
	},

	save: function( props ) {
		const { icon, icon2, icon3, icon4 } = props.attributes;
		return (
			<div className={ props.className }>
				<div className="manual-test">
					<p class="content">Live CSS - Icon Picker</p>
					{ icon && <p><i className={icon}></i></p> }
					{ icon2 && <p><i className={icon2}></i></p> }
					{ icon3 && <p><i className={icon3}></i></p> }
					{ icon4 && <p><i className={icon4}></i></p> }
				</div>
			</div>
		);
	},
} );
