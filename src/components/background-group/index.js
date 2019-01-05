const { __ } = wp.i18n;
const { Component } = wp.element;
import { defaults } from "lodash";
const { TabPanel } = wp.components;
const { withInstanceId } = wp.compose;

import BackgroundBoxControl from "../background-box/index";
import BackgroundGradientBoxControl from "../background-gradient-box/index";

class BackgroundGroupControl extends Component {
	constructor() {
		super(...arguments);

		var default_value = {
			bg_type: 'normal',
			bg_value: {
				normal: {
					
				},
				gradient: {
					
				}
			}
		};
		//Set state
		this.state = defaults(this.props.value, default_value);
		this.onChangeHandler = this.onChangeHandler.bind(this);
		this.onTabSelect = this.onTabSelect.bind(this);
	}

	onChangeHandler(data) {
		var changed_value = {};
		switch (data.key) {
			case "normal":
				changed_value = {
					normal: data.value,
					gradient: this.state.bg_value.gradient
				}
				break;
			case "gradient":
				changed_value = {
					gradient: data.value,
					normal: this.state.bg_value.normal
				}
				break;
		}
		this.setState({bg_value: changed_value});

		if ("function" === typeof this.props.onBackgroundGroupChange) {
			let current_state = this.state;
			let current_data = Object.assign({}, current_state, {bg_value:changed_value} );
			this.props.onBackgroundGroupChange(current_data);
		}
	}

	onTabSelect( value ) {
		this.setState({bg_type: value});
		if ("function" === typeof this.props.onBackgroundGroupChange) {
			let current_state = this.state;
			let current_data = Object.assign({}, current_state, {bg_type:value} );
		
			this.props.onBackgroundGroupChange(current_data);
		}
	}

	render() {
		const {
			className,
			label,
			value,
			instanceId,
			onBackgroundGroupChange,
			...props
		} = this.props;
		const id = `bg-group-control-${instanceId}`;

		let wraperClassName = "bg-group-control";
		if ("undefined" != typeof className) {
			wraperClassName += " " + className;
		}
		if ("" != label) {
			wraperClassName += " has-label";
		}
		return (
			<div className={wraperClassName} id={id} {...props}>
				{label && <span className="control-label">{label}</span>}
				<TabPanel
					className="my-tab-panel"
					activeClass="active-tab"
					onSelect={this.onTabSelect}
					initialTabName={this.state.bg_type}
					tabs={[
						{
							name: "normal",
							title: __("Normal"),
							className: "tab-bg_normal",
							tab_content: (
								<BackgroundBoxControl
									value={this.state.bg_value.normal}
									onBackgroundChange={new_value => {
										this.onChangeHandler({ key: "normal", value: new_value })
									}}
								/>
							)
						},
						{
							name: "gradient",
							title: __("Gradient"),
							className: "tab-bg_gradient",
							tab_content: (
								<BackgroundGradientBoxControl
									value={this.state.bg_value.gradient}
									onBgGradientChange={new_value => {
										this.onChangeHandler({ key: "gradient", value: new_value })
									}}
								/>
							)
						}
					]}
				>
					{tab => <p>{tab.tab_content}</p>}
				</TabPanel>
			</div>
		);
	}
}

export default withInstanceId(BackgroundGroupControl);
