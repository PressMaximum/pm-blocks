const { __ } = wp.i18n;
const { Component } = wp.element;
import { defaults } from "lodash";
const { Popover, ColorPicker } = wp.components;
const { withInstanceId } = wp.compose;

class ColorPickerControl extends Component {
	constructor() {
		super(...arguments);

		var default_value = {
			color: {
				rgba: {
					r: '255',
					g: '255',
					b: '255',
					a: '1',
				},
				hex: '#ffffff',
			},
			isVisible: false,
		};
		//Set state
		this.state = defaults(this.props.value, default_value);

		this.openColorPicker = this.openColorPicker.bind(this);
		this.clickOutsidePopover = this.clickOutsidePopover.bind(this);
		this.onChangeComplete = this.onChangeComplete.bind(this);
	}

	onChangeComplete( value ) {
		let new_color = {
			rgba: value.rgb,
			hex: value.hex
		};

		this.setState({
			color: new_color
		});

		if( 'function' === typeof( this.props.onColorChangeComplete ) ) {
			this.props.onColorChangeComplete( new_color );
		}
	}


	openColorPicker() {
		this.setState({
			isVisible: true
		});
	}

	clickOutsidePopover() {
		this.setState({
			isVisible: false
		});
	}

	render() {
		const {
			className,
			value,
			instanceId,
			onColorChangeComplete,
			disableAlpha,
			...props
		} = this.props;
		const id = `color-picker-${instanceId}`;
		let wraperClassName = "color-picker-control";
		if ("undefined" != typeof className) {
			wraperClassName += " " + className;
		}

		return (
			<div className={wraperClassName} id={id} {...props}>
				<div className="popover-color-picker">
					<div className="color-picker-wrap">
						<div className="color-picker-preview" onClick={this.openColorPicker} style={{backgroundColor: `rgba(${this.state.color.rgba.r}, ${this.state.color.rgba.g}, ${this.state.color.rgba.b}, ${this.state.color.rgba.a})`}}>
							{this.state.isVisible && (
								<Popover onClickOutside={this.clickOutsidePopover}>
									<ColorPicker
										label={__("Color")}
										color={this.state.color.rgba}
										onChangeComplete={ this.onChangeComplete }
										disableAlpha={disableAlpha}
									/>
								</Popover>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default withInstanceId(ColorPickerControl);
/**
 * Using
 * <ColorPickerControl value={color:{rgba:'', hex: ''}} onColorChangeComplete={(new_color) => console.log('new color: ', new_color)} />
 */