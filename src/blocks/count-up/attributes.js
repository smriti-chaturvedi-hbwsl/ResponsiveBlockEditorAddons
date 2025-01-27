const ITEM_COUNT = 2;

const countUp = [];
for (var i = 1; i <= ITEM_COUNT; i++) {
  countUp.push({
    icon: "lightbulb",
    title: "Title " + i,
    amount: "1234",
    features: "",
  });
}

const attributes = {
  block_id: {
    type: "string",
  },
  countUp: {
    type: "array",
    default: countUp,
  },
  count: {
    type: "number",
    default: ITEM_COUNT,
  },
  gutter: {
    type: "string",
    default: "medium",
  },
  contentAlign: {
    type: "string",
    default: "center",
  },
  textColor: {
    type: "string",
  },
  itemBackgroundColor: {
    type: "string",
  },
  contentFontFamily: {
    type: "string",
  },
  headingFontFamily: {
    type: "string",
  },
  dateFontFamily: {
    type: "string",
  },
  dateLineHeight: {
    type: "number",
    default: 1,
  },
  dateFontWeight: {
    type: "string",
    default: "400",
  },
  dateFontSize: {
    type: "number",
    default: 40,
  },
  dateFontSizeMobile: {
    type: "number",
    default: 40,
  },
  dateFontSizeTablet: {
    type: "number",
    default: 40,
  },
  headingLineHeight: {
    type: "number",
    default: 1.8,
  },
  titleFontWeight: {
    type: "string",
    default: "900",
  },
  headingFontSize: {
    type: "number",
    default: 16,
  },
  headingFontSizeTablet: {
    type: "number",
  },
  headingFontSizeMobile: {
    type: "number",
  },
  contentLineHeight: {
    type: "number",
    default: 1.75,
  },
  contentFontWeight: {
    type: "string",
    default: "400",
  },
  contentFontSize: {
    type: "number",
    default: 16,
  },
  contentFontSizeMobile: {
    type: "number",
    default: 16,
  },
  contentFontSizeTablet: {
    type: "number",
    default: 16,
  },
  icon: {
    type: "string",
    default: "welcome-add-page",
  },
  resshowIcon: {
    type: "boolean",
    default: false,
  },
  resshowTitle: {
    type: "boolean",
    default: true,
  },
  resshowDesc: {
    type: "boolean",
    default: true,
  },
  blockBorderStyle: {
    type: "string",
    default: "none",
  },
  blockBorderWidth: {
    type: "number",
    default: 1,
  },
  blockBorderRadius: {
    type: "number",
  },
  blockBorderColor: {
    type: "string",
  },
  opacity: {
    type: "number",
    default: 10,
  },
  icon_color: {
    type: "string",
    default: "#3a3a3a",
  },
  counterId: {
    type: "string",
    default: 1,
  },
  iconsize: {
    type: "number",
    default: 16,
  },
  resshowNum: {
    type: "boolean",
    default: true,
  },
  numColor: {
    type: "string",
  },
  titleColor: {
    type: "string",
  },
  titleSpace: {
    type: "number",
    default: 20,
  },
  contentSpace: {
    type: "number",
    default: 30,
  },
  numSpace: {
    type: "number",
    default: 20,
  },
  iconStyle: {
    type: "string",
    default: "none",
  },
  shapeBorderRadius: {
    type: "number",
    default: 100,
  },
  shapePadding: {
    type: "number",
    default: 20,
  },
  shapeBorder: {
    type: "number",
    default: 2,
  },
  iconShapeColor: {
    type: "string",
    default: "#add5ef",
  },
  contentSpacing: {
    type: "number",
    default: 0,
  },
  iconSpacing: {
    type: "number",
    default: 16,
  },
  titleSpacing: {
    type: "number",
  },
  numberSpacing: {
    type: "number",
  },
  descriptionSpacing: {
    type: "number",
  },
};
export default attributes;
