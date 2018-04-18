import { sprintf } from "sprintf-js";
import { AUTH_TOKEN } from "./constants";

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

// TODO better token management
// Storing tokens in local storage is not recommended for production applications because
// they are at risk of XSS attacks.
// See: https://auth0.com/blog/cookies-vs-tokens-definitive-guide/
const setToken = (token) => {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem(AUTH_TOKEN, token);
    return;
  }
  throw new Error("localStorage not available on this browser!");
};

const removeToken = () => {
  if (typeof localStorage !== "undefined") {
    localStorage.removeItem(AUTH_TOKEN);
    return;
  }
  throw new Error("localStorage not available on this browser!");
};

const getToken = () => {
  if (typeof localStorage !== "undefined") {
    return localStorage.getItem(AUTH_TOKEN);
  }
  throw new Error("localStorage not available on this browser!");
};

const grabName = (meQuery, string = "%s") => (
  queryOK(meQuery, meQuery.me) ? sprintf(string, meQuery.me.name) : ""
);

const loggedIn = meQuery => (
  queryOK(meQuery, meQuery.me)
);

/**
 * Feed this function your query (and the data, as it may be named differently)
 * and it'll quickly return whether it's OK to continue.
 * @param query
 * @param data
 * @returns boolean
 */
const queryOK = (query, data) => (
  !!query && !!data && !query.loading && !query.error
);

const utils = {
  tagOptionFormatter,
  makeTagDict,
  setToken,
  removeToken,
  getToken,
  grabName,
  loggedIn,
  queryOK,
};

export default utils;
