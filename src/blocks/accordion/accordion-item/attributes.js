const { __ } = wp.i18n;

const attributes = {
  block_id: {
    type: "string",
  },
  title: {
    type: "html",
    default: __("What is Accordion?"),
  },
  content: {
    type: "html",
    default: __(
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    ),
  },
  icon: {
    type: "html",
    default: "fas fa-plus",
  },
  iconActive: {
    type: "html",
    default: "fas fa-minus",
  },
  layout: {
    type: "string",
    default: "accordion",
  },
  headingTag: {
    type: "html",
    selector: "span,p,h1,h2,h3,h4,h5,h6",
    default: "span",
  },
  borderStyle: {
    type: "string",
    default: "solid",
  },
  borderWidth: {
    type: "number",
    default: 1,
  },
  borderRadius: {
    type: "number",
    default: 2,
  },
  borderColor: {
    type: "string",
    default: 'black',
  },
  boxShadowColor: {
    type: "string",
  },
  boxShadowHOffset: {
    type: "number",
    default: 9,
  },
  boxShadowVOffset: {
    type: "number",
    default: 9,
  },
  boxShadowBlur: {
    type: "number",
    default: 9,
  },
  boxShadowSpread: {
    type: "number",
    default: 9,
  },
  boxShadowPosition: {
    type: "string",
    default: "outset",
  },
  titlePadding: {
    type: "number",
    default: 10,
  },
  contentPadding: {
    type: "number",
    default: 10,
  },
};

export default attributes;
