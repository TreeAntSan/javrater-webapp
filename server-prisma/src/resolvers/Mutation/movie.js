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
    const movieExists = await ctx.db.exists.Movie({
      id
    });
    if (!movieExists) {
      throw new Error(`Movie not found.`);
    }

    return ctx.db.mutation.deleteMovie({ where: { id } });
  },
};

module.exports = { movie };
