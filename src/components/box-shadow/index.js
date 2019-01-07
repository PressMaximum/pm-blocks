import './editor.scss';
const { __ } = wp.i18n;
const { Component } = wp.element;
import { defaults } from "lodash";
const { BaseControl, CheckboxControl } = wp.components;
const { withInstanceId } = wp.compose;
import ColorPickerControl from "../color-picker/index";

class BoxShadowControl extends Component {
	constructor() {
		super(...arguments);

		var default_value = {
			color: {
				hex: '',
				rgba: ''
			},
			x: "",
			y: "",
			blur: "",
			spread: "",
			inset: false
		};
		//Set state
		this.state = defaults(this.props.value, default_value);

		this.onChangeHandler = this.onChangeHandler.bind(this);
	}

	onChangeHandler(data) {
		var changed_value = {};
	
		switch (data.key) {
			case "x":
				changed_value = { x: data.value };
				break;
			case "y":
				changed_value = { y: data.value };
				break;
			case "blur":
				changed_value = { blur: data.value };
				break;
			case "spread":
				changed_value = { spread: data.value };
				break;
			case "inset":
				changed_value = { inset: data.value };
				break;
			case "color":
				changed_value = { color: data.value };
				break;	
		}
		this.setState(changed_value);

		if ("function" === typeof this.props.onBoxShadowChange) {
			let current_state = this.state;
			let current_data = Object.assign({}, current_state, changed_value);
			this.props.onBoxShadowChange(current_data);
		}
	}

	render() {
		const {
			className,
			value,
			instanceId,
			onBoxShadowChange,
			...props
		} = this.props;
		const id = `boxshadow-${instanceId}`;
		let wraperClassName = "box-shadow-control";
		if ("undefined" != typeof className) {
			wraperClassName += " " + className;
		}

		return (
			<div id={id} className={wraperClassName} {...props}>
				<div className="group-label-color">
					<span className="control-label">{__("Box shadow")}</span>
					<ColorPickerControl
						value={this.state.color}
						disableAlpha="true"
						onColorChangeComplete={new_color =>
							this.onChangeHandler({
								key: "color",
								value: new_color
							})
						}
					/>
				</div>
				<BaseControl>
					<span>
						<input
							id={`${id}-x`}
							type="number"
							placeholder={__("X")}
							className="boxshadow-x"
							onChange={e =>
								this.onChangeHandler({
									key: "x",
									value: e.target.value
								})
							}
							value={this.state.x}
						/>
					</span>
					<span>
						<input
							id={`${id}-y`}
							type="number"
							placeholder={__("Y")}
							className="boxshadow-y"
							onChange={e =>
								this.onChangeHandler({
									key: "y",
									value: e.target.value
								})
							}
							value={this.state.y}
						/>
					</span>
					<span>
						<input
							id={`${id}-blur`}
							type="number"
							placeholder={__("Blur")}
							className="boxshadow-blur"
							onChange={e =>
								this.onChangeHandler({
									key: "blur",
									value: e.target.value
								})
							}
							value={this.state.blur}
						/>
					</span>
					<span>
						<input
							id={`${id}-spread`}
							type="number"
							placeholder={__("Spread")}
							className="boxshadow-spread"
							onChange={e =>
								this.onChangeHandler({
									key: "spread",
									value: e.target.value
								})
							}
							value={this.state.spread}
						/>
					</span>
					<span className="boxshadow_inset" data-tooltip={__("Inset")}>
						<CheckboxControl
							id={`${id}-inset`}
							
							className="boxshadow-inset"
							checked={this.state.inset}
							onChange={isChecked =>
								this.onChangeHandler({
									key: "inset",
									value: isChecked
								})
							}
						/>
					</span>
				</BaseControl>
			</div>
		);
	}
}

export default withInstanceId(BoxShadowControl);
