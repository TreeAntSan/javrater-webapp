/**
 * Takes return value from fetch for genres
 * @param genres  return value from fetch for genre/all
 * @returns {Array} { id, value, text }
 */
const genreOptionFormatter = genres => (
  genres.response.map((genre) => (
    { id: genre.id, value: genre.code, text: `${genre.code} - ${genre.description}` }
  ))
);

/**
 * Takes return value from fetch for ratings
 * @param ratings return value from fetch for rating/all
 * @returns {Array} { id, value, description }
 */
const ratingOptionFormatter = ratings => (
  ratings.response.map((rating) => (
    { id: rating.id, value: rating.rating, description: rating.description }
  ))
);

/**
 * Takes return value from fetch for tags
 * @param tags  return value from fetch for tag/all
 * @returns {Array} { title: "x", tags: { id, tag, name, description } }
 */
const tagOptionFormatter = tags => {
  let tagOptions = [];
  tags.response.forEach((tag) => {
    let index = tagOptions.findIndex(element => element.title === tag.category);
    if (index === -1) {
      tagOptions.push({ title: tag.category, tags: [] });
      index = tagOptions.length - 1;
    }
    tagOptions[index].tags.push(
      { id: tag.id, tag: tag.tag, name: tag.name, description: tag.description }
    );
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
const makeTagDict = tagOptions => {
  let tagDict = {};
  let tagSeed = {};
  tagOptions.forEach((tagCategory) => {
    tagCategory.tags.forEach((tag) => {
      tagDict[tag.tag] = {};
      tagDict[tag.tag].name = tag.name;
      tagDict[tag.tag].category = tagCategory.title;
      tagSeed[tag.tag] = {};
      tagSeed[tag.tag].checked = false;
      tagSeed[tag.tag].id = tag.id;
    });
  });
  return { tagDict, tagSeed };
};

const utils = {
  genreOptionFormatter,
  ratingOptionFormatter,
  tagOptionFormatter,
  makeTagDict,
};
export default utils;
