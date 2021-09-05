const { DateTime } = require("luxon");
const markdownIt = require("markdown-it");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({"src/_static/styles": "styles"});
  eleventyConfig.addPassthroughCopy("dist");
  eleventyConfig.addPassthroughCopy({
    "node_modules/@dependently-typed/ui/dist/index.css": "styles/dtyped.css"
  });

  eleventyConfig.addFilter("toLocaleString", function (value) {
    return DateTime.fromJSDate(value, { zone: "UTC" }).toLocaleString();
  });

  const md = new markdownIt({
    html: true,
  });

  eleventyConfig.addPairedShortcode("markdown", (content) => {
    return md.render(content);
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
    },
  };
};
