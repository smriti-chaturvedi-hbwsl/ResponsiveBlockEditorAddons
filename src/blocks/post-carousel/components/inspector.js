import fontOptions from "../../../utils/googlefonts";

/**
 * Inspector Controls
 */

// Setup the block
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;

import compact from "lodash/compact";
import map from "lodash/map";
import { loadGoogleFont } from "../../../utils/font";

// Import block components

const { InspectorControls, ColorPalette } = wp.blockEditor;

// Import Inspector components
const {
  PanelBody,
  QueryControls,
  RangeControl,
  SelectControl,
  TextControl,
  ToggleControl,
  TabPanel,
  Dashicon,
} = wp.components;

const { addQueryArgs } = wp.url;

const { apiFetch } = wp;

const MAX_POSTS_COLUMNS = 4;

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
  constructor() {
    super(...arguments);
    this.state = { categoriesList: [] };
    this.togglePauseOnHover = this.togglePauseOnHover.bind(this);
    this.toggleInfiniteLoop = this.toggleInfiniteLoop.bind(this);
    this.toggleAutoplay = this.toggleAutoplay.bind(this);
  }

  componentDidMount() {
    this.stillMounted = true;
    this.fetchRequest = apiFetch({
      path: addQueryArgs("/wp/v2/categories", { per_page: -1 }),
    })
      .then((categoriesList) => {
        if (this.stillMounted) {
          this.setState({ categoriesList });
        }
      })
      .catch(() => {
        if (this.stillMounted) {
          this.setState({ categoriesList: [] });
        }
      });
  }

  componentWillUnmount() {
    this.stillMounted = false;
  }

  /* Get the available image sizes */
  imageSizeSelect() {
    const getSettings = wp.data.select("core/editor").getEditorSettings();

    return compact(
      map(getSettings.imageSizes, ({ name, slug }) => {
        return {
          value: slug,
          label: name,
        };
      })
    );
  }

  togglePauseOnHover() {
    const { pauseOnHover } = this.props.attributes;
    const { setAttributes } = this.props;

    setAttributes({ pauseOnHover: !pauseOnHover });
  }

  toggleInfiniteLoop() {
    const { infiniteLoop } = this.props.attributes;
    const { setAttributes } = this.props;

    setAttributes({ infiniteLoop: !infiniteLoop });
  }

  toggleAutoplay() {
    const { autoplay } = this.props.attributes;
    const { setAttributes } = this.props;

    setAttributes({ autoplay: !autoplay });
  }

  render() {
    // Setup the attributes
    const { attributes, setAttributes, latestPosts, postCount } = this.props;
    const {
      displayPostExcerpt,
      displayPostDate,
      displayPostLink,
      displayPostComment,
      displayPostTaxonomy,
      excerptLength,
      columns,
      columnsTablet,
      columnsMobile,
      pauseOnHover,
      infiniteLoop,
      transitionSpeed,
      autoplay,
      autoplaySpeed,
      arrowDots,
      arrowSize,
      arrowBorderSize,
      arrowBorderRadius,
      titleColor,
      contentColor,
      metaColor,
      dateColor,
      arrowDotsColor,
      ctaColor,
      ctaBackColor,
      ctaHoverColor,
      ctaHoverBackColor,
      ctaBorderColor,
      ctaHoverBorderColor,
      ctaBorderRadius,
      ctaBorderWidth,
      ctaBorderStyle,
      ctaHpadding,
      ctaVpadding,
      contentPadding,
      rowGap,
      columnGap,
      imageSpace,
      titleSpace,
      dateSpace,
      excerptSpace,
      ctaSpace,
      titleFontFamily,
      titleFontSize,
      titleFontSizeMobile,
      titleFontSizeTablet,
      titleFontWeight,
      titleLineHeight,
      metaFontFamily,
      metaFontSize,
      metaFontWeight,
      metaLineHeight,
      excerptFontFamily,
      excerptFontSize,
      excerptFontWeight,
      excerptLineHeight,
      ctaFontFamily,
      ctaFontSize,
      ctaFontWeight,
      ctaLineHeight,
      imageSize,
      imagePosition,
      opacity,
      readMoreText,
      equalHeight,
      buttonTarget,
      contentPaddingMobile,
    } = attributes;

    const { order, orderBy } = attributes;

    const { categoriesList } = this.state;

    const columnsCountOnChange = (selectedColumns) => {
      const { postsToShow } = attributes;
      setAttributes({
        columns: selectedColumns > postsToShow ? postsToShow : selectedColumns,
      });
    };
    const columnsTabletCountOnChange = (selectedColumns) => {
      const { postsToShow } = attributes;
      setAttributes({
        columnsTablet: selectedColumns > postsToShow ? postsToShow : selectedColumns,
      });
    };
    const columnsMobileCountOnChange = (selectedColumns) => {
      const { postsToShow } = attributes;
      setAttributes({
        columnsMobile: selectedColumns > postsToShow ? postsToShow : selectedColumns,
      });
    };
    const postsCountOnChange = (selectedPosts) => {
      const { columns } = attributes;
      const changedAttributes = { postsToShow: selectedPosts };
      if (columns > selectedPosts || (selectedPosts === 1 && columns !== 1)) {
        Object.assign(changedAttributes, { columns: selectedPosts });
      }
      setAttributes(changedAttributes);
    };
    // Font Weight Options
    const fontWeightOptions = [
      {
        value: "100",
        label: __("100", "responsive-block-editor-addons"),
      },
      {
        value: "200",
        label: __("200", "responsive-block-editor-addons"),
      },
      {
        value: "300",
        label: __("300", "responsive-block-editor-addons"),
      },
      {
        value: "400",
        label: __("400", "responsive-block-editor-addons"),
      },
      {
        value: "500",
        label: __("500", "responsive-block-editor-addons"),
      },
      {
        value: "600",
        label: __("600", "responsive-block-editor-addons"),
      },
      {
        value: "700",
        label: __("700", "responsive-block-editor-addons"),
      },
      {
        value: "800",
        label: __("800", "responsive-block-editor-addons"),
      },
      {
        value: "900",
        label: __("900", "responsive-block-editor-addons"),
      },
    ];
    // Post type options
    const postTypeOptions = [
      { value: "post", label: __("Post", "responsive-block-editor-addons") },
      { value: "page", label: __("Page", "responsive-block-editor-addons") },
    ];

    // Section title tags
    const sectionTags = [
      { value: "div", label: __("div", "responsive-block-editor-addons") },
      {
        value: "header",
        label: __("header", "responsive-block-editor-addons"),
      },
      {
        value: "section",
        label: __("section", "responsive-block-editor-addons"),
      },
      {
        value: "article",
        label: __("article", "responsive-block-editor-addons"),
      },
      { value: "main", label: __("main", "responsive-block-editor-addons") },
      { value: "aside", label: __("aside", "responsive-block-editor-addons") },
      {
        value: "footer",
        label: __("footer", "responsive-block-editor-addons"),
      },
    ];

    // Section title tags
    const sectionTitleTags = [
      { value: "h2", label: __("H2", "responsive-block-editor-addons") },
      { value: "h3", label: __("H3", "responsive-block-editor-addons") },
      { value: "h4", label: __("H4", "responsive-block-editor-addons") },
      { value: "h5", label: __("H5", "responsive-block-editor-addons") },
      { value: "h6", label: __("H6", "responsive-block-editor-addons") },
    ];

    // Check for posts
    const hasPosts = Array.isArray(latestPosts) && latestPosts.length;

    // Check the post type
    const isPost = "post" === attributes.postType;

    // Add instruction text to the select
    const abImageSizeSelect = {
      value: "selectimage",
      label: __("Select image size"),
    };

    // Get the image size options
    const imageSizeOptions = this.imageSizeSelect();

    imageSizeOptions.unshift(abImageSizeSelect);

    const imageSizeValue = () => {
      for (let i = 0; i < imageSizeOptions.length; i++) {
        if (imageSizeOptions[i].value === attributes.imageSize) {
          return attributes.imageSize;
        }
      }
      return "full";
    };

    return (
      <InspectorControls>
        <PanelBody
          title={__("General", "responsive-block-editor-addons")}
          initialOpen={false}
        >
          <Fragment>
            <ToggleControl
              label={__("Equal Height")}
              checked={equalHeight}
              onChange={(value) => setAttributes({ equalHeight: !equalHeight })}
            />
            <ToggleControl
              label={__("Featured Image", "responsive-block-editor-addons")}
              checked={attributes.displayPostImage}
              help={
                attributes.displayPostImage
                  ? __(
                      "Showing the featured image.",
                      "responsive-block-editor-addons"
                    )
                  : __(
                      "Toggle to show the featured image.",
                      "responsive-block-editor-addons"
                    )
              }
              onChange={() =>
                this.props.setAttributes({
                  displayPostImage: !attributes.displayPostImage,
                })
              }
            />
            <ToggleControl
              label={__("Post Title", "responsive-block-editor-addons")}
              checked={attributes.displayPostTitle}
              help={
                attributes.displayPostTitle
                  ? __(
                      "Showing the post title.",
                      "responsive-block-editor-addons"
                    )
                  : __(
                      "Toggle to show the post title.",
                      "responsive-block-editor-addons"
                    )
              }
              onChange={() =>
                this.props.setAttributes({
                  displayPostTitle: !attributes.displayPostTitle,
                })
              }
            />
            <ToggleControl
              label={__("Post Author", "responsive-block-editor-addons")}
              checked={attributes.displayPostAuthor}
              help={
                attributes.displayPostAuthor
                  ? __(
                      "Showing the post author.",
                      "responsive-block-editor-addons"
                    )
                  : __(
                      "Toggle to show the post author.",
                      "responsive-block-editor-addons"
                    )
              }
              onChange={() =>
                this.props.setAttributes({
                  displayPostAuthor: !attributes.displayPostAuthor,
                })
              }
            />
            <ToggleControl
              label={__("Post date", "responsive-block-editor-addons")}
              checked={attributes.displayPostDate}
              help={
                attributes.displayPostDate
                  ? __(
                      "Showing the publish date.",
                      "responsive-block-editor-addons"
                    )
                  : __(
                      "Toggle to show the publish date.",
                      "responsive-block-editor-addons"
                    )
              }
              onChange={() =>
                setAttributes({ displayPostDate: !displayPostDate })
              }
            />
            <ToggleControl
              label={__("Post Comments", "responsive-block-editor-addons")}
              checked={attributes.displayPostComment}
              help={
                attributes.displayPostComment
                  ? __(
                      "Showing the post comments.",
                      "responsive-block-editor-addons"
                    )
                  : __(
                      "Toggle to show the post comments.",
                      "responsive-block-editor-addons"
                    )
              }
              onChange={() =>
                setAttributes({ displayPostComment: !displayPostComment })
              }
            />
            <ToggleControl
              label={__("Post Taxonomy", "responsive-block-editor-addons")}
              checked={attributes.displayPostTaxonomy}
              help={
                attributes.displayPostTaxonomy
                  ? __(
                      "Showing the taxonomy.",
                      "responsive-block-editor-addons"
                    )
                  : __(
                      "Toggle to show the taxonomy.",
                      "responsive-block-editor-addons"
                    )
              }
              onChange={() =>
                setAttributes({ displayPostTaxonomy: !displayPostTaxonomy })
              }
            />
            <ToggleControl
              label={__("Post Excerpt", "responsive-block-editor-addons")}
              checked={attributes.displayPostExcerpt}
              help={
                attributes.displayPostExcerpt
                  ? __(
                      "Showing the post excerpt.",
                      "responsive-block-editor-addons"
                    )
                  : __(
                      "Toggle to show the post excerpt.",
                      "responsive-block-editor-addons"
                    )
              }
              onChange={() =>
                setAttributes({ displayPostExcerpt: !displayPostExcerpt })
              }
            />
            <ToggleControl
              label={__("Post Link", "responsive-block-editor-addons")}
              checked={attributes.displayPostLink}
              help={
                attributes.displayPostLink
                  ? __(
                      "Showing the post link.",
                      "responsive-block-editor-addons"
                    )
                  : __(
                      "Toggle to show the post link.",
                      "responsive-block-editor-addons"
                    )
              }
              onChange={() =>
                setAttributes({ displayPostLink: !displayPostLink })
              }
            />
            {attributes.displayPostExcerpt && (
              <RangeControl
                label={__("Excerpt Length", "responsive-block-editor-addons")}
                value={excerptLength}
                onChange={(value) => setAttributes({ excerptLength: value })}
                min={5}
                max={75}
              />
            )}
            <TabPanel
              className=" responsive-size-type-field-tabs  responsive-size-type-field__common-tabs  responsive-inline-margin"
              activeClass="active-tab"
              tabs={[
                {
                  name: "desktop",
                  title: <Dashicon icon="desktop" />,
                  className:
                    " responsive-desktop-tab  responsive-responsive-tabs",
                },
                {
                  name: "tablet",
                  title: <Dashicon icon="tablet" />,
                  className:
                    " responsive-tablet-tab  responsive-responsive-tabs",
                },
                {
                  name: "mobile",
                  title: <Dashicon icon="smartphone" />,
                  className:
                    " responsive-mobile-tab  responsive-responsive-tabs",
                },
              ]}
            >
              {(tab) => {
                let tabout;

                if ("mobile" === tab.name) {
                  tabout = (
                    <Fragment>
                      <RangeControl
                        label={__("Columns Mobile", "responsive-block-editor-addons")}
                        value={columnsMobile}
                        onChange={(value) => columnsMobileCountOnChange(value)}
                        min={1}
                        max={Math.min(4, postCount)}
                        required
                      />
                    </Fragment>
                  );
                } else if ("tablet" === tab.name) {
                  tabout = (
                    <Fragment>
                      <RangeControl
                        label={__("Columns Tablet", "responsive-block-editor-addons")}
                        value={columnsTablet}
                        onChange={(value) => columnsTabletCountOnChange(value)}
                        min={1}
                        max={Math.min(4, postCount)}
                        required
                      />
                    </Fragment>
                  );
                } else {
                  tabout = (
                    <Fragment>
                     <RangeControl
                      label={__("Columns", "responsive-block-editor-addons")}
                      value={columns}
                      onChange={(value) => columnsCountOnChange(value)}
                      min={1}
                      max={Math.min(4, postCount)}
                      required
                    />
                    </Fragment>
                  );
                }

                return <div>{tabout}</div>;
              }}
            </TabPanel>
            <QueryControls
              {...{ order, orderBy }}
              numberOfItems={attributes.postsToShow}
              categoriesList={categoriesList}
              selectedCategoryId={attributes.categories}
              onOrderChange={(value) => setAttributes({ order: value })}
              onOrderByChange={(value) => setAttributes({ orderBy: value })}
              onCategoryChange={(value) =>
                setAttributes({
                  categories: "" !== value ? value : undefined,
                })
              }
              onNumberOfItemsChange={(value) =>
                setAttributes({ postsToShow: value })
              }
            />
          </Fragment>
        </PanelBody>
        <PanelBody
          title={__("Carousel", "responsive-block-editor-addons")}
          initialOpen={false}
        >
          <ToggleControl
            label={__("Pause On Hover")}
            checked={pauseOnHover}
            onChange={this.togglePauseOnHover}
          />
          <ToggleControl
            label={__("Autoplay")}
            checked={autoplay}
            onChange={this.toggleAutoplay}
          />
          {autoplay == true && (
            <RangeControl
              label={__("Autoplay Speed (ms)")}
              value={autoplaySpeed}
              onChange={(value) => setAttributes({ autoplaySpeed: value })}
              min={100}
              max={10000}
            />
          )}
          <ToggleControl
            label={__("Infinite Loop")}
            checked={infiniteLoop}
            onChange={this.toggleInfiniteLoop}
          />
          <RangeControl
            label={__("Transition Speed (ms)")}
            value={transitionSpeed}
            onChange={(value) => setAttributes({ transitionSpeed: value })}
            min={100}
            max={5000}
          />
          <SelectControl
            label={__("Show Arrows & Dots")}
            value={arrowDots}
            onChange={(value) => setAttributes({ arrowDots: value })}
            options={[
              { value: "arrows", label: __("Only Arrows") },
              { value: "dots", label: __("Only Dots") },
              { value: "arrows_dots", label: __("Both Arrows & Dots") },
            ]}
          />
          {"dots" != arrowDots && (
            <Fragment>
              <RangeControl
                label={__("Arrow Size")}
                value={arrowSize}
                onChange={(value) => setAttributes({ arrowSize: value })}
                min={0}
                max={50}
              />
              <RangeControl
                label={__("Arrow Border Size")}
                value={arrowBorderSize}
                onChange={(value) => setAttributes({ arrowBorderSize: value })}
                min={0}
                max={50}
              />
              <RangeControl
                label={__("Arrow Border Radius")}
                value={arrowBorderRadius}
                onChange={(value) =>
                  setAttributes({ arrowBorderRadius: value })
                }
                min={0}
                max={50}
              />
            </Fragment>
          )}
        </PanelBody>
        <PanelBody
          title={__("Image Settings", "responsive-block-editor-addons")}
          initialOpen={false}
        >
          <SelectControl
            label={__("Image Size", "responsive-block-editor-addons")}
            value={imageSize}
            onChange={(value) => setAttributes({ imageSize: value })}
            options={[
              {
                value: "full",
                label: __("Full", "responsive-block-editor-addons"),
              },
              {
                value: "thumbnail",
                label: __("Thumbnail", "responsive-block-editor-addons"),
              },
            ]}
          />
          <SelectControl
            label={__("Image Position", "responsive-block-editor-addons")}
            value={imagePosition}
            onChange={(value) => setAttributes({ imagePosition: value })}
            options={[
              {
                value: "top",
                label: __("Top", "responsive-block-editor-addons"),
              },
              {
                value: "background",
                label: __("Background", "responsive-block-editor-addons"),
              },
            ]}
          />
          {imagePosition == "background" && (
            <RangeControl
              label={__("Opacity", "responsive-block-editor-addons")}
              value={opacity}
              onChange={(value) =>
                setAttributes({ opacity: value !== undefined ? value : 20 })
              }
              min={0}
              max={100}
              allowReset
            />
          )}
        </PanelBody>
        <PanelBody
          title={__("CTA Settings", "responsive-block-editor-addons")}
          initialOpen={false}
        >
          <TextControl
            label={__(
              "Customize Continue Reading Text",
              "responsive-block-editor-addons"
            )}
            type="text"
            value={readMoreText}
            onChange={(value) =>
              this.props.setAttributes({
                readMoreText: value,
              })
            }
          />
          <ToggleControl
            label={__("Open link in new tab")}
            checked={buttonTarget}
            onChange={() => {
              setAttributes({ buttonTarget: !buttonTarget });
            }}
          />
          <RangeControl
            label={__("Horizontal Padding")}
            value={ctaHpadding}
            onChange={(value) => setAttributes({ ctaHpadding: value })}
            min={0}
            max={100}
          />
          <RangeControl
            label={__("Vertical Padding")}
            value={ctaVpadding}
            onChange={(value) => setAttributes({ ctaVpadding: value })}
            min={0}
            max={100}
          />
          <PanelBody
            title={__("Border Settings", "responsive-block-editor-addons")}
            initialOpen={true}
          >
            <SelectControl
              label={__("Border Style", "responsive-block-editor-addons")}
              value={ctaBorderStyle}
              onChange={(value) => setAttributes({ ctaBorderStyle: value })}
              options={[
                {
                  value: "none",
                  label: __("None", "responsive-block-editor-addons"),
                },
                {
                  value: "solid",
                  label: __("Solid", "responsive-block-editor-addons"),
                },
                {
                  value: "dotted",
                  label: __("Dotted", "responsive-block-editor-addons"),
                },
                {
                  value: "dashed",
                  label: __("Dashed", "responsive-block-editor-addons"),
                },
                {
                  value: "double",
                  label: __("Double", "responsive-block-editor-addons"),
                },
                {
                  value: "groove",
                  label: __("Groove", "responsive-block-editor-addons"),
                },
                {
                  value: "inset",
                  label: __("Inset", "responsive-block-editor-addons"),
                },
                {
                  value: "outset",
                  label: __("Outset", "responsive-block-editor-addons"),
                },
                {
                  value: "ridge",
                  label: __("Ridge", "responsive-block-editor-addons"),
                },
              ]}
            />
            {"none" != ctaBorderStyle && (
              <Fragment>
                <RangeControl
                  label={__("Border Width", "responsive-block-editor-addons")}
                  value={ctaBorderWidth}
                  onChange={(value) =>
                    setAttributes({
                      ctaBorderWidth: value !== undefined ? value : 2,
                    })
                  }
                  min={0}
                  max={50}
                  allowReset
                />
                <Fragment>
                  <p>
                    {__("Border Color", "responsive-block-editor-addons")}
                    <span className="components-base-control__label">
                      <span
                        className="component-color-indicator"
                        style={{ backgroundColor: ctaBorderColor }}
                      ></span>
                    </span>
                  </p>
                  <ColorPalette
                    value={ctaBorderColor}
                    onChange={(colorValue) =>
                      setAttributes({
                        ctaBorderColor:
                          colorValue !== undefined ? colorValue : "#000",
                      })
                    }
                    allowReset
                  />
                </Fragment>

                <RangeControl
                  label={__("Border Radius", "responsive-block-editor-addons")}
                  value={ctaBorderRadius}
                  onChange={(value) =>
                    setAttributes({
                      ctaBorderRadius: value !== undefined ? value : "",
                    })
                  }
                  min={0}
                  max={100}
                  allowReset
                />
              </Fragment>
            )}
          </PanelBody>
          <PanelBody
            title={__("Color Settings", "responsive-block-editor-addons")}
            initialOpen={true}
          >
            <p className="responsive-setting-label">
              {__("Text Color")}
              <span className="components-base-control__label">
                <span
                  className="component-color-indicator"
                  style={{
                    backgroundColor: ctaColor,
                  }}
                ></span>
              </span>
            </p>
            <ColorPalette
              value={ctaColor}
              onChange={(value) =>
                this.props.setAttributes({
                  ctaColor: value,
                })
              }
              allowReset
            />
            <p className="responsive-setting-label">
              {__("Background Color")}
              <span className="components-base-control__label">
                <span
                  className="component-color-indicator"
                  style={{
                    backgroundColor: ctaBackColor,
                  }}
                ></span>
              </span>
            </p>
            <ColorPalette
              value={ctaBackColor}
              onChange={(value) =>
                this.props.setAttributes({
                  ctaBackColor: value,
                })
              }
              allowReset
            />
            <Fragment>
              <p>
                {__("Border Color", "responsive-block-editor-addons")}
                <span className="components-base-control__label">
                  <span
                    className="component-color-indicator"
                    style={{ backgroundColor: ctaBorderColor }}
                  ></span>
                </span>
              </p>
              <ColorPalette
                value={ctaBorderColor}
                onChange={(colorValue) =>
                  setAttributes({
                    ctaBorderColor:
                      colorValue !== undefined ? colorValue : "#000",
                  })
                }
                allowReset
              />
            </Fragment>

            <p className="responsive-setting-label">
              {__("Hover Color")}
              <span className="components-base-control__label">
                <span
                  className="component-color-indicator"
                  style={{
                    backgroundColor: ctaHoverColor,
                  }}
                ></span>
              </span>
            </p>
            <ColorPalette
              value={ctaHoverColor}
              onChange={(value) =>
                this.props.setAttributes({
                  ctaHoverColor: value,
                })
              }
              allowReset
            />
            <p className="responsive-setting-label">
              {__("Hover Background Color")}
              <span className="components-base-control__label">
                <span
                  className="component-color-indicator"
                  style={{
                    backgroundColor: ctaHoverBackColor,
                  }}
                ></span>
              </span>
            </p>
            <ColorPalette
              value={ctaHoverBackColor}
              onChange={(value) =>
                this.props.setAttributes({
                  ctaHoverBackColor: value,
                })
              }
              allowReset
            />
            <Fragment>
              <p>
                {__("Hover Border Color", "responsive-block-editor-addons")}
                <span className="components-base-control__label">
                  <span
                    className="component-color-indicator"
                    style={{ backgroundColor: ctaHoverBorderColor }}
                  ></span>
                </span>
              </p>
              <ColorPalette
                value={ctaHoverBorderColor}
                onChange={(colorValue) =>
                  setAttributes({
                    ctaHoverBorderColor:
                      colorValue !== undefined ? colorValue : "",
                  })
                }
                allowReset
              />
            </Fragment>
          </PanelBody>
        </PanelBody>
        <PanelBody
          title={__("Typography", "responsive-block-editor-addons")}
          initialOpen={false}
        >
          <PanelBody
            title={__("Title Typography", "responsive-block-editor-addons")}
            initialOpen={false}
          >
            <SelectControl
              label={__("Font Family", "responsive-block-editor-addons")}
              options={fontOptions}
              value={titleFontFamily}
              onChange={(value) => {
                setAttributes({
                  titleFontFamily: value,
                }),
                  loadGoogleFont(value);
              }}
            />
            <TabPanel
              className=" responsive-size-type-field-tabs  responsive-size-type-field__common-tabs  responsive-inline-margin"
              activeClass="active-tab"
              tabs={[
                {
                  name: "desktop",
                  title: <Dashicon icon="desktop" />,
                  className:
                    " responsive-desktop-tab  responsive-responsive-tabs",
                },
                {
                  name: "tablet",
                  title: <Dashicon icon="tablet" />,
                  className:
                    " responsive-tablet-tab  responsive-responsive-tabs",
                },
                {
                  name: "mobile",
                  title: <Dashicon icon="smartphone" />,
                  className:
                    " responsive-mobile-tab  responsive-responsive-tabs",
                },
              ]}
            >
              {(tab) => {
                let tabout;

                if ("mobile" === tab.name) {
                  tabout = (
                    <Fragment>
                      <RangeControl
                        label={__(
                          "Font Size",
                          "responsive-block-editor-addons"
                        )}
                        min={0}
                        max={500}
                        value={titleFontSizeMobile}
                        onChange={(value) =>
                          setAttributes({
                            titleFontSizeMobile: value,
                          })
                        }
                      />
                    </Fragment>
                  );
                } else if ("tablet" === tab.name) {
                  tabout = (
                    <Fragment>
                      <RangeControl
                        label={__(
                          "Font Size",
                          "responsive-block-editor-addons"
                        )}
                        min={0}
                        max={500}
                        value={titleFontSizeTablet}
                        onChange={(value) =>
                          setAttributes({
                            titleFontSizeTablet: value,
                          })
                        }
                      />
                    </Fragment>
                  );
                } else {
                  tabout = (
                    <Fragment>
                      <RangeControl
                        label={__(
                          "Font Size",
                          "responsive-block-editor-addons"
                        )}
                        min={0}
                        max={500}
                        value={titleFontSize}
                        onChange={(value) =>
                          setAttributes({
                            titleFontSize: value,
                          })
                        }
                      />
                    </Fragment>
                  );
                }

                return <div>{tabout}</div>;
              }}
            </TabPanel>
            <SelectControl
              label={__("Font Weight", "responsive-block-editor-addons")}
              options={fontWeightOptions}
              value={titleFontWeight}
              onChange={(value) =>
                this.props.setAttributes({
                  titleFontWeight: value,
                })
              }
            />
            <RangeControl
              label={__("Line Height", "responsive-block-editor-addons")}
              value={titleLineHeight}
              onChange={(value) =>
                this.props.setAttributes({
                  titleLineHeight: value !== undefined ? value : 1,
                })
              }
              min={0}
              max={100}
              step={1}
              allowReset
            />
          </PanelBody>
          <PanelBody
            title={__("Meta Typography", "responsive-block-editor-addons")}
            initialOpen={false}
          >
            <SelectControl
              label={__("Font Family", "responsive-block-editor-addons")}
              options={fontOptions}
              value={metaFontFamily}
              onChange={(value) => {
                setAttributes({
                  metaFontFamily: value,
                }),
                  loadGoogleFont(value);
              }}
            />
            <RangeControl
              label={__("Font Size", "responsive-block-editor-addons")}
              value={metaFontSize}
              onChange={(value) =>
                this.props.setAttributes({
                  metaFontSize: value !== undefined ? value : "",
                })
              }
              min={0}
              max={100}
              step={1}
              allowReset
            />
            <SelectControl
              label={__("Font Weight", "responsive-block-editor-addons")}
              options={fontWeightOptions}
              value={metaFontWeight}
              onChange={(value) =>
                this.props.setAttributes({
                  metaFontWeight: value,
                })
              }
            />
            <RangeControl
              label={__("Line Height", "responsive-block-editor-addons")}
              value={metaLineHeight}
              onChange={(value) =>
                this.props.setAttributes({
                  metaLineHeight: value !== undefined ? value : 1,
                })
              }
              min={0}
              max={100}
              step={1}
              allowReset
            />
          </PanelBody>
          <PanelBody
            title={__("Excerpt Typography", "responsive-block-editor-addons")}
            initialOpen={false}
          >
            <SelectControl
              label={__("Font Family", "responsive-block-editor-addons")}
              options={fontOptions}
              value={excerptFontFamily}
              onChange={(value) => {
                setAttributes({
                  excerptFontFamily: value,
                }),
                  loadGoogleFont(value);
              }}
            />
            <RangeControl
              label={__("Font Size", "responsive-block-editor-addons")}
              value={excerptFontSize}
              onChange={(value) =>
                this.props.setAttributes({
                  excerptFontSize: value !== undefined ? value : "",
                })
              }
              min={0}
              max={100}
              step={1}
              allowReset
            />
            <SelectControl
              label={__("Font Weight", "responsive-block-editor-addons")}
              options={fontWeightOptions}
              value={excerptFontWeight}
              onChange={(value) =>
                this.props.setAttributes({
                  excerptFontWeight: value,
                })
              }
            />
            <RangeControl
              label={__("Line Height", "responsive-block-editor-addons")}
              value={excerptLineHeight}
              onChange={(value) =>
                this.props.setAttributes({
                  excerptLineHeight: value !== undefined ? value : 1,
                })
              }
              min={0}
              max={100}
              step={1}
              allowReset
            />
          </PanelBody>
          <PanelBody
            title={__("CTA Typography", "responsive-block-editor-addons")}
            initialOpen={false}
          >
            <SelectControl
              label={__("Font Family", "responsive-block-editor-addons")}
              options={fontOptions}
              value={ctaFontFamily}
              onChange={(value) => {
                setAttributes({
                  ctaFontFamily: value,
                }),
                  loadGoogleFont(value);
              }}
            />
            <RangeControl
              label={__("Font Size", "responsive-block-editor-addons")}
              value={ctaFontSize}
              onChange={(value) =>
                this.props.setAttributes({
                  ctaFontSize: value !== undefined ? value : "",
                })
              }
              min={0}
              max={100}
              step={1}
              allowReset
            />
            <SelectControl
              label={__("Font Weight", "responsive-block-editor-addons")}
              options={fontWeightOptions}
              value={ctaFontWeight}
              onChange={(value) =>
                this.props.setAttributes({
                  ctaFontWeight: value,
                })
              }
            />
            <RangeControl
              label={__("Line Height", "responsive-block-editor-addons")}
              value={ctaLineHeight}
              onChange={(value) =>
                this.props.setAttributes({
                  ctaLineHeight: value !== undefined ? value : 1,
                })
              }
              min={0}
              max={100}
              step={1}
              allowReset
            />
          </PanelBody>
        </PanelBody>
        <PanelBody
          title={__("Spacing", "responsive-block-editor-addons")}
          initialOpen={false}
        >
          <RangeControl
            label={__("Content Padding", "responsive-block-editor-addons")}
            value={contentPadding}
            onChange={(value) =>
              setAttributes({
                contentPadding: value !== undefined ? value : 20,
              })
            }
            min={0}
            max={500}
            allowReset
          />
          <RangeControl
            label={__(
              "Content Padding Mobile",
              "responsive-block-editor-addons"
            )}
            value={contentPaddingMobile}
            onChange={(value) =>
              setAttributes({
                contentPaddingMobile: value !== undefined ? value : 20,
              })
            }
            min={0}
            max={500}
            allowReset
          />
          <RangeControl
            label={__("Gap Between Content & Dots")}
            value={rowGap}
            onChange={(value) =>
              setAttributes({ rowGap: value !== undefined ? value : 20 })
            }
            min={0}
            max={50}
            allowReset
          />
          <RangeControl
            label={__("Column Gap")}
            value={columnGap}
            onChange={(value) =>
              setAttributes({ columnGap: value !== undefined ? value : 20 })
            }
            min={0}
            max={50}
            allowReset
          />
          <RangeControl
            label={__("Title Top Margin")}
            value={imageSpace}
            onChange={(value) =>
              setAttributes({ imageSpace: value !== undefined ? value : "" })
            }
            min={0}
            max={50}
            allowReset
          />
          <RangeControl
            label={__("Title Bottom Margin")}
            value={titleSpace}
            onChange={(value) =>
              setAttributes({ titleSpace: value !== undefined ? value : "" })
            }
            min={0}
            max={50}
            allowReset
          />
          <RangeControl
            label={__("Meta Bottom Margin")}
            value={dateSpace}
            onChange={(value) =>
              setAttributes({ dateSpace: value !== undefined ? value : "" })
            }
            min={0}
            max={50}
            allowReset
          />
          <RangeControl
            label={__("Excerpt Bottom Margin")}
            value={excerptSpace}
            onChange={(value) =>
              setAttributes({ excerptSpace: value !== undefined ? value : "" })
            }
            min={0}
            max={50}
            allowReset
          />
          <RangeControl
            label={__("CTA Bottom Margin")}
            value={ctaSpace}
            onChange={(value) =>
              setAttributes({ ctaSpace: value !== undefined ? value : "" })
            }
            min={0}
            max={50}
            allowReset
          />
        </PanelBody>

        <PanelBody
          title={__("Color Settings", "responsive-block-editor-addons")}
          initialOpen={false}
        >
          <p className="responsive-setting-label">
            {__("Blog Post Background Color")}
            <span className="components-base-control__label">
              <span
                className="component-color-indicator"
                style={{ backgroundColor: attributes.bgColor }}
              ></span>
            </span>
          </p>
          <ColorPalette
            value={attributes.bgColor}
            onChange={(value) =>
              this.props.setAttributes({
                bgColor: value,
              })
            }
            allowReset
          />
          <p className="responsive-setting-label">
            {__("Title Color")}
            <span className="components-base-control__label">
              <span
                className="component-color-indicator"
                style={{
                  backgroundColor: titleColor,
                }}
              ></span>
            </span>
          </p>
          <ColorPalette
            value={titleColor}
            onChange={(value) =>
              this.props.setAttributes({
                titleColor: value,
              })
            }
            allowReset
          />
          <p className="responsive-setting-label">
            {__("Content Color")}
            <span className="components-base-control__label">
              <span
                className="component-color-indicator"
                style={{
                  backgroundColor: contentColor,
                }}
              ></span>
            </span>
          </p>
          <ColorPalette
            value={contentColor}
            onChange={(value) =>
              this.props.setAttributes({
                contentColor: value,
              })
            }
            allowReset
          />
          <p className="responsive-setting-label">
            {__("Meta Color")}
            <span className="components-base-control__label">
              <span
                className="component-color-indicator"
                style={{
                  backgroundColor: metaColor,
                }}
              ></span>
            </span>
          </p>
          <ColorPalette
            value={metaColor}
            onChange={(value) =>
              this.props.setAttributes({
                metaColor: value,
              })
            }
            allowReset
          />
          <p className="responsive-setting-label">
            {__("Arrow & Dots Color")}
            <span className="components-base-control__label">
              <span
                className="component-color-indicator"
                style={{
                  backgroundColor: arrowDotsColor,
                }}
              ></span>
            </span>
          </p>
          <ColorPalette
            value={arrowDotsColor}
            onChange={(value) =>
              this.props.setAttributes({
                arrowDotsColor: value,
              })
            }
            allowReset
          />
        </PanelBody>
      </InspectorControls>
    );
  }
}
