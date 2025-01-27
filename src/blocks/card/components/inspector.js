/**
 * Inspector Controls
 */

import times from "lodash/times";
import BoxShadowControl from "../../../utils/components/box-shadow";
import FontIconPicker from "@fonticonpicker/react-fonticonpicker";
import ResponsiveBlocksIcon from "../../../ResponsiveBlocksIcon.json";
import renderSVG from "../../../renderIcon";
import fontOptions from "../../../utils/googlefonts";
import { loadGoogleFont } from "../../../utils/font";

// Setup the block
const { __ } = wp.i18n;
const { Component, Fragment } = wp.element;

// Import block components
const {
  InspectorControls,
  PanelColorSettings,
  MediaUpload,
  ColorPalette,
} = wp.editor;

// Import Inspector components
const {
  PanelBody,
  RangeControl,
  SelectControl,
  ToggleControl,
  BaseControl,
  Button,
} = wp.components;

let svg_icons = Object.keys(ResponsiveBlocksIcon);

/**
 * Create an Inspector Controls wrapper Component
 */
export default class Inspector extends Component {
  constructor(props) {
    super(...arguments);
    this.onSelectImage = this.onSelectImage.bind(this);
    this.onRemoveImage = this.onRemoveImage.bind(this);

    this.onSelectImageOne = this.onSelectImageOne.bind(this);
    this.onRemoveImageOne = this.onRemoveImageOne.bind(this);

    this.onRemoveImageTwo = this.onRemoveImageTwo.bind(this);
    this.onSelectImageTwo = this.onSelectImageTwo.bind(this);

    this.onRemoveImageThree = this.onRemoveImageThree.bind(this);
    this.onSelectImageThree = this.onSelectImageThree.bind(this);

    this.onRemoveImageFour = this.onRemoveImageFour.bind(this);
    this.onSelectImageFour = this.onSelectImageFour.bind(this);
  }
  /*
   * Event to set Image as while adding.
   */
  onSelectTestImage(media, index) {
    const { cardsArray } = this.props.attributes;
    const { setAttributes } = this.props;

    let imag_url = null;
    if (!media || !media.url) {
      imag_url = null;
    } else {
      imag_url = media;
    }

    if (!media.type || "image" !== media.type) {
      imag_url = null;
    }

    const newItems = cardsArray.map((item, thisIndex) => {
      if (index === thisIndex) {
        (item["image"] = imag_url), (item["imageUrl"] = imag_url);
      }
      return item;
    });

    setAttributes({
      cardsArray: newItems,
    });
  }

  /*
   * Event to set Image as null while removing.
   */
  onRemoveTestImage(index) {
    const { cardsArray } = this.props.attributes;
    const { setAttributes } = this.props;

    const newItems = cardsArray.map((item, thisIndex) => {
      if (index === thisIndex) {
        item["image"] = null;
      }
      return item;
    });

    setAttributes({
      cardsArray: newItems,
    });
  }

  /*
   * Event to set Image selectot label.
   */
  getImageName(image) {
    const { cardsArray } = this.props.attributes;

    let image_name = __("Select Image");
    if (image) {
      if (image.url == null || image.url == "") {
        image_name = __("Select Image");
      } else {
        image_name = __("Replace Image");
      }
    }
    return image_name;
  }

  /*
   * Event to set Image as null while removing.
   */
  onRemoveImage() {
    const { setAttributes } = this.props;

    setAttributes({ backgroundImage: null });
  }

  /*
   * Event to set Image as while adding.
   */
  onSelectImage(media) {
    const { setAttributes } = this.props;

    if (!media || !media.url) {
      setAttributes({ backgroundImage: null });
      return;
    }

    if (!media.type || "image" != media.type) {
      return;
    }

    setAttributes({ backgroundImage: media });
  }

    /*
      * Event to set Image as null while removing.
    */
    onRemoveImageOne() {
       const { setAttributes } = this.props;
   
       setAttributes({ backgroundImageOne: null });
     }
   
     /*
     * Event to set Image as while adding.
     */
     onSelectImageOne(media) {
       const { setAttributes } = this.props;
       const { backgroundImageOne } = this.props.attributes;
   
       if (!media || !media.url) {
         setAttributes({ backgroundImageOne: null });
         return;
       }
   
       if (!media.type || "image" != media.type) {
         return;
       }
   
       setAttributes({ backgroundImageOne: media.url });
     }
   
     onRemoveImageTwo() {
       const { setAttributes } = this.props;
   
       setAttributes({ backgroundImageTwo: null });
     }
   
     onSelectImageTwo(media) {
       const { setAttributes } = this.props;
       const { backgroundImageTwo } = this.props.attributes;
   
       if (!media || !media.url) {
         setAttributes({ backgroundImageTwo: null });
         return;
       }
   
       if (!media.type || "image" != media.type) {
         return;
       }
   
       setAttributes({ backgroundImageTwo: media.url });
     }
   
     onRemoveImageThree() {
       const { setAttributes } = this.props;
   
       setAttributes({ backgroundImageThree: null });
     }
   
     onSelectImageThree(media) {
       const { setAttributes } = this.props;
       const { backgroundImageThree } = this.props.attributes;
   
       if (!media || !media.url) {
         setAttributes({ backgroundImageThree: null });
         return;
       }
   
       if (!media.type || "image" != media.type) {
         return;
       }
   
       setAttributes({ backgroundImageThree: media.url });
     }
   
     onRemoveImageFour() {
       const { setAttributes } = this.props;
   
       setAttributes({ backgroundImageFour: null });
     }
   
