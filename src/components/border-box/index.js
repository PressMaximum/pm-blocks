const { __ } = wp.i18n;
const { Component } = wp.element;
import { defaults } from "lodash";
import CSSRulerControl from '../cssruler/index';
import ColorPickerControl from '../color-picker/index';
import BoxShadowControl from '../box-shadow/index';
const { SelectControl } = wp.components;
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
				hex: '',
				rgba: ''
			},
			radius: {
				top: '',
				right: '',
				bottom: '',
				left: '',
				link: true
			},
			shadow: {
				color: {
					rgba: '',
					hex: ''
				},
				x: '',
				y: '',
				blur: '',
				spread: '',
				inset: ''
			}
		};
		//Set state
		this.state = defaults(this.props.value, default_value);
		this.onChangeHandler = this.onChangeHandler.bind(this);
	}

	onChangeHandler( data ) {
		var changed_value = {};
	
		switch (data.key) {
			case "style":
				changed_value = { style: data.value };
				break;
			case "width":
				changed_value = { width: data.value };
				break;
			case "color":
				changed_value = { color: data.value };
				break;
			case "radius":
				changed_value = { radius: data.value };
				break;
			case "shadow":
				changed_value = { shadow: data.value };
				break;
		}
		this.setState(changed_value);

		if ("function" === typeof this.props.onBorderBoxChange) {
			let current_state = this.state;
			let current_data = Object.assign({}, current_state, changed_value);
			this.props.onBorderBoxChange(current_data);
		}
	}

	render() {
		const {
			className,
			label,
			value,
			instanceId,
			onBorderBoxChange,
			...props
		} = this.props;
		const id = `border-control-${instanceId}`;
		
		let wraperClassName = "border-control";
		if ("undefined" != typeof className) {
			wraperClassName += " " + className;
		}
		if ("" != label) {
			wraperClassName += " has-label";
		}

		return (
			<div className={wraperClassName} id={id} {...props}>
				{label && (
					<span className="control-label">{label}</span>
				)}
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
					onChange={ new_value => this.onChangeHandler( { key: "style", value : new_value} ) }
				/>
				
				<CSSRulerControl label={__("Border width") } value={this.state.width} onCSSRulerChange={ new_value => this.onChangeHandler( { key: "width", value : new_value} ) }/>
				<ColorPickerControl label={__("Color")} disableAlpha="true" value={this.state.color} onColorChangeComplete={ new_value => this.onChangeHandler( { key: "color", value : new_value} ) } />
				<CSSRulerControl label={__("Border radius") } value={this.state.radius} onCSSRulerChange={ new_value => this.onChangeHandler( { key: "radius", value : new_value} ) }/>
				<BoxShadowControl value={this.state.shadow} onBoxShadowChange={ new_value => this.onChangeHandler( { key: "shadow", value : new_value} ) }/>
			</div>
		);
	}
}

export default withInstanceId(BorderBoxControl);
