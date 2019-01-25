import './editor.scss';
const { __ } = wp.i18n;
const { Component } = wp.element;
const closest = require('dom-closest');
const { SelectControl, BaseControl } = wp.components;
const { withInstanceId } = wp.compose;

import PMHelper from '../../helper/helper.js';
const pmHelper = new PMHelper();

class FontsControl extends Component {
	constructor() {
		super(...arguments);

		var default_value = {
			family: "",
			style: "",
			subsets: [],
			variant: '',
			font_type: '',

			list_variants: [],
			list_subsets: [],
			list_fonts: []
		};
		//Set state
		this.state = pmHelper.defaults(this.props.value, default_value);
		this.onChangeHandler = this.onChangeHandler.bind(this);

	}
	componentDidMount() {
		let ajax_url = pm_blocks_js.ajaxurl;
		ajax_url += "?action=pm_blocks_get_fonts";
		fetch( ajax_url ).then(res => res.json()).then(
			result => {
				this.setState({ list_fonts: result.data });
				let saved_font_type = this.state.font_type;
				if( 'undefined' !== typeof( saved_font_type ) && '' !== saved_font_type ) {
					let saved_font_data = result.data[saved_font_type]['fonts'][this.state.family];
					
					this.setState({
						list_variants: saved_font_data['variants'],
						list_subsets: saved_font_data['subsets'],
					});
				}
			},
			error => {
				console.log(__("Fail to load list fonts"));
			}
		);
	}

	inArray(arr, element) {
		for (let i = 0; i < arr.length; i++) {
			if (arr[i] === element) {
				return true;
			}
		}
		return false;
	}

	onChangeHandler(data) {
		var changed_value = {};

		switch (data.key) {
			case "family":
				let option_target = data.value.target;
				let selected_value = option_target.value;
				let selected_options = option_target.options;
				let selected_index = option_target.selectedIndex;
				let support_value = [ '', 'inherit', 'initial', 'unset' ];
				let input_family, selected_group = '';

				if( support_value.includes( selected_value ) ) {
					input_family = selected_value;
				} else {
					selected_group = selected_options[
						selected_index
					].parentNode.getAttribute("data-type");
					let get_font_data = this.state.list_fonts[selected_group][
						"fonts"
					];
					let font_data = get_font_data[selected_value];
					
					if ("undefined" !== typeof font_data.variants) {
						this.setState({
							list_variants: font_data.variants
						});
						if( '' !== font_data.variants && font_data.variants.length > 0 ) {
							changed_value.variant = font_data.variants[0];
						}
					} else {
						this.setState({
							list_variants: []
						});
						changed_value.variant = '';
					}

					if ("undefined" !== typeof font_data.subsets) {
						this.setState({
							list_subsets: font_data.subsets
						});
					} else {
						this.setState({
							list_subsets: []
						});
					}
					input_family = font_data.family;
					
				}
				changed_value.family = input_family;
				changed_value.style = '';
				changed_value.subsets = [];
				changed_value.font_type = selected_group;
				break;
			case "subsets" :
				let parent_node = closest( data.value, '.field-font-subsets' );
				let allChecked = parent_node.querySelectorAll('input[data-name="fonts-control-subset"]:checked');
				let list_variants = [];
				if( allChecked.length > 0 ) {
					for( var i=0; i<allChecked.length; i++ ){
						list_variants.push( allChecked[i].value );
					}
				}
				changed_value.subsets = list_variants;
				break;
			case "variant" :
				changed_value.variant = data.value;
				break;
			case "style" :
				changed_value.style = data.value;
				break;
		}
		this.setState(changed_value);
		if ("function" === typeof this.props.onFontsChange) {
			let current_state = this.state;
			let current_data = Object.assign({}, current_state, changed_value);
			let return_value = {
				family: current_data.family,
				style: current_data.style,
				subsets: current_data.subsets,
				variant: current_data.variant,
				font_type: current_data.font_type
			};
			
			this.props.onFontsChange(return_value);
		}
		
	}

