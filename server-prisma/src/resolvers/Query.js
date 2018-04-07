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
