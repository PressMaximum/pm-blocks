import './editor.scss';
const { __ } = wp.i18n;
const { Component } = wp.element;
import PMHelper from '../../helper/helper.js';
const { SelectControl, RangeControl } = wp.components;
const { withInstanceId } = wp.compose;

import ColorPickerControl from "../color-picker/index";

class BackgroundGradientBoxControl extends Component {
	constructor() {
		super(...arguments);

		var default_value = {
			color: {
				rgba: {
					r: 255,
					g: 255,
					b: 255,
					a: 1,
				},
				hex: '#ffffff',
			},
			location: '',
			second_color: {
				rgba: {
					r: 255,
					g: 255,
					b: 255,
					a: 1,
				},
				hex: '#ffffff',
			},
			second_location: '',
			type: 'linear',
			angle: 0,
		};
		//Set state
		const pmHelper = new PMHelper();
		this.state = pmHelper.defaults(this.props.value, default_value);
		this.onChangeHandler = this.onChangeHandler.bind(this);
	}

	onChangeHandler(data) {
		var changed_value = {};
		switch ( data.key ) {
			case "color" :
				changed_value.color = data.value;
				break;
			case "location" :
				changed_value.location = data.value;
				break;
			case "second_color" :
				changed_value.second_color = data.value;
				break;
			case "second_location" :
				changed_value.second_location = data.value;
				break;
			case "type" :
				changed_value.type = data.value;
				break;
			case "angle" :
				changed_value.angle = data.value;
				break;
		}
		this.setState(changed_value);

		if ("function" === typeof this.props.onBgGradientChange) {
			let current_state = this.state;
			let current_data = Object.assign({}, current_state, changed_value);
			this.props.onBgGradientChange(current_data);
		}
	}

	render() {
		const {
			className,
			label,
			value,
			instanceId,
			onBgGradientChange,
			...props
		} = this.props;
		const id = `bg-gradient-control-${instanceId}`;
		
		let wraperClassName = "bg-gradient-control";
		if ("undefined" != typeof className) {
			wraperClassName += " " + className;
		}
		if ("" != label) {
			wraperClassName += " has-label";
		}
		return (
			<div className={wraperClassName} id={id} {...props}>
				{label && <span className="control-label">{label}</span>}
				
				<ColorPickerControl
					label={__("Color")}
					value={this.state.color}
					onColorChangeComplete={ (new_value) =>
						this.onChangeHandler({ key: "color", value: new_value })
					}
				/>
				<div className="bg-gradient-field location-field">
					<span className="field-label control-label">{__("Location" )}</span>
					<RangeControl
						value={this.state.location}
						onChange={ ( new_value ) => 
							this.onChangeHandler({ key: "location", value: new_value })
						}
						min={ 0 }
						max={ 100 }
					/>
				</div>
				<ColorPickerControl
					label={__("Second Color")}
					value={this.state.second_color}
					onColorChangeComplete={ (new_value) =>
						this.onChangeHandler({ key: "second_color", value: new_value })
					}
				/>
				<div className="bg-gradient-field second-location-field">
					<span className="field-label control-label">{__("Second Location" )}</span>
					<RangeControl
						value={this.state.second_location}
						onChange={ ( new_value ) => 
							this.onChangeHandler({ key: "second_location", value: new_value })
						}
						min={ 0 }
						max={ 100 }
					/>
				</div>
				<SelectControl
					label={__("Type")}
					value={this.state.type}
					options={[
						{ label: __("Select type"), value: "" },
						{ label: __("Linear"), value: "linear" },
						{ label: __("Radial"), value: "radial" },
					]}
					onChange={(new_value) =>
						this.onChangeHandler({ key: "type", value: new_value })
					}
				/>
				<div className="bg-gradient-field angle-field">
					<span className="field-label control-label">{__("Angle" )}</span>
					<RangeControl
						value={this.state.angle}
						onChange={ ( new_value ) => 
							this.onChangeHandler({ key: "angle", value: new_value })
						}
						min={ -360 }
						max={ 360 }
					/>
				</div>
			</div>
		);
	}
}

export default withInstanceId(BackgroundGradientBoxControl);