	render() {
		const {
			className,
			label,
			value,
			instanceId,
			onFontsChange,
			...props
		} = this.props;
		const id = `fonts-control-${instanceId}`;

		let wraperClassName = "fonts-control";
		if ("undefined" != typeof className) {
			wraperClassName += " " + className;
		}
		if ("" != label) {
			wraperClassName += " has-label";
		}

		const fontsList = this.state.list_fonts;
		return (
			<div className={wraperClassName} id={id} {...props}>
				{label && <span className="control-label">{label}</span>}
				<BaseControl
					label={__("Font Family")}
					id={`${id}-font-family`}
					className="fonts-family"
				>
					<select
						id={id}
						className="fonts-select-font"
						value={this.state.family}
						onChange={e =>
							this.onChangeHandler({
								key: "family",
								value: e
							})
						}
					>
						<optgroup label={ __( "Default Property" ) } data-type='default_property'>
							<option value="">{ __( "Default" ) }</option>
							<option value="inherit">{ __( "Inherit" ) }</option>
							<option value="initial">{ __( "Initial" ) }</option>
						</optgroup>
						
						{pmHelper.mapObject(fontsList, (option, index) => (
							<optgroup label={option.title} data-type={index}>
								{pmHelper.mapObject(option.fonts, (value, key) => (
									<option key={key} value={value.family}>
										{value.family}
									</option>
								))}
							</optgroup>
						))}
					</select>
				</BaseControl>

				{this.state.list_subsets && this.state.list_subsets.length > 0 && (
					<div className="font-subsets">
						<span className="field-label">
							{__("Font Languages")}
						</span>
						<BaseControl id={ `${id}-font-subset` } className="field-font-subsets">
							{this.state.list_subsets.map((value, key) => (
								<div className="subset-item">
									<input
										id={ `${id}-font-subset-${key}` }
										className="components-checkbox-control__input"
										type="checkbox"
										value={value}
										name={ `${id}-font-subset-${key}[]` }
										data-name="fonts-control-subset"
										{ ...(this.inArray(this.state.subsets, value) ? {checked:'checked'}: {}) }
										onChange={ e =>
											this.onChangeHandler({
												key: "subsets",
												value: e.target
											})
										}
									/>
									<label className="subset-label" htmlFor={ `${id}-font-subset-${key}` }>
										{ value }
									</label>
								</div>
							))}
						</BaseControl>
						
					</div>
				)}
				{this.state.list_variants &&
				this.state.list_variants.length > 0 ? (
					<SelectControl
						label={__("Font weight")}
						value={this.state.variant}
						options={pmHelper.mapObject(
							this.state.list_variants,
							(value, index) => ({
								value: value,
								label: (value.includes('italic')) ? value.replace('italic', ' Italic') : value,
							})
						)}
						onChange={new_value =>
							this.onChangeHandler({
								key: "variant",
								value: new_value
							})
						}
					/>
				) : (
					<div>
						<SelectControl
							label={__("Font weight")}
							value={this.state.variant}
							options={[
								{ label: __("Default"), value: "" },
								{ label: __("100"), value: "100" },
								{ label: __("200"), value: "200" },
								{ label: __("300"), value: "300" },
								{ label: __("Normal"), value: "normal" },
								{ label: __("500"), value: "500" },
								{ label: __("600"), value: "600" },
								{ label: __("700"), value: "700" },
								{ label: __("800"), value: "800" },
								{ label: __("900"), value: "900" },
								{ label: __("Inherit"), value: "inherit" },
								{ label: __("Initial"), value: "initial" },
								{ label: __("Unset"), value: "unset" },
							]}
							onChange={new_value =>
								this.onChangeHandler({
									key: "variant",
									value: new_value
								})
							}
						/>
						<SelectControl
							label={__("Font style")}
							value={this.state.style}
							options={[
								{ label: __("Default"), value: "" },
								{ label: __("Normal"), value: "normal" },
								{ label: __("Italic"), value: "italic" },
								{ label: __("Oblique"), value: "oblique" },
								{ label: __("Initial"), value: "initial" },
								{ label: __("Inherit"), value: "inherit" }
							]}
							onChange={new_value =>
								this.onChangeHandler({
									key: "style",
									value: new_value
								})
							}
						/>
					</div>
				)}
			</div>
		);
	}
}

export default withInstanceId(FontsControl);
