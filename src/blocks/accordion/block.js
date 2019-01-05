import './style.scss';
import './editor.scss';

import AccordionControl from '../../components/accordion/index';

const { __ } = wp.i18n; 
const { registerBlockType } = wp.blocks;

registerBlockType( 'pm-blocks/block-accordion', {
	title: __( 'PM Accordion' ), 
	icon: 'shield',
	category: 'common',
	keywords: [
		__( 'Accordion' ),
		__( 'PM Accordion' ),
	],
	attributes: {
		
	},
	
	edit: function( props ) {
		return (
			<div className={ props.className }>
				<AccordionControl label="Block Accordion">
					<div label="Item 01" defaultOpen={true}>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
					</div>
					<div label="Item 02" defaultOpen={false}>
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
					</div>

					<div label="Item 03">
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
					</div>

					<div label="Item 04">
						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
					</div>
				</AccordionControl>
				<p>Hello, This is Accoridon</p>
			</div>
	
		);
	},

	save: function( props ) {
		return (
			<div>
				<p>Hello, This is block border box.</p>
			</div>
		);
	},
} );
