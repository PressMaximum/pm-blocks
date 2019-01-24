import './editor.scss';
const { __ } = wp.i18n;
const { Component } = wp.element;
import PMHelper from '../../helper/helper.js';
const { Popover, ColorPicker, ColorPalette } = wp.components;
const { withInstanceId } = wp.compose;

const {
	PanelColorSettings
} = wp.editor;


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
		this.onColorPaletteChange = this.onColorPaletteChange.bind(this);
	}

	onChangeComplete( value  ) {
		let new_color = {
			rgba: value.rgb,
			hex: value.hex
		};

		this.setState(new_color);

		if( 'function' === typeof( this.props.onColorChangeComplete ) ) {
			this.props.onColorChangeComplete( new_color );
		}
	}

	hexToRgb(hex) {
		var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
		return result ? {
			r: parseInt(result[1], 16),
			g: parseInt(result[2], 16),
			b: parseInt(result[3], 16),
			a: 1
		} : {
			r: 255,
			g: 255,
			b: 255,
			a: 1
		};
	}

	onColorPaletteChange( value ) {
		let new_color = {
			rgba: this.hexToRgb( value ),
			hex: value
		};

		this.setState(new_color);

		if( 'function' === typeof( this.props.onColorChangeComplete ) ) {
			this.props.onColorChangeComplete( new_color );
		}
	}

	openColorPicker( e ) {
		let target = e.target;
		if ( target.classList.contains( 'click-to-open' ) ) {
			target.classList.remove('click-to-open');
			target.classList.add('click-to-close');
			this.setState( {isVisible: true });
		} else {
			target.classList.remove('click-to-close');
			target.classList.add('click-to-open');
			this.setState( {isVisible: false });
		}
	}

	clickOutsidePopover( e ) {
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
		let editorColor = wp.data.select("core/editor").getEditorSettings();

		console.log('editorColor: ', editorColor);

		const colors = editorColor.colors;

		return (
			<div className={wraperClassName} id={id} {...props}>
				<div className="popover-color-picker">
					{label && (
						<span className="control-label">{label}</span>
					)}
					<div className="color-picker-wrap">
						<div className="color-picker-preview click-to-open" onClick={ (e) => this.openColorPicker( e )} style={colorpicker_bg}></div>
						{this.state.isVisible && (
							<Popover onClickOutside={ (e) => this.clickOutsidePopover( e )}>
								<ColorPicker
									color={this.state.hex}
									onChangeComplete={ this.onChangeComplete }
									disableHSL
									disableAlpha={disableAlpha}
								/>

								<ColorPalette
									className="color-picker-palette editor-color-palette-control__color-palette"
									value={ "#0073a8" }
									onChange={ this.onChangeComplete }
									colors={colors}
									disableCustomColors={true}
								/>
							</Popover>
						)}
					</div>
				</div>
			</div>
		);
	}
}

export default withInstanceId(ColorPickerPaletteControl);
