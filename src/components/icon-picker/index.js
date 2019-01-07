const { __ } = wp.i18n;
const { Component } = wp.element;
import { defaults } from "lodash";
import FontIconPicker from '@fonticonpicker/react-fonticonpicker';
import './editor.scss';
const { withInstanceId } = wp.compose;

class IconPickerControl extends Component {
	constructor() {
		super(...arguments);
		//Set state
		this.state = {
			value: (this.props.value) ? this.props.value : '',
			list_icons: {},
		}
		this.onChangeHandler = this.onChangeHandler.bind(this);
	}
	componentDidMount() {
		let ajax_url = pm_blocks_js.ajaxurl;
		ajax_url += "?action=pm_blocks_get_fonticon";
		fetch( ajax_url ).then(res => res.json()).then(
				result => {
					let icon_data = result.data;
					let icons = {};

					let icon_keys = Object.keys(icon_data);
					if( Array.isArray( icon_keys ) && icon_keys.length > 0 ) {
						for( let i=0; i<icon_keys.length; i++ ) {
							let icon_item = icon_data[icon_keys[i]];
							
							icons[ icon_item.name ] = icon_item.icons;
						}
					}
				
					this.setState({ list_icons: icons });
					
				},
				error => {
					console.log(__("Fail to load list fonts"));
				}
		);
	}
	
	onChangeHandler(value) {
		this.setState({value:value});
		if ("function" === typeof this.props.onIconChange) {
			this.props.onIconChange(value);
		}
	}
	render() {
		const {
			className,
			label,
			value,
			instanceId,
			onIconChange,
			isMulti,
			...props
		} = this.props;
		const id = `iconpicker-control-${instanceId}`;

		let wraperClassName = "iconpicker-control";
		if ("undefined" != typeof className) {
			wraperClassName += " " + className;
		}
		if ("" != label) {
			wraperClassName += " has-label";
		}
		return (
			<div className={wraperClassName} id={id} {...props}>
				{label && <span className="control-label">{label}</span>}
				<FontIconPicker value={this.state.value} isMulti={isMulti} onChange={this.onChangeHandler} renderUsing="class" theme="bluegrey" icons={this.state.list_icons}/>
			</div>
		);
	}
}

export default withInstanceId(IconPickerControl);
