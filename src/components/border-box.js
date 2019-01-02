const { __ } = wp.i18n;
const { Component } = wp.element;
import { defaults } from "lodash";
import CSSRulerControl from './cssruler';
import ColorPickerControl from './color-picker';
import BoxShadowControl from './box-shadow';
const { SelectControl, ColorPicker, BaseControl, CheckboxControl, Popover } = wp.components;
const { withInstanceId } = wp.compose;

class BorderBoxControl extends Component {
	constructor() {
		super(...arguments);

		var default_value = {
			style: '',
			width: {
				top: '',
				right: '',
				bottom: '',
				left: '',
				link: true
			},
			color: {
				rgba: {

				},
				hex: ''
			},
			radius: {
				top: '',
				right: '',
				bottom: '',
				left: '',
				link: true
			},
			shadow: {
				color: '',
				x: '',
				y: '',
				blur: '',
				spread: '',
				inset: ''
			}
		};

		

		//Set state
		this.state = defaults(this.props.value, default_value);

	}



	render() {
		const {
			className,
			label,
			value,
			instanceId,
			onBorderChange,
			...props
		} = this.props;
		const id = `border-control-${instanceId}`;
		const input_value = this.state.input_value;

		let wraperClassName = "border-control";
		if ("undefined" != typeof className) {
			wraperClassName += " " + className;
		}
		if ("" != label) {
			wraperClassName += " has-label";
		}
		const prefixId = `border-box-${id}`;
		

		return (
			<div className={wraperClassName} id={id} {...props}>
				<SelectControl
					label={__("Border style")}
					value={ this.state.style }
					options={ [
						{ label: __( "None"), value: 'none' },
						{ label: __( "Dotted"), value: 'dotted' },
						{ label: __( "Dashed"), value: 'dashed' },
						{ label: __( "Solid"), value: 'solid' },
						{ label: __( "Double"), value: 'double' },
						{ label: __( "Groove"), value: 'groove' },
						{ label: __( "Ridge"), value: 'ridge' },
						{ label: __( "Inset"), value: 'inset' },
						{ label: __( "Outset"), value: 'outset' },
						{ label: __( "Hidden"), value: 'hidden' },
						{ label: __( "Initial"), value: 'initial' },
						{ label: __( "Inherit"), value: 'inherit' },
					] }
					onChange={ ( size ) => { setState( { size } ) } }
				/>
				
				<CSSRulerControl label={__("Border width") } value={this.state.width}/>
				<ColorPickerControl onColorChangeComplete={(new_color) => console.log('new color: ', new_color)} />
				<CSSRulerControl label={__("Border radius") } value={this.state.radius}/>
				
				<BoxShadowControl onBoxShadowChange={(new_value) => { console.log('boxshadow value: ', new_value)}}/>
			</div>
		);
	}
}

export default withInstanceId(BorderBoxControl);
