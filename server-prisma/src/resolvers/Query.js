const { getUserId } = require("../utils");

const Query = {
  /**
   * Return a single Movie by its ID. Genre, Rating, and Tags are accessible.
   * @param parent
   * @param id
   * @param ctx
   * @param info
   * @returns {*}
   */
  movie(parent, { id }, ctx, info) {
    return ctx.db.query.movie({ where: { id } }, info);
  },

  /**
   * Pass app query movies to database query exposing all data.
   * Keep in mind that stuff like this is potentially dangerous if written incorrectly, if type User
   * wasn't redefined in schema.graphql to NOT have the password a bad person could get the
   * hashed+salted password of a User by a movie's createdBy field.
   * @param parent
   * @param args
   * @param ctx
   * @param info
   * @returns {*}
   */
  movies(parent, args, ctx, info) {
    return ctx.db.query.movies(args, info);
  },

  /**
   * Return a single Genre by its ID. Movies are accessible.
   * @param parent
   * @param id
   * @param ctx
   * @param info
   * @returns {*}
   */
  genre(parent, { id }, ctx, info) {
    return ctx.db.query.genre({ where: { id } }, info);
  },

  /**
   * Return a single Rating by its ID. Movies are accessible.
   * @param parent
   * @param id
   * @param ctx
   * @param info
   * @returns {*}
   */
  rating(parent, { id }, ctx, info) {
    return ctx.db.query.rating({ where: { id } }, info);
  },

  /**
   * Return a single Tag by its ID. Movies are accessible.
   * @param parent
   * @param id
   * @param ctx
   * @param info
   * @returns {*}
   */
  tag(parent, { id }, ctx, info) {
    return ctx.db.query.tag({ where: { id } }, info);
  },

  /**
   * Return all Genres. Movies are accessible.
   * @param parent
   * @param args
   * @param ctx
   * @param info
   * @returns {*}
   */
  allGenres(parent, args, ctx, info) {
    return ctx.db.query.genres({}, info);
  },

  /**
   * Return all Ratings. Movies are inaccessible.
   * @param parent
   * @param args
   * @param ctx
   * @param info
   * @returns {*}
   */
  allRatings(parent, args, ctx, info) {
    return ctx.db.query.ratings({}, info);
  },

  /**
   * Return all Tags. Movies are inaccessible.
   * @param parent
   * @param args
   * @param ctx
   * @param info
   * @returns {*}
   */
  allTags(parent, args, ctx, info) {
    return ctx.db.query.tags({}, info);
  },

  /**
   * Return user information on a User minus their password and email.
   * @param parent
   * @param id
   * @param ctx
   * @param info
   * @returns {*}
   */
  user(parent, { id }, ctx, info) {
    return ctx.db.query.user({ where: { id } }, info);
  },

  /**
   * Return information on the requesting User minus their password.
   * @param parent
   * @param args
   * @param ctx
   * @param info
   * @returns {*}
   */
  me(parent, args, ctx, info) {
    const id = getUserId(ctx);
    return ctx.db.query.user({ where: { id } }, info);
  },
};

module.exports = { Query };
