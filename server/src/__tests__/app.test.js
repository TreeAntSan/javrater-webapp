import request from "supertest";

// Inspiration from http://www.albertgao.xyz/2017/05/24/how-to-test-expressjs-with-jest-and-supertest/

describe("app", () => {
  let app;

  beforeAll(() => {
    app = require("../app");
  });

  it("should respond with status 404", () => {
    return request(app)
    .get("/")
    .then(response => {
      expect(
        response.statusCode
      ).toBe(404);
    });
  });

  if (process.env.RATER_MYSQL_PASSWORD) {
    describe("when connected to sql server", () => {

      it("/api/v1/rating/all respond with status 200", () => {
        return request(app)
        .get("/api/v1/rating/all")
        .then(response => {
          expect(
            response.statusCode
          ).toBe(200);
        });
      });

      it("/api/v1/genre/all respond with status 200", () => {
        return request(app)
        .get("/api/v1/genre/all")
        .then(response => {
          expect(
            response.statusCode
          ).toBe(200);
        });
      });

      it("/api/v1/tag/all respond with status 200", () => {
        return request(app)
        .get("/api/v1/tag/all")
        .then(response => {
          expect(
            response.statusCode
          ).toBe(200);
        });
      });

      it("/api/v1/movie/all respond with status 200", () => {
        return request(app)
        .get("/api/v1/movie/all")
        .then(response => {
          expect(
            response.statusCode
          ).toBe(200);
        });
      });
    });
  }
});