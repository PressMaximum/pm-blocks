import './style.scss';
import './editor.scss';
import classnames from 'classnames';
import TypographyDropdownControl from '../../components/typography-dropdown/index';
import TypographyControl from '../../components/typography/index';
import ColorPickerControl from '../../components/color-picker/index';

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { isUndefined, pickBy } = lodash;
const { Component, Fragment } = wp.element;

const {
	PanelBody,
	Placeholder,
	QueryControls,
	RangeControl,
	Spinner,
	ToggleControl,
	Toolbar,
	Popover
} = wp.components;
const {
	InspectorControls,
	BlockAlignmentToolbar,
	BlockControls,
} = wp.editor;

const { withSelect } = wp.data;
const { withState } = wp.compose;

const MAX_POSTS_COLUMNS = 6;

class AdvancePostsEdit extends Component{
	constructor() {
		super( ...arguments );
		this.toggleDisplayPostDate = this.toggleDisplayPostDate.bind( this );

		this.state = {
			openPopover: false,
			mustOpen: false
		};
	}

	toggleDisplayPostDate() {
		const { displayPostDate } = this.props.attributes;
		const { setAttributes } = this.props;

		setAttributes( { displayPostDate: ! displayPostDate } );
	}


	static extractContent(html, length) {
		const span = document.createElement("span");
		span.innerHTML = html;

		// Remove script tag
		const scripts = span.getElementsByTagName("script");
		let j = scripts.length;
		while (j--) {
			scripts[j].parentNode.removeChild(scripts[j]);
		}

		// Remove style tag
		const styles = span.getElementsByTagName("style");
		let k = styles.length;
		while (k--) {
			styles[k].parentNode.removeChild(styles[k]);
		}

		const children = span.querySelectorAll("*");
		for (let i = 0; i < children.length; i++) {
			if (children[i].textContent) children[i].textContent += " ";
			else children[i].innerText += " ";
		}

		let text = [span.textContent || span.innerText]
			.toString()
			.replace(/\s\s+/g, " ");
		text = text.slice(0, length).trim();

		if (text.length) text += "…";

		return text;
	}


