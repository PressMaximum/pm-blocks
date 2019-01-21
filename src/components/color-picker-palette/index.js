import './editor.scss';
const { __ } = wp.i18n;
const { Component } = wp.element;
import PMHelper from '../../helper/helper.js';
const { Popover, ColorPicker } = wp.components;
const { withInstanceId } = wp.compose;

class ColorPickerPaletteControl extends Component {
	constructor() {
		super(...arguments);

		var default_value = {
			rgba: {
				r: '',//255
				g: '',//255
				b: '',//255
				a: '',//1
			},
			hex: '',//#ffffff
			
			isVisible: false,
		};
		
		//Set state
		const pmHelper = new PMHelper();
		this.state = pmHelper.defaults(this.props.value, default_value);

		this.openColorPicker = this.openColorPicker.bind(this);
		this.clickOutsidePopover = this.clickOutsidePopover.bind(this);
		this.onChangeComplete = this.onChangeComplete.bind(this);
	}

	onChangeComplete( value ) {
		let new_color = {
			rgba: value.rgb,
			hex: value.hex
		};

		this.setState(new_color);

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
			label,
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

		let colorpicker_bg = {backgroundColor: `rgba(${this.state.rgba.r}, ${this.state.rgba.g}, ${this.state.rgba.b}, ${this.state.rgba.a})`};
	

		return (
			<div className={wraperClassName} id={id} {...props}>
				<div className="popover-color-picker">
					{label && (
						<span className="control-label">{label}</span>
					)}
					<div className="color-picker-wrap">
						<div className="color-picker-preview" onClick={this.openColorPicker} style={colorpicker_bg}>
							{this.state.isVisible && (
								<Popover onClickOutside={this.clickOutsidePopover}>
									<ColorPicker
										color={this.state.hex}
										onChangeComplete={ this.onChangeComplete }
										disableHSL
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

export default withInstanceId(ColorPickerPaletteControl);
/**
 * Using
 * <ColorPickerPaletteControl value={rgba:'', hex: ''} onColorChangeComplete={(new_color) => console.log('new color: ', new_color)} />
 */