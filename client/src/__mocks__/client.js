import mockGenres from "./genre_all";
import mockRatings from "./rating_all";
import mockTags from "./tag_all";

// const mockClient = jest.genMockFromModule("../client");
const mockClient = {};

mockClient.getGenres = jest.fn((cb) => {
  return cb(mockGenres);
});
mockClient.getRatings = jest.fn((cb) => {
  return cb(mockRatings);
});
mockClient.getTags = jest.fn((cb) => {
  return cb(mockTags);
});

export default mockClient;