     onSelectImageFour(media) {
       const { setAttributes } = this.props;
       const { backgroundImageFour } = this.props.attributes;
   
       if (!media || !media.url) {
         setAttributes({ backgroundImageFour: null });
         return;
       }
   
       if (!media.type || "image" != media.type) {
         return;
       }
   
       setAttributes({ backgroundImageFour: media.url });
     }
   
  render() {
    // Setup the attributes
    const {
      attributes: {
        count,
        gutter,
        cardsArray,
        textColor,
        itemBackgroundColor,
        buttonTarget,
        borderStyle,
        borderWidth,
        borderRadius,
        borderColor,
        boxShadowColor,
        boxShadowHOffset,
        boxShadowVOffset,
        boxShadowBlur,
        boxShadowSpread,
        boxShadowPosition,
        titleSpace,
        subtitleSpace,
        contentSpace,
        buttonSpace,
        buttonColor,
        buttonTextColor,
        stack,
        opacity,
        resshowImage,
        imageopacity,
        backgroundType,
        backgroundImage,
        gradientDirection,
        colorLocation1,
        colorLocation2,
        backgroundColor1,
        backgroundColor2,
        imageSize,
        imagePosition,
        imageRepeat,
        thumbsize,
        imageheight,
        blockzindex,
        blockmargin,
        icon,
        iconPosition,
        icon_color,
        buttonhColor,
        buttonhTextColor,
        butopacity,
        vPadding,
        hPadding,
        vMargin,
        hMargin,
        butborderWidth,
        butborderRadius,
        butborderStyle,
        buttonSize,
        buttonbackgroundType,
        buttongradientDirection,
        buttoncolorLocation1,
        buttoncolorLocation2,
        buttonbackgroundColor1,
        buttonbackgroundColor2,
        icon_hcolor,
        subFontFamily,
        subLineHeight,
        subFontWeight,
        subFontSize,
        headingFontFamily,
        headingLineHeight,
        headingFontWeight,
        headingFontSize,
        contentFontFamily,
        contentLineHeight,
        contentFontWeight,
        contentFontSize,
        contenttopSpace,
        blockbotmargin,
        blockleftmargin,
        blockrightmargin,
        bgimageSize,
        bgimagePosition,
        bgimageRepeat,
        bgthumbsize,
        backgroundImageOne,
        backgroundImageTwo,
        backgroundImageThree,
        backgroundImageFour,
      },
      setAttributes,
    } = this.props;

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

    // Button size values
    const buttonSizeOptions = [
      {
        value: "responsive-block-editor-addons-button-size-small",
        label: __("Small"),
      },
      {
        value: "responsive-block-editor-addons-button-size-medium",
        label: __("Medium"),
      },
      {
        value: "responsive-block-editor-addons-button-size-large",
        label: __("Large"),
      },
      {
        value: "responsive-block-editor-addons-button-size-extralarge",
        label: __("Extra Large"),
      },
    ];

    // Background Type Options
    const buttonbackgroundTypeOptions = [
      { value: "none", label: __("None", "responsive-block-editor-addons") },
      { value: "color", label: __("Color", "responsive-block-editor-addons") },
      {
        value: "gradient",
        label: __("Gradient", "responsive-block-editor-addons"),
      },
    ];
    // Image Size Options
    const imageSizeOptions = [
      {
        value: "thumbnail",
        label: __("Thumbnail", "responsive-block-editor-addons"),
      },
      {
        value: "medium",
        label: __("Medium", "responsive-block-editor-addons"),
      },
      { value: "large", label: __("Large", "responsive-block-editor-addons") },
      { value: "full", label: __("Full", "responsive-block-editor-addons") },
    ];

    const tmControls = (index) => {
      let image_val = null;
      if (cardsArray[index] && typeof cardsArray[index] !== "undefined") {
        image_val = cardsArray[index]["image"];
      }
      return (
        <PanelBody
          key={index}
          title={__("Image") + " " + (index + 1) + " " + __("Settings")}
          initialOpen={true}
          className={"rbea-repeater-panel"}
        >
          <BaseControl className="editor-bg-image-control" label={__("")}>
            <MediaUpload
              title={__("Select Image" + (index + 1))}
              onSelect={(media) => {
                this.onSelectTestImage(media, index);
              }}
              allowedTypes={["image"]}
              value={image_val}
              render={({ open }) => (
                <Button isDefault onClick={open}>
                  {this.getImageName(cardsArray[index]["image"])}
                </Button>
              )}
            />
            {image_val &&
              cardsArray[index]["image"].url !== null &&
              cardsArray[index]["image"].url !== "" && (
                <Button
                  className="rbea-rm-btn"
                  key={index}
                  onClick={(value) => {
                    this.onRemoveTestImage(index);
                  }}
                  isLink
                  isDestructive
                >
                  {__("Remove Image")}
                </Button>
              )}
          </BaseControl>
        </PanelBody>
      );
    };

    // Update color value
    const onChangeTextColor = (value) => setAttributes({ textColor: value });
    const onChangeBackgroundColor = (value) =>
      setAttributes({ itemBackgroundColor: value });

    // Background Type Options
    const backgroundTypeOptions = [
      { value: "none", label: __("None", "responsive-block-editor-addons") },
      { value: "color", label: __("Color", "responsive-block-editor-addons") },
      {
        value: "gradient",
        label: __("Gradient", "responsive-block-editor-addons"),
      },
      { value: "image", label: __("Image", "responsive-block-editor-addons") },
    ];

    return (
      <InspectorControls key="inspector">
        <PanelBody
          title={__("General", "responsive-block-editor-addons")}
          initialOpen={false}
        >
          <RangeControl
            label={__("Number of Cards", "responsive-block-editor-addons")}
            value={count}
            onChange={(newCount) => {
              let clonecardsArray = [...cardsArray];
              if (clonecardsArray.length < newCount) {
                const incsubtitle = Math.abs(newCount - clonecardsArray.length);

                {
                  times(incsubtitle, (n) => {
                    clonecardsArray.push({
                      title: "Title ",
                      subtitle: "Subtitle",
                      content:
                        "Description for this block. Use this space for describing your block. Any text will do. Description for this block. You can use this space for describing your block.",
                      button: "Button" + newCount,
                    });
                  });
                }
                setAttributes({ cardsArray: clonecardsArray });
              } else {
                const incsubtitle = Math.abs(newCount - clonecardsArray.length);
                let data_new = clonecardsArray;
                for (var i = 0; i < incsubtitle; i++) {
                  data_new.pop();
                }
                setAttributes({ cardsArray: data_new });
              }
              setAttributes({ count: newCount });
            }}
            min={1}
            max={4}
            step={1}
          />
          <SelectControl
            label={__("Stack on", "responsive-block-editor-addons")}
            value={stack}
            options={[
              {
                value: "none",
                label: __("None", "responsive-block-editor-addons"),
              },
              {
                value: "tablet",
                label: __("Tablet", "responsive-block-editor-addons"),
              },
              {
                value: "mobile",
                label: __("Mobile", "responsive-block-editor-addons"),
              },
            ]}
            onChange={(value) => setAttributes({ stack: value })}
            help={__(
              "Note: Choose on what breakpoint the columns will stack.",
              "responsive-block-editor-addons"
            )}
          />
          <RangeControl
            label={__("Z-Index", "responsive-block-editor-addons")}
            value={blockzindex}
            onChange={(value) =>
              setAttributes({ blockzindex: value !== undefined ? value : 1 })
            }
            min={0}
            max={9999}
            allowReset
          />
        </PanelBody>
        <PanelBody
          title={__("Image", "responsive-block-editor-addons")}
          initialOpen={false}
        >
          <ToggleControl
            label={__("Enable Image", "responsive-block-editor-addons")}
            checked={resshowImage}
            onChange={(value) => setAttributes({ resshowImage: !resshowImage })}
          />
          {resshowImage && (
            <Fragment>
              <BaseControl
                className="editor-bg-image-control"
                label={__(
                  "Image 1 Settings",
                  "responsive-block-editor-addons"
                )}
              >
                <MediaUpload
                  title={__(
                    "Select Background Image",
                    "responsive-block-editor-addons"
                  )}
                  onSelect={this.onSelectImageOne}
                  allowedTypes={["image"]}
                  value={backgroundImageOne}
                  render={({ open }) => (
                    <Button isDefault onClick={open}>
                      {!backgroundImageOne
                        ? __(
                            "Select Background Image",
                            "responsive-block-editor-addons"
                          )
                        : __("Replace image", "responsive-block-editor-addons")}
                    </Button>
                  )}
                />
                {backgroundImageOne && (
                  <Button
                    className="rbea-rm-btn"
                    onClick={this.onRemoveImageOne}
                    isLink
                    isDestructive
                  >
                    {__("Remove Image", "responsive-block-editor-addons")}
                  </Button>
                )}
              </BaseControl>
              {count >1 && (<BaseControl
                className="editor-bg-image-control"
                label={__(
                  "Image 2 Settings",
                  "responsive-block-editor-addons"
                )}
              >
                <MediaUpload
                  title={__(
                    "Select Background Image",
                    "responsive-block-editor-addons"
                  )}
                  onSelect={this.onSelectImageTwo}
                  allowedTypes={["image"]}
                  value={backgroundImageTwo}
                  render={({ open }) => (
                    <Button isDefault onClick={open}>
                      {!backgroundImageTwo
                        ? __(
                            "Select Background Image",
                            "responsive-block-editor-addons"
                          )
                        : __("Replace image", "responsive-block-editor-addons")}
                    </Button>
                  )}
                />
                {backgroundImageTwo && (
                  <Button
                    className="rbea-rm-btn"
                    onClick={this.onRemoveImageTwo}
                    isLink
                    isDestructive
                  >
                    {__("Remove Image", "responsive-block-editor-addons")}
                  </Button>
                )}
              </BaseControl>)}
              {(count === 3 || count ===4) && (<BaseControl
                className="editor-bg-image-control"
                label={__(
                  "Image 3 Settings",
                  "responsive-block-editor-addons"
                )}
              >
                <MediaUpload
                  title={__(
                    "Select Background Image",
                    "responsive-block-editor-addons"
                  )}
                  onSelect={this.onSelectImageThree}
                  allowedTypes={["image"]}
                  value={backgroundImageThree}
                  render={({ open }) => (
                    <Button isDefault onClick={open}>
                      {!backgroundImageThree
                        ? __(
                            "Select Background Image",
                            "responsive-block-editor-addons"
                          )
                        : __("Replace image", "responsive-block-editor-addons")}
                    </Button>
                  )}
                />
                {backgroundImageThree && (
                  <Button
                    className="rbea-rm-btn"
                    onClick={this.onRemoveImageThree}
                    isLink
                    isDestructive
                  >
                    {__("Remove Image", "responsive-block-editor-addons")}
                  </Button>
                )}
              </BaseControl>)}
              {count ===4 && (<BaseControl
                className="editor-bg-image-control"
                label={__(
                  "Image 4 Settings",
                  "responsive-block-editor-addons"
                )}
              >
                <MediaUpload
                  title={__(
                    "Select Background Image",
                    "responsive-block-editor-addons"
                  )}
                  onSelect={this.onSelectImageFour}
                  allowedTypes={["image"]}
                  value={backgroundImageFour}
                  render={({ open }) => (
                    <Button isDefault onClick={open}>
                      {!backgroundImageFour
                        ? __(
                            "Select Background Image",
                            "responsive-block-editor-addons"
                          )
                        : __("Replace image", "responsive-block-editor-addons")}
                    </Button>
                  )}
                />
                {backgroundImageFour && (
                  <Button
                    className="rbea-rm-btn"
                    onClick={this.onRemoveImageFour}
                    isLink
                    isDestructive
                  >
                    {__("Remove Image", "responsive-block-editor-addons")}
                  </Button>
                )}
              </BaseControl>)}
            </Fragment>
        )}
        </PanelBody>
        {resshowImage && (
          <PanelBody
            title={__("Image Settings", "responsive-block-editor-addons")}
            initialOpen={false}
          >
            <SelectControl
              label={__("Image Size", "responsive-block-editor-addons")}
              value={imageSize}
              onChange={(value) => setAttributes({ imageSize: value })}
              options={imageSizeOptions}
            />

            <SelectControl
              label={__("Image Position", "responsive-block-editor-addons")}
              value={imagePosition}
              onChange={(value) => setAttributes({ imagePosition: value })}
              options={[
                {
                  value: "top left",
                  label: __("Top Left", "responsive-block-editor-addons"),
                },
                {
                  value: "top center",
                  label: __("Top Center", "responsive-block-editor-addons"),
                },
                {
                  value: "top right",
                  label: __("Top Right", "responsive-block-editor-addons"),
                },
                {
                  value: "center left",
                  label: __("Center Left", "responsive-block-editor-addons"),
                },
                {
                  value: "center center",
                  label: __("Center Center", "responsive-block-editor-addons"),
                },
                {
                  value: "center right",
                  label: __("Center Right", "responsive-block-editor-addons"),
                },
                {
                  value: "bottom left",
                  label: __("Bottom Left", "responsive-block-editor-addons"),
                },
                {
                  value: "bottom center",
                  label: __("Bottom Center", "responsive-block-editor-addons"),
                },
                {
                  value: "bottom right",
                  label: __("Bottom Right", "responsive-block-editor-addons"),
                },
              ]}
            />
            <SelectControl
              label={__("Image Repeat", "responsive-block-editor-addons")}
              value={imageRepeat}
              onChange={(value) => setAttributes({ imageRepeat: value })}
              options={[
                {
                  value: "no-repeat",
                  label: __("No Repeat", "responsive-block-editor-addons"),
                },
                {
                  value: "repeat",
                  label: __("Repeat", "responsive-block-editor-addons"),
                },
                {
                  value: "repeat-x",
                  label: __("Repeat-X", "responsive-block-editor-addons"),
                },
                {
                  value: "repeat-y",
                  label: __("Repeat-Y", "responsive-block-editor-addons"),
                },
              ]}
            />
            <SelectControl
              label={__("Image Size", "responsive-block-editor-addons")}
              value={thumbsize}
              onChange={(value) => setAttributes({ thumbsize: value })}
              options={[
                {
                  value: "cover",
                  label: __("Cover", "responsive-block-editor-addons"),
                },
                {
                  value: "auto",
                  label: __("Auto", "responsive-block-editor-addons"),
                },
                {
                  value: "contain",
                  label: __("Contain", "responsive-block-editor-addons"),
                },
              ]}
            />
            <RangeControl
              label={__("Custom Height", "responsive-block-editor-addons")}
              value={imageheight}
              onChange={(value) =>
                setAttributes({
                  imageheight: value !== undefined ? value : 200,
                })
              }
              min={0}
              max={1000}
              allowReset
            />
          </PanelBody>
        )}

        <PanelBody
          title={__("Column Background", "responsive-block-editor-addons")}
          initialOpen={false}
        >
          <SelectControl
            label={__("Background Type", "responsive-block-editor-addons")}
            value={backgroundType}
            onChange={(value) => setAttributes({ backgroundType: value })}
            options={backgroundTypeOptions}
          />
          {"color" == backgroundType && (
            <Fragment>
              <p className="responsive-setting-label">
                {__("Background Color", "responsive-block-editor-addons")}
                <span className="components-base-control__label">
                  <span
                    className="component-color-indicator"
                    style={{ backgroundColor: itemBackgroundColor }}
                  ></span>
                </span>
              </p>
              <ColorPalette
                value={itemBackgroundColor}
                onChange={onChangeBackgroundColor}
                allowReset
              />
              <RangeControl
                label={__("Opacity", "responsive-block-editor-addons")}
                value={opacity}
                onChange={(value) =>
                  setAttributes({
                    opacity: value !== undefined ? value : 0,
                  })
                }
                min={0}
                max={100}
                allowReset
              />
            </Fragment>
          )}
          {"gradient" == backgroundType && (
            <Fragment>
              <p className="responsive-setting-label">
                {__("Color 1", "responsive-block-editor-addons")}
                <span className="components-base-control__label">
                  <span
                    className="component-color-indicator"
                    style={{ backgroundColor: backgroundColor1 }}
                  ></span>
                </span>
              </p>
              <ColorPalette
                value={backgroundColor1}
                onChange={(colorValue) =>
                  setAttributes({ backgroundColor1: colorValue })
                }
                allowReset
              />

              <p className="responsive-setting-label">
                {__("Color 2", "responsive-block-editor-addons")}
                <span className="components-base-control__label">
                  <span
                    className="component-color-indicator"
                    style={{ backgroundColor: backgroundColor2 }}
                  ></span>
                </span>
              </p>
              <ColorPalette
                value={backgroundColor2}
                onChange={(colorValue) =>
                  setAttributes({ backgroundColor2: colorValue })
                }
                allowReset
              />
              <RangeControl
                label={__("Color Location 1", "responsive-block-editor-addons")}
                value={colorLocation1}
                min={0}
                max={100}
                onChange={(value) =>
                  setAttributes({
                    colorLocation1: value !== undefined ? value : 0,
                  })
                }
              />
              <RangeControl
                label={__("Color Location 2", "responsive-block-editor-addons")}
                value={colorLocation2}
                min={0}
                max={100}
                onChange={(value) =>
                  setAttributes({
                    colorLocation2: value !== undefined ? value : 100,
                  })
                }
              />
              <RangeControl
                label={__(
                  "Gradient Direction",
                  "responsive-block-editor-addons"
                )}
                value={gradientDirection}
                min={0}
                max={100}
                onChange={(value) =>
                  setAttributes({
                    gradientDirection: value !== undefined ? value : 90,
                  })
                }
              />
            </Fragment>
          )}
          {"image" == backgroundType && (
            <Fragment>
              <BaseControl
                className="editor-bg-image-control"
                label={__("Background Image", "responsive-block-editor-addons")}
              >
                <MediaUpload
                  title={__(
                    "Select Background Image",
                    "responsive-block-editor-addons"
                  )}
                  onSelect={this.onSelectImage}
                  allowedTypes={["image"]}
                  value={backgroundImage}
                  render={({ open }) => (
                    <Button isDefault onClick={open}>
                      {!backgroundImage
                        ? __(
                            "Select Background Image",
                            "responsive-block-editor-addons"
                          )
                        : __("Replace image", "responsive-block-editor-addons")}
                    </Button>
                  )}
                />
                {backgroundImage && (
                  <Button
                    className="rbea-rm-btn"
                    onClick={this.onRemoveImage}
                    isLink
                    isDestructive
                  >
                    {__("Remove Image", "responsive-block-editor-addons")}
                  </Button>
                )}
              </BaseControl>
              <RangeControl
                label={__("Opacity", "responsive-block-editor-addons")}
                value={imageopacity}
                onChange={(value) =>
                  setAttributes({
                    imageopacity: value !== undefined ? value : 20,
                  })
                }
                min={0}
                max={100}
                allowReset
              />
              <PanelBody
                title={__(
                  "Background Image Settings",
                  "responsive-block-editor-addons"
                )}
                initialOpen={false}
              >
                <SelectControl
                  label={__("Image Position", "responsive-block-editor-addons")}
                  value={bgimagePosition}
                  onChange={(value) =>
                    setAttributes({ bgimagePosition: value })
                  }
                  options={[
                    {
                      value: "top left",
                      label: __("Top Left", "responsive-block-editor-addons"),
                    },
                    {
                      value: "top center",
                      label: __("Top Center", "responsive-block-editor-addons"),
                    },
                    {
                      value: "top right",
                      label: __("Top Right", "responsive-block-editor-addons"),
                    },
                    {
                      value: "center left",
                      label: __(
                        "Center Left",
                        "responsive-block-editor-addons"
                      ),
                    },
                    {
                      value: "center top",
                      label: __("Center Top", "responsive-block-editor-addons"),
                    },
                    {
                      value: "center right",
                      label: __(
                        "Center Right",
                        "responsive-block-editor-addons"
                      ),
                    },
                    {
                      value: "bottom left",
                      label: __(
                        "Bottom Left",
                        "responsive-block-editor-addons"
                      ),
                    },
                    {
                      value: "bottom center",
                      label: __(
                        "Bottom Center",
                        "responsive-block-editor-addons"
                      ),
                    },
                    {
                      value: "bottom right",
                      label: __(
                        "Bottom Right",
                        "responsive-block-editor-addons"
                      ),
                    },
                  ]}
                />
                <SelectControl
                  label={__("Image Repeat", "responsive-block-editor-addons")}
                  value={bgimageRepeat}
                  onChange={(value) => setAttributes({ bgimageRepeat: value })}
                  options={[
                    {
                      value: "no-repeat",
                      label: __("No Repeat", "responsive-block-editor-addons"),
                    },
                    {
                      value: "repeat",
                      label: __("Repeat", "responsive-block-editor-addons"),
                    },
                    {
                      value: "repeat-x",
                      label: __("Repeat-X", "responsive-block-editor-addons"),
                    },
                    {
                      value: "repeat-y",
                      label: __("Repeat-Y", "responsive-block-editor-addons"),
                    },
                  ]}
                />
                <SelectControl
                  label={__("Image Size", "responsive-block-editor-addons")}
                  value={bgthumbsize}
                  onChange={(value) => setAttributes({ bgthumbsize: value })}
                  options={[
                    {
                      value: "cover",
                      label: __("Cover", "responsive-block-editor-addons"),
                    },
                    {
                      value: "auto",
                      label: __("Auto", "responsive-block-editor-addons"),
                    },
                    {
                      value: "contain",
                      label: __("Contain", "responsive-block-editor-addons"),
                    },
                  ]}
                />
              </PanelBody>
            </Fragment>
          )}
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
              value={headingFontFamily}
              onChange={(value) => {
                setAttributes({
                  headingFontFamily: value,
                }),
                  loadGoogleFont(value);
              }}
            />
            <RangeControl
              label={__("Font Size", "responsive-block-editor-addons")}
              value={headingFontSize}
              onChange={(value) =>
                this.props.setAttributes({
                  headingFontSize: value !== undefined ? value : 20,
                })
              }
              min={1}
              max={100}
              step={1}
              allowReset
            />
            <SelectControl
              label={__("Font Weight", "responsive-block-editor-addons")}
              options={fontWeightOptions}
              value={headingFontWeight}
              onChange={(value) =>
                this.props.setAttributes({
                  headingFontWeight: value,
                })
              }
            />
            <RangeControl
              label={__("Line Height", "responsive-block-editor-addons")}
              value={headingLineHeight}
              onChange={(value) =>
                this.props.setAttributes({
                  headingLineHeight: value !== undefined ? value : 1,
                })
              }
              min={0}
              max={100}
              step={1}
              allowReset
            />
          </PanelBody>
          <PanelBody
            title={__("Subtitle Typography", "responsive-block-editor-addons")}
            initialOpen={false}
          >
            <SelectControl
              label={__("Font Family", "responsive-block-editor-addons")}
              options={fontOptions}
              value={subFontFamily}
              onChange={(value) => {
                setAttributes({
                  subFontFamily: value,
                }),
                  loadGoogleFont(value);
              }}
            />
            <RangeControl
              label={__("Font Size", "responsive-block-editor-addons")}
              value={subFontSize}
              onChange={(value) =>
                this.props.setAttributes({
                  subFontSize: value !== undefined ? value : 16,
                })
              }
              min={1}
              max={100}
              step={1}
              allowReset
            />
            <SelectControl
              label={__("Font Weight", "responsive-block-editor-addons")}
              options={fontWeightOptions}
              value={subFontWeight}
              onChange={(value) =>
                this.props.setAttributes({
                  subFontWeight: value,
                })
              }
            />
            <RangeControl
              label={__("Line Height", "responsive-block-editor-addons")}
              value={subLineHeight}
              onChange={(value) =>
                this.props.setAttributes({
                  subLineHeight: value !== undefined ? value : 1,
                })
              }
              min={0}
              max={100}
              step={1}
              allowReset
            />
          </PanelBody>
          <PanelBody
            title={__("Content Typography", "responsive-block-editor-addons")}
            initialOpen={false}
          >
            <SelectControl
              label={__("Font Family", "responsive-block-editor-addons")}
              options={fontOptions}
              value={contentFontFamily}
              onChange={(value) => {
                setAttributes({
                  contentFontFamily: value,
                }),
                  loadGoogleFont(value);
              }}
            />
            <RangeControl
              label={__("Font Size", "responsive-block-editor-addons")}
              value={contentFontSize}
              onChange={(value) =>
                this.props.setAttributes({
                  contentFontSize: value !== undefined ? value : 16,
                })
              }
              min={1}
              max={100}
              step={1}
              allowReset
            />
            <SelectControl
              label={__("Font Weight", "responsive-block-editor-addons")}
              options={fontWeightOptions}
              value={contentFontWeight}
              onChange={(value) =>
                this.props.setAttributes({
                  contentFontWeight: value,
                })
              }
            />
            <RangeControl
              label={__("Line Height", "responsive-block-editor-addons")}
              value={contentLineHeight}
              onChange={(value) =>
                this.props.setAttributes({
                  contentLineHeight: value !== undefined ? value : 2,
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
          title={__("Button Settings", "responsive-block-editor-addons")}
          initialOpen={false}
        >
          <ToggleControl
            label={__("Open link in new tab")}
            checked={buttonTarget}
            onChange={() => {
              setAttributes({ buttonTarget: !buttonTarget });
            }}
          />
          <SelectControl
            label={__("Button Size", "responsive-block-editor-addons")}
            value={buttonSize}
            options={buttonSizeOptions.map(({ value, label }) => ({
              value,
              label,
            }))}
            onChange={(value) => {
              this.props.setAttributes({
                buttonSize: value,
              });
            }}
          />
          <PanelBody
            title={__("Border", "responsive-block-editor-addons")}
            initialOpen={false}
          >
            <SelectControl
              label={__("Style", "responsive-block-editor-addons")}
              value={butborderStyle}
              options={[
                { value: "none", label: __("None") },
                { value: "solid", label: __("Solid") },
                { value: "dotted", label: __("Dotted") },
                { value: "dashed", label: __("Dashed") },
                { value: "double", label: __("Double") },
              ]}
              onChange={(value) => {
                setAttributes({ butborderStyle: value });
              }}
            />
            {borderStyle != "none" && (
              <RangeControl
                label={__("Thickness", "responsive-block-editor-addons")}
                value={butborderWidth}
                onChange={(value) => {
                  setAttributes({ butborderWidth: value });
                }}
                min={0}
                max={20}
              />
            )}
            <RangeControl
              label={__("Rounded Corners", "responsive-block-editor-addons")}
              value={butborderRadius}
              onChange={(value) => {
                setAttributes({ butborderRadius: value });
              }}
              min={0}
              max={50}
            />
            <RangeControl
              label={__("Vertical Padding", "responsive-block-editor-addons")}
              value={vPadding}
              onChange={(value) => {
                setAttributes({ vPadding: value });
              }}
              min={0}
              max={200}
            />
            <RangeControl
              label={__("Horizontal Padding", "responsive-block-editor-addons")}
              value={hPadding}
              onChange={(value) => {
                setAttributes({ hPadding: value });
              }}
              min={0}
              max={200}
            />
            <RangeControl
              label={__("Vertical Margin", "responsive-block-editor-addons")}
              value={vMargin}
              onChange={(value) => {
                setAttributes({ vMargin: value });
              }}
              min={0}
              max={200}
            />
            <RangeControl
              label={__("Horizontal Margin", "responsive-block-editor-addons")}
              value={hMargin}
              onChange={(value) => {
                setAttributes({ hMargin: value });
              }}
              min={0}
              max={200}
            />
          </PanelBody>
        </PanelBody>
        <PanelBody
          title={__("Button Color Settings", "responsive-block-editor-addons")}
          initialOpen={false}
        >
          <Fragment>
            <PanelBody
              title={__("Background", "responsive-block-editor-addons")}
              initialOpen={false}
            >
              <SelectControl
                label={__("Background Type", "responsive-block-editor-addons")}
                value={buttonbackgroundType}
                onChange={(value) =>
                  setAttributes({ buttonbackgroundType: value })
                }
                options={buttonbackgroundTypeOptions}
              />
              {"color" == buttonbackgroundType && (
                <Fragment>
                  <p className="responsive-block-editor-addons-setting-label">
                    {__("Background Color", "responsive-block-editor-addons")}
                    <span className="components-base-control__label">
                      <span
                        className="component-color-indicator"
                        style={{ backgroundColor: buttonColor }}
                      ></span>
                    </span>
                  </p>
                  <ColorPalette
                    value={buttonColor}
                    onChange={(colorValue) =>
                      setAttributes({ buttonColor: colorValue })
                    }
                    allowReset
                  />
                  <p className="responsive-block-editor-addons-setting-label">
                    {__(
                      "Background Hover Color",
                      "responsive-block-editor-addons"
                    )}
                    <span className="components-base-control__label">
                      <span
                        className="component-color-indicator"
                        style={{ backgroundColor: buttonhColor }}
                      ></span>
                    </span>
                  </p>
                  <ColorPalette
                    value={buttonhColor}
                    onChange={(colorValue) =>
                      setAttributes({ buttonhColor: colorValue })
                    }
                    allowReset
                  />
                  <RangeControl
                    label={__("Opacity", "responsive-block-editor-addons")}
                    value={butopacity}
                    onChange={(value) =>
                      setAttributes({
                        butopacity: value !== undefined ? value : 100,
                      })
                    }
                    min={0}
                    max={100}
                    allowReset
                  />
                </Fragment>
              )}
              {"gradient" == buttonbackgroundType && (
                <Fragment>
                  <p className="responsive-setting-label">
                    {__("Color 1", "responsive-block-editor-addons")}
                    <span className="components-base-control__label">
                      <span
                        className="component-color-indicator"
                        style={{ backgroundColor: buttonbackgroundColor1 }}
                      ></span>
                    </span>
                  </p>
                  <ColorPalette
                    value={buttonbackgroundColor1}
                    onChange={(colorValue) =>
                      setAttributes({ buttonbackgroundColor1: colorValue })
                    }
                    allowReset
                  />

                  <p className="responsive-setting-label">
                    {__("Color 2", "responsive-block-editor-addons")}
                    <span className="components-base-control__label">
                      <span
                        className="component-color-indicator"
                        style={{ backgroundColor: buttonbackgroundColor2 }}
                      ></span>
                    </span>
                  </p>
                  <ColorPalette
                    value={buttonbackgroundColor2}
                    onChange={(colorValue) =>
                      setAttributes({ buttonbackgroundColor2: colorValue })
                    }
                    allowReset
                  />
                  <RangeControl
                    label={__(
                      "Color Location 1",
                      "responsive-block-editor-addons"
                    )}
                    value={buttoncolorLocation1}
                    min={0}
                    max={100}
                    onChange={(value) =>
                      setAttributes({ buttoncolorLocation1: value })
                    }
                  />
                  <RangeControl
                    label={__(
                      "Color Location 2",
                      "responsive-block-editor-addons"
                    )}
                    value={buttoncolorLocation2}
                    min={0}
                    max={100}
                    onChange={(value) =>
                      setAttributes({ buttoncolorLocation2: value })
                    }
                  />
                  <RangeControl
                    label={__(
                      "Gradient Direction",
                      "responsive-block-editor-addons"
                    )}
                    value={buttongradientDirection}
                    min={0}
                    max={100}
                    onChange={(value) =>
                      setAttributes({ buttongradientDirection: value })
                    }
                  />
                </Fragment>
              )}
            </PanelBody>
          </Fragment>
          <Fragment>
            <PanelBody
              title={__("Text", "responsive-block-editor-addons")}
              initialOpen={false}
            >
              <p className="responsive-block-editor-addons-setting-label">
                {__("Text Color", "responsive-block-editor-addons")}
                <span className="components-base-control__label">
                  <span
                    className="component-color-indicator"
                    style={{ backgroundColor: buttonColor }}
                  ></span>
                </span>
              </p>
              <ColorPalette
                value={buttonTextColor}
                onChange={(colorValue) =>
                  setAttributes({ buttonTextColor: colorValue })
                }
                allowReset
              />
              <p className="responsive-block-editor-addons-setting-label">
                {__("Text HoverColor", "responsive-block-editor-addons")}
                <span className="components-base-control__label">
                  <span
                    className="component-color-indicator"
                    style={{ backgroundColor: buttonhTextColor }}
                  ></span>
                </span>
              </p>
              <ColorPalette
                value={buttonhTextColor}
                onChange={(colorValue) =>
                  setAttributes({ buttonhTextColor: colorValue })
                }
                allowReset
              />
            </PanelBody>
          </Fragment>
        </PanelBody>

        <PanelBody title={__("Icon Settings")} initialOpen={false}>
          <Fragment>
            <p className="components-base-control__label">{__("Icon")}</p>
            <FontIconPicker
              icons={svg_icons}
              renderFunc={renderSVG}
              theme="default"
              value={icon}
              onChange={(value) => setAttributes({ icon: value })}
              isMulti={false}
              noSelectedPlaceholder={__("Select Icon")}
            />
            <SelectControl
              label={__("Icon Position")}
              value={iconPosition}
              onChange={(value) => setAttributes({ iconPosition: value })}
              options={[
                { value: "before", label: __("Before Text") },
                { value: "after", label: __("After Text") },
              ]}
            />
            <p className="responsive-block-editor-addons-setting-label">
              {__("Icon Color", "responsive-block-editor-addons")}
              <span className="components-base-control__label">
                <span
                  className="component-color-indicator"
                  style={{ backgroundColor: icon_color }}
                ></span>
              </span>
            </p>
            <ColorPalette
              value={icon_color}
              onChange={(value) => setAttributes({ icon_color: value })}
              allowReset
            />
            <p className="responsive-block-editor-addons-setting-label">
              {__("Icon Hover Color", "responsive-block-editor-addons")}
              <span className="components-base-control__label">
                <span
                  className="component-color-indicator"
                  style={{ backgroundColor: icon_hcolor }}
                ></span>
              </span>
            </p>
            <ColorPalette
              value={icon_hcolor}
              onChange={(value) => setAttributes({ icon_hcolor: value })}
              allowReset
            />
          </Fragment>
        </PanelBody>

        <PanelBody
          title={__("Spacing", "responsive-block-editor-addons")}
          initialOpen={false}
        >
          <RangeControl
            label={__("Title Bottom Margin", "responsive-block-editor-addons")}
            value={titleSpace}
            onChange={(value) =>
              setAttributes({ titleSpace: value !== undefined ? value : 8 })
            }
            min={-100}
            max={100}
            allowReset
          />
          <RangeControl
            label={__(
              "Subtitle Bottom Margin",
              "responsive-block-editor-addons"
            )}
            value={subtitleSpace}
            onChange={(value) =>
              setAttributes({ subtitleSpace: value !== undefined ? value : 16 })
            }
            min={-100}
            max={100}
            allowReset
          />
          <RangeControl
            label={__("Content Top Margin", "responsive-block-editor-addons")}
            value={contenttopSpace}
            onChange={(value) =>
              setAttributes({
                contenttopSpace: value !== undefined ? value : 16,
              })
            }
            min={-100}
            max={100}
            allowReset
          />
          <RangeControl
            label={__(
              "Content Bottom Margin",
              "responsive-block-editor-addons"
            )}
            value={contentSpace}
            onChange={(value) =>
              setAttributes({ contentSpace: value !== undefined ? value : 16 })
            }
            min={-100}
            max={100}
            allowReset
          />
          <RangeControl
            label={__("Block Top Margin", "responsive-block-editor-addons")}
            value={blockmargin}
            onChange={(value) =>
              setAttributes({ blockmargin: value !== undefined ? value : 2 })
            }
            min={-100}
            max={200}
            allowReset
          />
          <RangeControl
            label={__("Block Bottom Margin", "responsive-block-editor-addons")}
            value={blockbotmargin}
            onChange={(value) =>
              setAttributes({ blockbotmargin: value !== undefined ? value : 2 })
            }
            min={-100}
            max={200}
            allowReset
          />
          <RangeControl
            label={__("Block Left Margin", "responsive-block-editor-addons")}
            value={blockleftmargin}
            onChange={(value) =>
              setAttributes({
                blockleftmargin: value !== undefined ? value : 0,
              })
            }
            min={-100}
            max={200}
            allowReset
          />
          <RangeControl
            label={__("Block Right Margin", "responsive-block-editor-addons")}
            value={blockrightmargin}
            onChange={(value) =>
              setAttributes({
                blockrightmargin: value !== undefined ? value : 0,
              })
            }
            min={-100}
            max={200}
            allowReset
          />
        </PanelBody>

        <PanelBody
          title={__("Border Settings", "responsive-block-editor-addons")}
          initialOpen={false}
        >
          <SelectControl
            label={__("Border Style", "responsive-block-editor-addons")}
            value={borderStyle}
            onChange={(value) => setAttributes({ borderStyle: value })}
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
          {"none" != borderStyle && (
            <Fragment>
              <RangeControl
                label={__("Border Width", "responsive-block-editor-addons")}
                value={borderWidth}
                onChange={(value) =>
                  setAttributes({
                    borderWidth: value !== undefined ? value : 0,
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
                      style={{ backgroundColor: borderColor }}
                    ></span>
                  </span>
                </p>
                <ColorPalette
                  value={borderColor}
                  onChange={(colorValue) =>
                    setAttributes({ borderColor: colorValue })
                  }
                  allowReset
                />
              </Fragment>
            </Fragment>
          )}
          <RangeControl
            label={__("Border Radius", "responsive-block-editor-addons")}
            value={borderRadius}
            onChange={(value) =>
              setAttributes({ borderRadius: value !== undefined ? value : 12 })
            }
            min={0}
            max={50}
            allowReset
          />
          <BoxShadowControl
            setAttributes={setAttributes}
            label={__("Box Shadow", "responsive-block-editor-addons")}
            boxShadowColor={{ value: boxShadowColor, label: __("Color") }}
            boxShadowHOffset={{
              value: boxShadowHOffset,
              label: __("Horizontal", "responsive-block-editor-addons"),
            }}
            boxShadowVOffset={{
              value: boxShadowVOffset,
              label: __("Vertical", "responsive-block-editor-addons"),
            }}
            boxShadowBlur={{
              value: boxShadowBlur,
              label: __("Blur", "responsive-block-editor-addons"),
            }}
            boxShadowSpread={{
              value: boxShadowSpread,
              label: __("Spread", "responsive-block-editor-addons"),
            }}
            boxShadowPosition={{
              value: boxShadowPosition,
              label: __("Position", "responsive-block-editor-addons"),
            }}
          />
        </PanelBody>

        <PanelColorSettings
          title={__("Text Color Settings", "responsive-block-editor-addons")}
          initialOpen={false}
          colorSettings={[
            {
              value: textColor,
              onChange: onChangeTextColor,
              label: __("Text Color", "responsive-block-editor-addons"),
            },
          ]}
        ></PanelColorSettings>
      </InspectorControls>
    );
  }
}
