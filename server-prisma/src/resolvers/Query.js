const { getUserId } = require('../utils')

const Query = {
  feed(parent, args, ctx, info) {
    return ctx.db.query.users({ }, info);
  },

  // drafts(parent, args, ctx, info) {
  //   const id = getUserId(ctx);
  //
  //   const where = {
  //     isPublished: false,
  //     author: {
  //       id
  //     }
  //   };
  //
  //   return ctx.db.query.posts({ where }, info)
  // },

  movie(parent, { id }, ctx, info) {
    return ctx.db.query.movie({ where: { id } }, info);
  },

  genre(parent, { id }, ctx, info) {
    return ctx.db.query.genre({ where: { id } }, info);
  },

  rating(parent, { id }, ctx, info) {
    return ctx.db.query.rating({ where: { id } }, info);
  },

  me(parent, args, ctx, info) {
    const id = getUserId(ctx);
    return ctx.db.query.user({ where: { id } }, info);
  },
};

module.exports = { Query };
