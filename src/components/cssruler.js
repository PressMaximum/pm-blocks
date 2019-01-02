const { __ } = wp.i18n;
import { defaults } from "lodash";
const { Component } = wp.element;
const {
	IconButton,
	BaseControl
} = wp.components;
const { withInstanceId } = wp.compose;
var closest = require("dom-closest");
class CSSRulerControl extends Component {
	constructor() {
		super(...arguments);

		const default_value = {
			top: "",
			left: "",
			bottom: "",
			right: "",
			link: true
		};
		this.state = defaults(this.props.value, default_value);
		this.onChangeHandler = this.onChangeHandler.bind(this);
	}
	componentDidUpdate( oldProps ) {
		const newValue = this.props.value;
		const oldValue = oldProps.value;
		if( newValue.top !== oldValue.top ) {
			this.setState({top: newValue.top});
		}
		if( newValue.right !== oldValue.right ) {
			this.setState({right: newValue.right});
		}
		if( newValue.bottom !== oldValue.bottom ) {
			this.setState({bottom: newValue.bottom});
		}
		if( newValue.left !== oldValue.left ) {
			this.setState({left: newValue.left});
		}
		if( newValue.link !== oldValue.link ) {
			this.setState({link: newValue.link});
		}
	}

	onChangeHandler = data => {
		let key = data.key;
		let changeData = {};
		if (this.state.link) {
			changeData['top'] = data.value;
			changeData['right'] = data.value;
			changeData['bottom'] = data.value;
			changeData['left'] = data.value;
		} else {
			changeData[key] = data.value;
		}

		this.setState(changeData);

		let current_state = this.state;
		let current_data = Object.assign({}, current_state, changeData);
		this.props.onCSSRulerChange(current_data);
	};

	maybeValueTogether = data => {
		var button_node = closest(event.target, ".cssruler-together");

		if (button_node.classList.contains("active")) {
			button_node.classList.remove("active");
			this.setState({ link: false });
		} else {
			button_node.classList.add("active");
			this.setState({ link: true });
		}
		
	};

	render() {
		const {
			onCSSRulerChange,
			className,
			value,
			instanceId,
			...props
		} = this.props;
		const id = `css-ruler-control-${instanceId}`;
		const prefixId = `${id}`;
		let valueTop, valueRight, valueBottom, valueLeft;
		valueTop = this.state["top"];
		valueRight = this.state["right"];
		valueBottom = this.state["bottom"];
		valueLeft = this.state["left"];

		return (
			<BaseControl id={id} className="cssruler-control-wrap" {...props}>
				<span>
					<input
						id={`${prefixId}-top`}
						type="number"
						placeholder={__("Top")}
						className="cssruler-top"
						onChange={e =>
							this.onChangeHandler({
								key: "top",
								value: e.target.value
							})
						}
						value={valueTop}
						{...props}
					/>
				</span>
				<span>
					<input
						id={`${prefixId}-right`}
						type="number"
						placeholder={__("Right")}
						className="cssruler-right"
						onChange={e =>
							this.onChangeHandler({
								key: "right",
								value: e.target.value
							})
						}
						value={valueRight}
						{...props}
					/>
				</span>
				<span>
					<input
						id={`${prefixId}-bottom`}
						type="number"
						placeholder={__("Bottom")}
						className="cssruler-bottom"
						onChange={e =>
							this.onChangeHandler({
								key: "bottom",
								value: e.target.value
							})
						}
						value={valueBottom}
						{...props}
					/>
				</span>
				<span>
					<input
						id={`${prefixId}-left`}
						type="number"
						placeholder={__("Left")}
						className="cssruler-left"
						onChange={e =>
							this.onChangeHandler({
								key: "left",
								value: e.target.value
							})
						}
						value={valueLeft}
						{...props}
					/>
				</span>
				<span className="toggle_value_together">
					<IconButton
						className={
							this.state['link']
								? "cssruler-together active"
								: "cssruler-together"
						}
						icon="admin-links"
						label={__("Set value together")}
						onClick={e => this.maybeValueTogether()}
					/>
				</span>
			</BaseControl>
		);
	}
}

export default withInstanceId(CSSRulerControl);

/**
 * Using
 * <CSSRulerControl value={padding} onCSSRulerChange={ padding =>setAttributes({padding})}/>
 */