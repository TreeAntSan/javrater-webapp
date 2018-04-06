const jwt = require("jsonwebtoken");

function getUserId(ctx) {
  const Authorization = ctx.request.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    return userId;
  }

  throw new AuthError();
}

async function getGenreId(ctx, genreCode) {
  if (genreCode.length === 0) {
    return false;
  }

  const genreObject = await ctx.db.query.genre({ where: { code: genreCode } });
  if (genreObject && genreObject.id) {
    return genreObject.id;
  }
  throw new Error(`No such genre found for code: "${genreCode}"`);
}

async function getRatingId(ctx, rating) {
  if (rating.length === 0) {
    return false;
  }

  const ratingObject = await ctx.db.query.ratings({ where: { rating: rating } });
  if (ratingObject && ratingObject[0] && ratingObject[0].id) {
    return ratingObject[0].id;
  }
  throw new Error(`No such rating found for rating: "${rating}"`);
}

async function getTagList(ctx, tags) {
  if (tags.length === 0) {
    return [];
  }

  const tagObject = await ctx.db.query.tags({ where: { tag_in: tags } });
  if (tagObject && tagObject.length > 0) {
    return tagObject.map(tag => ({ id: tag.id }));
  }
  throw new Error(`No such tags found for tag(s): "${tags}"`);

}

class AuthError extends Error {
  constructor() {
    super("Not authorized");
  }
}

module.exports = {
  getUserId,
  getGenreId,
  getRatingId,
  getTagList,
  AuthError,
};