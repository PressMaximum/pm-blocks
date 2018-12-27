const { __ } = wp.i18n;
import { defaults } from "lodash";
const { Component } = wp.element;
const {
	TextControl,
	CheckboxControl,
	IconButton,
	TabPanel,
	Dashicon,
	Fragment,
	BaseControl
} = wp.components;
const { withState, withInstanceId } = wp.compose;
// var closest = require('dom-closest');
class CSSRulerControl extends Component {
	constructor() {
		super(...arguments);

		const default_value = {
			top: "",
			left: "",
			bottom: "",
			right: "",
			link: "",

			top_tablet: "",
			left_tablet: "",
			bottom_tablet: "",
			right_tablet: "",
			link_tablet: "",

			top_mobile: "",
			left_mobile: "",
			bottom_mobile: "",
			right_mobile: "",
			link_mobile: "",
			_devices: []
		};

		this.state = defaults( this.props.value, default_value );
		this.onChangeHandler = this.onChangeHandler.bind( this );
	}

	onChangeHandler = data => {
		console.log("Change", data);
		let key = data.key + "_" + data.device;
		if (data.device === "desktop") {
			key = data.key;
		} else {
	
		}

		let changeData= {};
		 changeData[ key ] = data.value ;

		this.setState( changeData );

		this.props.onChange( this.state );
	};

	render() {
		const {
			onChange,
			className,
			label,
			value,
			instanceId,
			...props
		} = this.props;

		var that = this;

		const id = `css-ruler-control-${instanceId}`;

		return (
			<BaseControl id={id} className="padding-control-wrap" {...props}>
				<span class="padding-control-label">{__("Padding")}</span>
				<TabPanel
					className="padding-responsive-tabs"
					activeClass="active-tab"
					tabs={[
						{
							name: "desktop",
							title: <Dashicon icon="desktop" />,
							className: "padding-desk-tab"
						},
						{
							name: "tablet",
							title: <Dashicon icon="tablet" />,
							className: "padding-tablet-tab"
						},
						{
							name: "mobile",
							title: <Dashicon icon="smartphone" />,
							className: "padding-mobile-tab"
						}
					]}
				>
					{tab => {

						let valueTop, valueRight, valueBottom, valueLeft;
						if (tab.name === "desktop") {
							valueTop = this.state["top"];
							valueRight = this.state["right"];
							valueBottom = this.state["bottom"];
							valueLeft = this.state["left"];
						} else {
							valueTop = this.state["top_" + tab.name];
							valueRight = this.state["right_" + tab.name];
							valueBottom = this.state["bottom_" + tab.name];
							valueLeft = this.state["left_" + tab.name];
						}

						const prefixId = `${id}-${tab.name}`;

						return (
							<div className="padding-tab-content">
								<div
									className={`components components-css-ruler-control padding-for-${
										tab.name
									}`}
								>
									<div
										className={`padding-settings padding-for-${
											tab.name
										}`}
										data-mode={tab.name}
									>
										<span>
											<input
												id={`${prefixId}-top`}
												type="text"
												placeholder={__("Top")}
												className="padding-top"
												onChange={e =>
													this.onChangeHandler({
														key: "top",
														value: e.target.value,
														device: tab.name
													})
												}
												value={valueTop}
												{...props}
											/>
										</span>
										<span>
											<input
												id={`${prefixId}-right`}
												type="text"
												placeholder={__("Right")}
												className="padding-right"
												onChange={e =>
													this.onChangeHandler({
														key: "right",
														value: e.target.value,
														device: tab.name
													})
												}
												value={valueRight}
												{...props}
											/>
										</span>
										<span>
											<input
												id={`${prefixId}-bottom`}
												type="text"
												placeholder={__("Bottom")}
												className="padding-bottom"
												onChange={e =>
													this.onChangeHandler({
														key: "bottom",
														value: e.target.value,
														device: tab.name
													})
												}
												value={valueBottom}
												{...props}
											/>
										</span>
										<span>
											<input
												id={`${prefixId}-left`}
												type="text"
												placeholder={__("Left")}
												className="padding-left"
												onChange={e =>
													this.onChangeHandler({
														key: "left",
														value: e.target.value,
														device: tab.name
													})
												}
												value={valueLeft}
												{...props}
											/>
										</span>
										<span className="toggle_value_together">
											<IconButton
												className="padding-together active"
												icon="admin-links"
												label={__("Padding together")}
											/>
										</span>
									</div>
								</div>
							</div>
						);
					}}
				</TabPanel>
			</BaseControl>
		);
	}
}

export default withInstanceId(CSSRulerControl);
