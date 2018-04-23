const jwt = require("jsonwebtoken");

function getUserId(ctx) {
  const authLoad = getAuthToken(ctx);
  return authLoad.result.userId;
}

function getAuthToken(ctx) {
  const Authorization = ctx.request.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    try {
      const result = jwt.verify(token, process.env.APP_SECRET);
      return { result, token };
    } catch (error) {
      if (error.name === "JsonWebTokenError") {
        throw new AuthError();
      }
      throw error;
    }
  }

  throw new AuthError();
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

/**
 * Returns an array of { id } for each Tag defined by either tag or id.
 * @param ctx
 * @param tags  string array of Tags
 * @returns {Promise<*>}
 */
async function getTagList(ctx, tags) {
  if (tags.length === 0) {
    return [];
  }

  // Support mixed input of tags OR ids.
  const tagTags = tags.filter(tag => tag.length !== 25);
  const tagIds = tags.filter(tag => tag.length === 25);

  const tagObject = await ctx.db.query.tags({
    where: {
      OR: [
        { tag_in: tagTags},
        { id_in: tagIds },
      ],
    },
  });

  if (tagObject && tagObject.length > 0) {
    return tagObject.map(tag => ({ id: tag.id }));
  }
  throw new Error(`No such tags found for tag(s): "${tags}"`);
}

class AuthError extends Error {
  constructor() {
    // If error is changed you must also change the same string in client/src/index.js
    super("Not authorized");
  }
}

module.exports = {
  getUserId,
  getAuthToken,
  getRatingId,
  getTagList,
  AuthError,
};