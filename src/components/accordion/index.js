import './editor.scss';
const { __ } = wp.i18n;
const { Component } = wp.element;
import PMHelper from '../../helper/helper.js';
const { withInstanceId } = wp.compose;
import AccordionSectionControl from './accordion_section';
class AccordionControl extends Component {
	constructor() {
		super(...arguments);

		var default_value = {
			
		};
		//Set state
		const pmHelper = new PMHelper();
		this.state = pmHelper.defaults(this.props.value, default_value);
		
	}
	

	render() {
		const {
			className,
			value,
			label,
			instanceId,
			defaultOpen,
			onTypographyChange,
			...props
		} = this.props;
		const id = `accordion-control-${instanceId}`;

		let wraperClassName = "accordion-control";
		if ("undefined" != typeof className) {
			wraperClassName += " " + className;
		}
		if ("" != label) {
			wraperClassName += " has-label";
		}

		return (
			<div className={wraperClassName} id={id} {...props}>
				{label && <span className="control-label accordion-label">{label}</span>}
				{this.props.children.map(child => (
					<AccordionSectionControl
						label={child.props.label}
						defaultOpen={child.props.defaultOpen}
					>
						{child.props.children}
					</AccordionSectionControl>
				))}
			</div>
		);
	}
}

export default withInstanceId(AccordionControl);
