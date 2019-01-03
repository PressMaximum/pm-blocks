const { __ } = wp.i18n;
const { Component } = wp.element;
import { defaults, pick } from "lodash";
const { SelectControl, IconButton } = wp.components;
const { withInstanceId } = wp.compose;
const { MediaUpload, MediaPlaceholder } = wp.editor;

import ColorPickerControl from "../color-picker/index";

const ALLOWED_MEDIA_TYPES = [ 'image' ];
export const pmPickRelevantMediaFiles = ( image ) => {
	return {
		...pick( image, [ 'id', 'url' ] )
	};
};
class BackgroundBoxControl extends Component {
	constructor() {
		super(...arguments);

		var default_value = {
			color: {
				rgba: '',
				hex: '',
			},
			image: {
				id: '',
				url: ''
			},
			size: '',
			position: '',
			repeat: 'repeat',
			attachment: ''
		};
		//Set state
		this.state = defaults(this.props.value, default_value);
		this.onChangeHandler = this.onChangeHandler.bind(this);
		this.onSelectImage = this.onSelectImage.bind(this);
	}

	onChangeHandler(data) {
		var changed_value = {};
		switch ( data.key ) {
			case "color" :
				changed_value.color = data.value;
				break;
			case "image" :
				changed_value.image = data.value;
				break;
			case "size" :
				changed_value.size = data.value;
				break;
			case "position" :
				changed_value.position = data.value;
				break;
			case "repeat" :
				changed_value.repeat = data.value;
				break;
			case "attachment" :
				changed_value.attachment = data.value;
				break;
		}
		this.setState(changed_value);

		if ("function" === typeof this.props.onBackgroundChange) {
			let current_state = this.state;
			let current_data = Object.assign({}, current_state, changed_value);
			this.props.onBackgroundChange(current_data);
		}
	}

	onSelectImage( media ) {
		let image_attr = {};
		if ( ! media || ! media.url ) {
			image_attr = {
				url: undefined,
				id: undefined,
			};
			return;
		}

		image_attr = {
			...pmPickRelevantMediaFiles( media )
		};
		this.setState({image: image_attr});
		this.onChangeHandler({ key: "image", value: image_attr });
	}

	render() {
		const {
			className,
			label,
			value,
			instanceId,
			onBackgroundChange,
			...props
		} = this.props;
		const id = `background-control-${instanceId}`;
		
		let wraperClassName = "background-control";
		if ("undefined" != typeof className) {
			wraperClassName += " " + className;
		}
		if ("" != label) {
			wraperClassName += " has-label";
		}
		return (
			<div className={wraperClassName} id={id} {...props}>
				{label && <span className="control-label">{label}</span>}
				<ColorPickerControl
					label={__("Color")}
					value={this.state.color}
					onColorChangeComplete={ new_value =>
						this.onChangeHandler({ key: "color", value: new_value })
					}
				/>
				<div className="bg-image">
					{ ( this.state.image.id && this.state.image.url ) ? (
						<div className="bg-preview" style={{backgroundImage:`url(${this.state.image.url})`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1em', minHeight: '200px', width: '100%', textAlign: 'center', position: 'relative'}}>
							<MediaUpload
								onSelect={ this.onSelectImage }
								allowedTypes={ ALLOWED_MEDIA_TYPES }
								value={ this.state.image.id }
								render={ ( { open } ) => (
									<IconButton
										className="components-toolbar__control"
										label={ __( 'Edit image' ) }
										icon="edit"
										style={{position: 'absolute', top: 0, right: 0}}
										onClick={ open }
									/>
								) }
							/>
						</div>
					) : (
						<div className="bg-placeholder">
							<MediaPlaceholder
									icon="format-image"
									labels={ {
										title: __( 'Image' ),
										name: __( 'an image' ),
									} }
									onSelect={ this.onSelectImage }
									accept="image/*"
									allowedTypes={ ALLOWED_MEDIA_TYPES }
							/>
						</div>
					) }
					
				</div>
				<div className="bg-2-fields">
					<div className="bg-field">		
						<SelectControl
							label={__("Size")}
							value={this.state.size}
							options={[
								{ label: __("Default"), value: "" },
								{ label: __("Auto"), value: "auto" },
								{ label: __("Cover"), value: "cover" },
								{ label: __("Contain"), value: "contain" }
							]}
							onChange={new_value =>
								this.onChangeHandler({ key: "size", value: new_value })
							}
						/>
					</div>
					<div className="bg-field">
						<SelectControl
							label={__("Position")}
							value={this.state.position}
							options={[
								{ label: __("Default"), value: "" },
								{ label: __("Center"), value: "center" },
								{ label: __("Top Left"), value: "top left" },
								{ label: __("Top Right"), value: "top right" },
								{ label: __("Top Center"), value: "top center" },
								{ label: __("Bottom Left"), value: "bottom left" },
								{ label: __("Bottom Center"), value: "bottom center" },
								{ label: __("Bottom Right"), value: "bottom right" }
							]}
							onChange={new_value =>
								this.onChangeHandler({ key: "position", value: new_value })
							}
						/>
					</div>
				</div>
				<div className="bg-2-fields">
					<div className="bg-field">
						<SelectControl
							label={__("Repeat")}
							value={this.state.repeat}
							options={[
								{ label: __("Default"), value: "repeat" },
								{ label: __("No repeat"), value: "no-repeat" },
								{ label: __("Repeat horizontal"), value: "repeat-x" },
								{ label: __("Repeat vertical"), value: "repeat-y" }
							]}
							onChange={new_value =>
								this.onChangeHandler({ key: "repeat", value: new_value })
							}
						/>
					</div>
					<div className="bg-field">
						<SelectControl
							label={__("Attachment")}
							value={this.state.attachment}
							options={[
								{ label: __("Default"), value: "" },
								{ label: __("Scroll"), value: "scroll" },
								{ label: __("Fixed"), value: "fixed" }
							]}
							onChange={new_value =>
								this.onChangeHandler({ key: "attachment", value: new_value })
							}
						/>
					</div>
				</div>		
			</div>
		);
	}
}

export default withInstanceId(BackgroundBoxControl);
