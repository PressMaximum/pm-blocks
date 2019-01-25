const { __ } = wp.i18n;
const { Component } = wp.element;
import './editor.scss';
const closest = require('dom-closest');
import PMHelper from '../../helper/helper.js';
const pmHelper = new PMHelper();
import icons from "./icons";
import TypographyControl from "../typography/index";
const { Popover, IconButton } = wp.components;
const { withInstanceId } = wp.compose;

class TypographyDropdownControl extends Component {
	constructor() {
		super(...arguments);
		this.state = {
			isOpen: false
		}
		this.onChangeHandler = this.onChangeHandler.bind(this);
		this.openPopover = this.openPopover.bind(this);
		this.onClickOutside = this.onClickOutside.bind(this);
	}

	onChangeHandler(data) {
		if ("function" === typeof this.props.onTypographyDropdownChange) {
			this.props.onTypographyDropdownChange(data);
		}
	}

	openPopover( e ) {
		let target = e.target;
		let targetTagName = target.nodeName;
		let btnTarget = target;
		if( 'BUTTON' !== targetTagName.toUpperCase() ) {
			btnTarget = closest(target, 'button.components-dropdown-menu__toggle');	
		}

		if( pmHelper.notUndefinedNull( btnTarget ) ) {
			if ( btnTarget.classList.contains( 'click-to-open' ) ) {
				btnTarget.classList.remove('click-to-open');
				btnTarget.classList.add('click-to-close');
				this.setState( { isOpen: true } );
			} else {
				btnTarget.classList.remove('click-to-close');
				btnTarget.classList.add('click-to-open');
				this.setState( { isOpen: false } );
			}
		}
	}

	onClickOutside() {
		this.setState( { isOpen: false } );
	}
	
	render() {
		const {
			className,
			label,
			value,
			instanceId,
			onTypographyDropdownChange,
			...props
		} = this.props;
		const id = `typography-control-${instanceId}`;

		let wraperClassName = "typography-control typography-dropdown-control";
		if ("undefined" != typeof className) {
			wraperClassName += " " + className;
		}
		if ("" != label) {
			wraperClassName += " has-label";
		}
		
		return (
			<div className={wraperClassName} id={id}>
				{label && <span className="control-label">{label}</span>}
				<IconButton
					className="components-dropdown-menu__toggle click-to-open"
					icon={ icons.typography }
					onClick={ (e) => this.openPopover( e ) }
					aria-haspopup="true"
					aria-expanded={ this.state.isOpen }
					label={ __("Typography dropdown") }
					tooltip={ __("Typography dropdown") }
				>
					<span className="components-dropdown-menu__indicator" />
					{this.state.isOpen && (
						<Popover onClickOutside={this.onClickOutside}>
							<div className="typography-dropdown-content">
								<TypographyControl value={value} onTypographyChange={(new_value) => { this.onChangeHandler(new_value)}}/>
							</div>
						</Popover>
					)}
				</IconButton>
			</div>
		);
	}
}

export default withInstanceId(TypographyDropdownControl);
