const { __ } = wp.i18n;
const { Component } = wp.element;
import { defaults } from "lodash";
const { withInstanceId } = wp.compose;

class AccordionSectionControl extends Component {
	constructor() {
		super(...arguments);

		let default_open = true;
		if( 'undefined' !== typeof( this.props.defaultOpen ) ) {
			default_open = !!this.props.defaultOpen;
		}
		this.state = {
			isOpen: default_open
		};

		this.onClickAccordionSection = this.onClickAccordionSection.bind(this);
	}

	onClickAccordionSection() {
		this.setState((state)=> {
			
			return {isOpen: !state.isOpen};
		});
	}
	

	render() {
		const {
			className,
			label,
			defaultOpen,
			instanceId,
			...props
		} = this.props;
		const id = `accordion-section-control-${instanceId}`;

		let wraperClassName = "accordion-section-control";
		if ("undefined" != typeof className) {
			wraperClassName += " " + className;
		}
		if ( 'undefined' !== typeof( label ) && '' != label) {
			wraperClassName += " has-label";
		}

		return (
			<div className={wraperClassName} id={id} {...props}>
				<div className="accoridion-section-header" onClick={this.onClickAccordionSection}>
					{label && <span className="control-label accordion-section-label">{label}</span>}
					<div className="accordion-state-icon">
						{!this.state.isOpen && <span className="accordion-icon is-closing"><span class="dashicons dashicons-arrow-up-alt2"></span></span>}
						{this.state.isOpen && <span className="accordion-icon is-opening"><span class="dashicons dashicons-arrow-down-alt2"></span></span>}
					</div>
				</div>
				{this.state.isOpen && (
					<div className="accoridion-section-body">
						{this.props.children}
					</div>
				)}
				
			</div>
		);
	}
}

export default withInstanceId(AccordionSectionControl);
