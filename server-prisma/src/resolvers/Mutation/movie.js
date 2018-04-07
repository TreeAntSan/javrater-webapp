const { getUserId, getRatingId, getTagList } = require("../../utils");

const movie = {
  /**
   * Supports mixed args for genre (id or core), rating (id or rating), and tags (mixed id or tag).
   * Title, ProdCode, Genre, Rating by schema are all required. Tags is partially optional - an empty
   * array must be provided at the very least. This is personal preference. The first two are super
   * obvious, Genre I never leave blank, Rating has a Not Rated choice. Tags, though, are oftentimes
   * added on later through updates.
   * @param parent
   * @param args
   * @param ctx
   * @param info
   * @returns {Promise<*>}
   */
  async addMovie(parent, args, ctx, info) {
    const userId = getUserId(ctx);
    const tagList = await getTagList(ctx, args.tags);

    const data = {
      title: args.title,
      prodCode: args.prodCode,
      createdBy: {
        connect: { id: userId },
      },
      genre: {
        connect: args.genre.length === 25 ? { id: args.genre } : { code: args.genre },
      },
      tags: {
        connect: tagList,
      },
    };

    const ratingId = args.rating.length === 25 ? args.rating : await getRatingId(ctx, args.rating);
    if (ratingId !== false) {
      data.rating = { connect: { id: ratingId } };
    }

    return ctx.db.mutation.createMovie({ data }, info );
  },

  async deleteMovie(parent, { id }, ctx, info) {
    getUserId(ctx);  // Checking to see that this is a logged-in user
    const movieExists = await ctx.db.exists.Movie({ id });
    if (!movieExists) {
      throw new Error(`Movie not found.`);
    }

    return ctx.db.mutation.deleteMovie({ where: { id } });
  },

  async updateMovie(parent, args, ctx, info) {
    getUserId(ctx);  // Checking to see that this is a logged-in user
    const movieExists = await ctx.db.exists.Movie({ id: args.id });
    if (!movieExists) {
      throw new Error(`Movie not found.`);
    }

    if (args.tags === undefined) {
      args.tags = [];
    }

    if (!Array.isArray(args.tags)) {
      throw new Error(`Argument tags must be an array.`);
    }

    const data = {};
    data.tags = {};

    // If the string length is 25 we assume it's an ID, else we treat it as a tag.
    // (Both are unique identifiers and both are valid keys to connect with)
    data.tags.connect = args.tags.map(mTag => ( mTag.length === 25 ? { id: mTag } : { tag: mTag }));

    // Disconnect existing tags
    if (args.replaceTags) {
      // Grab the existing tags in a sorta roundabout way...
      const tagsByMovie = await ctx.db.query.tags({ where: { movies_some: { id : args.id } } });
      // Only disconnect tags that aren't also being connected
      data.tags.disconnect = tagsByMovie
        .filter(tag => (args.tags.indexOf(tag.tag) === -1 && args.tags.indexOf(tag.id) === -1))
        .map(tag => ({ id: tag.id }));
    }

    if (args.title) data.title = args.title;
    if (args.prodCode) data.prodCode = args.prodCode;
    if (args.genre) {
      data.genre = {};
      data.genre.connect = args.genre.length === 25 ? { id: args.genre } : { code: args.genre };
    }
    if (args.rating) {
      data.rating = {};
      data.rating.connect = { id: args.rating };
    }
    if (args.createdBy) {
      data.createdBy = {};
      data.createdBy.connect = { id: args.createdBy };
    }

    return ctx.db.mutation.updateMovie({ where: { id: args.id }, data }, info);
  },
};

module.exports = { movie };