	render() {
		const { attributes, categoriesList, setAttributes, advancedPosts, clientId, className } = this.props;
		const { displayPostDate, align, postLayout, columns, order, orderBy, categories, postsToShow, titleTypo, titleColor, titleFontSize, excerptTypo, excerptColor, uniqueID } = attributes;

		const inspectorControls = (
			<InspectorControls>
				<PanelBody title={ __( 'Advanced Posts Settings' ) }>
					<QueryControls
						{ ...{ order, orderBy } }
						numberOfItems={ postsToShow }
						categoriesList={ categoriesList }
						selectedCategoryId={ categories }
						onOrderChange={ ( value ) => setAttributes( { order: value } ) }
						onOrderByChange={ ( value ) => setAttributes( { orderBy: value } ) }
						onCategoryChange={ ( value ) => setAttributes( { categories: '' !== value ? value : undefined } ) }
						onNumberOfItemsChange={ ( value ) => setAttributes( { postsToShow: value } ) }
					/>
					<ToggleControl
						label={ __( 'Display post date' ) }
						checked={ displayPostDate }
						onChange={ this.toggleDisplayPostDate }
					/>
					{ postLayout === 'grid' &&
						<RangeControl
							label={ __( 'Columns' ) }
							value={ columns }
							onChange={ ( value ) => setAttributes( { columns: value } ) }
							min={ 2 }
							max={ ! hasPosts ? MAX_POSTS_COLUMNS : Math.min( MAX_POSTS_COLUMNS, advancedPosts.length ) }
						/>
					}

					<TypographyControl label={__("Title typography")} value={titleTypo} onTypographyChange={(new_value) => {setAttributes({titleTypo:new_value}); }}/>
					<ColorPickerControl
						label={__("Title color")}
						disableAlpha="true"
						value={titleColor}
						onColorChangeComplete={new_value => {
							setAttributes( { titleColor: new_value } );
						} }
					/>
					
					<TypographyControl label={__("Excerpt typography")} value={excerptTypo} onTypographyChange={(new_value) => {setAttributes({excerptTypo:new_value}); }}/>
					<ColorPickerControl
						label={__("Excerpt color")}
						disableAlpha="true"
						value={excerptColor}
						onColorChangeComplete={new_value => {
							setAttributes( { excerptColor: new_value } );
						} }
					/>
				</PanelBody>
			</InspectorControls>
		);

		const hasPosts = Array.isArray( advancedPosts ) && advancedPosts.length;
		if ( ! hasPosts ) {
			return (
				<Fragment>
					{ inspectorControls }
					<Placeholder
						icon="admin-post"
						label={ __( 'Advanced Posts' ) }
					>
						{ ! Array.isArray( advancedPosts ) ?
							<Spinner /> :
							__( 'No posts found.' )
						}
					</Placeholder>
				</Fragment>
			);
		}
		const displayPosts = advancedPosts.length > postsToShow ? advancedPosts.slice( 0, postsToShow ) : advancedPosts;

		const layoutControls = [
			{
				icon: 'list-view',
				title: __( 'List View' ),
				onClick: () => setAttributes( { postLayout: 'list' } ),
				isActive: postLayout === 'list',
			},
			{
				icon: 'grid-view',
				title: __( 'Grid View' ),
				onClick: () => setAttributes( { postLayout: 'grid' } ),
				isActive: postLayout === 'grid',
			},
		];

		return (
			<div className={`block-advance-posts ${ this.props.className }`}>
				<Fragment>
					{ inspectorControls }
					<BlockControls>
						<BlockAlignmentToolbar
							value={ align }
							onChange={ ( nextAlign ) => {
								setAttributes( { align: nextAlign } );
							} }
							controls={ [ 'center', 'wide', 'full' ] }
						/>
						<Toolbar controls={ layoutControls } />
					</BlockControls>
					<div
						className={ classnames( this.props.className, {
							'is-grid': postLayout === 'grid',
							[ `columns-${ columns }` ]: postLayout === 'grid',
						} ) }
					>
						{ displayPosts.map( ( post, i ) =>
							<div className={`post--item_wrap item-${i}`} key={ i }>
								{post.featured_img && (
									<div className="post--item_thumbnail">
										<a href={post.link} title={post.title.rendered}>
											<img
												src={post.featured_img}
												alt={post.title.rendered}
											/>
										</a>
									</div>
								)}
								
								<div className="post--item_info">
									<h4 class="post--item_title">
										<a href={post.link} title={post.title.rendered} >
											{post.title.rendered.trim() || __( '(Untitled)' )}
										</a>
									</h4>
									<div className="post--item_meta">
										{post.author_meta &&
											<span className="post--item_meta__author">
												<a href={post.author_meta.author_link} className="post--item_meta__author_link">{post.author_meta.display_name}</a>
											</span>
										}
										{post.date_gmt && 
											<span className="post--item_meta__date">{ moment( post.date_gmt ).local().format( 'MMMM DD, Y' ) }</span>
										}
									</div>
									<div
										className="post--item_excerpt"
										dangerouslySetInnerHTML={{
											__html: AdvancePostsEdit.extractContent( post.content.rendered, 20 )
										}}
										
									/>
								</div>
							</div>
						) }
					</div>
				</Fragment>
			</div>
		);

	}
}

registerBlockType( 'pm-blocks/advance-posts', {
	title: __( 'Advance Posts' ),
	icon: 'shield',
	category: 'common',
	keywords: [
		__( 'Advance posts' ),
		__( 'Post' ),
		__( 'Posts' ),
	],

	attributes: {
		numberPosts: {
			type: "integer",
			default: -1
		},
		postExcerptColor: {
			type: "string",
			default: "#000"
		},
		isEnableThumbnail: {
			type: "boolean",
			default: true
		},
		order: {
			type: "string",
			default: "asc"
		},
		orderBy: {
			type: "string",
			default: "date"
		},
		category: {
			type: "string"
		},

		titleTypo: {
			type: 'object',
		},
		titleColor: {
			type: 'object'
		},

		excerptTypo: {
			type: 'object',
		},
		excerptColor: {
			type: 'object'
		},
		
		uniqueID: {
			type: 'string',
		},
	},

	edit: withSelect( (select, props) => {
		const { getEntityRecords } = select("core");
		const {
			numberPosts,
			order,
			orderBy,
			category,
		} = props.attributes;

		const advancePostsQuery = pickBy(
			{
				categories: category,
				order,
				orderby: orderBy,
				//per_page: numberPosts
				per_page: 2
			},
			value => !isUndefined(value)
		);

		const categoriesListQuery = {
			per_page: 99
		};

		return {
			advancedPosts: getEntityRecords(
				"postType",
				"post",
				advancePostsQuery
			),
			categoriesList: getEntityRecords(
				"taxonomy",
				"category",
				categoriesListQuery
			)
		};

	})(AdvancePostsEdit),

	save: function( props ) {
		return null;
	},
} );
