/**
 * Returns Dynamic Generated CSS
 */

import generateCSS from "../../../generateCSS";
import generateCSSUnit from "../../../generateCSSUnit";
import { hexToRgba } from "../../../utils/index.js";

function EditorStyles(props) {
  const {
    block_id,
    gutter,
    responsiveHeight,
    borderWidth,
    borderColor,
    borderStyle,
    iconColor,
    iconBackgroundRadius,
    iconBackgroundColor,
    iconBackgroundOpacity,
    width,
  } = props.attributes;

  let imgopacity = iconBackgroundOpacity / 100;

  var selectors = {
    " .flickity-button .flickity-button-icon": {
      fill: iconColor,
    },

    " .flickity-button": {
      "background-color": hexToRgba(
        iconBackgroundColor || "#ffffff",
        imgopacity || 0
      ),
      "border-radius": iconBackgroundRadius + "%",
    },

    " .has-carousel-lrg .responsive-block-editor-addons-gallery--item": {
      width: generateCSSUnit(width, "px"),
    },

    " .responsive-block-editor-addons-gallery--item": {
      "margin-left":
        gutter > 0 && !responsiveHeight ? gutter + "px" : undefined,
      "margin-right":
        gutter > 0 && !responsiveHeight ? gutter + "px" : undefined,
      "border-width": generateCSSUnit(borderWidth, "px"),
      "border-style": borderStyle,
      "border-color": borderColor,
    },
  };

  var mobile_selectors = {};

  var tablet_selectors = {};

  var styling_css = "";
  var id = `.responsive-block-editor-addons-block-image-slider.block-${block_id}`;

  styling_css = generateCSS(selectors, id);
  styling_css += generateCSS(tablet_selectors, id, true, "tablet");
  styling_css += generateCSS(mobile_selectors, id, true, "mobile");

  return styling_css;
}

export default EditorStyles;
