const { getUserId, getGenreId, getRatingId, getTagList } = require("../../utils");

const movie = {
  async addMovie(parent, args, ctx, info) {
    const userId = getUserId(ctx);
    const tagList = await getTagList(ctx, args.tags);

    const data = {
      title: args.title,
      prodCode: args.prodCode,
      createdBy: {
        connect: { id: userId },
      },
      tags: {
        connect: tagList,
      },
    };

    const genreId = await getGenreId(ctx, args.genre);
    if (genreId !== false) {
      data.genre = { connect: { id: genreId } };
    }

    const ratingId = await getRatingId(ctx, args.rating);
    if (ratingId !== false) {
      data.rating = { connect: { id: ratingId } };
    }

    return ctx.db.mutation.createMovie({ data }, info );
  },

  async deleteMovie(parent, { id }, ctx, info) {
    const movieExists = await ctx.db.exists.Movie({ id });
    if (!movieExists) {
      throw new Error(`Movie not found.`);
    }

    return ctx.db.mutation.deleteMovie({ where: { id } });
  },

  async updateMovie(parent, args, ctx, info) {
    const movieExists = await ctx.db.exists.Movie({ id: args.id });
    if (!movieExists) {
      throw new Error(`Movie not found.`);
    }

    if (args.tags === undefined) {
      args.tags = [];
    }

    if (!Array.isArray(args.tags)) {
      throw new Error(`Tags must be an array. An empty array is acceptable.`);
    }

    const data = {};
    data.tags = {};

    // If the string length is 25, we assume it's an ID, else we treat it as a tag
    // (both are unique identifiers and both are valid)
    data.tags.connect = args.tags.map(mTag => ( mTag.length === 25 ? { id: mTag } : { tag: mTag }));

    // Disconnect existing tags
    if (args.replaceTags) {
      // Grab the existing tags in a sorta roundabout way...
      const tagsByMovie = await ctx.db.query.tags({ where: { movies_some: { id : args.id } } });
      data.tags.disconnect = tagsByMovie.map(tag => ({ id: tag.id })); // TODO filter out tags in connect
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
