const { Query } = require("./Query");
const { Subscription } = require("./Subscription");
const { auth } = require("./Mutation/auth");
const { movie } = require("./Mutation/movie");
const { AuthPayload } = require("./AuthPayload");

module.exports = {
  Query,
  Mutation: {
    ...auth,
    ...movie,
  },
  Subscription,
  AuthPayload,
};
