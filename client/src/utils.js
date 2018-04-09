/**
 * Takes return value from fetch for tags and sorts them into an array based on
 * the individual categories found.
 * @param tags  return value from fetch for tag/all
 * @returns {Array} { category: "x", tags: { id, tag, name, description } }
 */
const tagOptionFormatter = (tags) => {
  const tagOptions = [];
  tags.forEach(({ category, id, tag, name, description }) => {
    let index = tagOptions.findIndex(element => element.category === category);
    if (index === -1) {
      tagOptions.push({ category, tags: [] });
      index = tagOptions.length - 1;
    }
    tagOptions[index].tags.push({
      id, tag, name, description,
    });
  });
  return tagOptions;
};

/**
 * Formats a tagOptions Array [{ title: "x", tags: { id, tag, name, description } }
 * and returns two Objects using tag as key.
 * tagDict is used when making tag output. Category is required for series tags.
 * tagSeed is used to make sure that tag output is in the same order each time and to
 * provide a quick link to the tag's database id number.
 * @param tagOptions
 * @returns {{tagDict, tagSeed}} { name, category }, { checked, id }
 */
const makeTagDict = (tagOptions) => {
  const tagDict = {};
  const tagSeed = {};
  tagOptions.forEach((tagCategory) => {
    tagCategory.tags.forEach((tag) => {
      tagDict[tag.tag] = {};
      tagDict[tag.tag].name = tag.name;
      tagDict[tag.tag].category = tagCategory.category;
      tagSeed[tag.tag] = {};
      tagSeed[tag.tag].checked = false;
      tagSeed[tag.tag].id = tag.id;
    });
  });
  return { tagDict, tagSeed };
};

const utils = {
  tagOptionFormatter,
  makeTagDict,
};
export default utils;
