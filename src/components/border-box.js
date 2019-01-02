const { __ } = wp.i18n;
const { Component } = wp.element;
import { defaults } from "lodash";
import CSSRulerControl from './cssruler';
import ColorPickerControl from './color-picker';
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
			color: '',
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
		const colors = [ 
			{ name: 'red', color: '#f00' }, 
			{ name: 'white', color: '#fff' }, 
			{ name: 'blue', color: '#00f' }, 
		];

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
				<ColorPickerControl />
				<BaseControl className="box-shadow-wrap" {...props}>
					<span>
						<input
							id={`${prefixId}-x`}
							type="number"
							placeholder={__("X")}
							className="boxshadow-x"
							onChange={e =>
								this.onChangeHandler({
									key: "top",
									value: e.target.value
								})
							}
							value={this.state.radius.x}
						/>
					</span>
					<span>
						<input
							id={`${prefixId}-y`}
							type="number"
							placeholder={__("Y")}
							className="boxshadow-y"
							onChange={e =>
								this.onChangeHandler({
									key: "right",
									value: e.target.value
								})
							}
							value={this.state.radius.y}
						/>
					</span>
					<span>
						<input
							id={`${prefixId}-blur`}
							type="number"
							placeholder={__("Blur")}
							className="boxshadow-blur"
							onChange={e =>
								this.onChangeHandler({
									key: "bottom",
									value: e.target.value
								})
							}
							value={this.state.radius.blur}
						/>
					</span>
					<span>
						<input
							id={`${prefixId}-spread`}
							type="number"
							placeholder={__("Spread")}
							className="boxshadow-spread"
							onChange={e =>
								this.onChangeHandler({
									key: "left",
									value: e.target.value
								})
							}
							value={this.state.radius.spread}
						/>
					</span>
					<span className="boxshadow_inset">
						<CheckboxControl
							id={`${prefixId}-inset`}
							className="boxshadow-inset"
							checked={this.state.radius.inset}
							onChange={ ( isChecked ) => { setState( { isChecked } ) } }
						/>
					</span>
				</BaseControl>
			</div>
		);
	}
}

export default withInstanceId(BorderBoxControl);
