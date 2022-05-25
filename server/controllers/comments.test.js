const router = require("../routes");
const supertest = require("supertest");
const mockedDb = require("../db/db.mock")

const request = supertest(router.initRouter(mockedDb));

describe("/comments", () => {
  it("returns list of comments", async () => {
    const response = await request.get("/comments");
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual([{
      id: 1,
      rating: null,
      parent_id: null,
      post_id: 1,
      user_id: 1,
      content: 'Mocked comment 1',
      timestamp: '2022-05-21T12:55:30.000Z'
    },
      {
        id: 2,
        rating: null,
        parent_id: null,
        post_id: 1,
        user_id: 1,
        content: 'Mocked comment 2',
        timestamp: '2022-05-22T12:55:30.000Z'
      },
      {
        id: 3,
        rating: null,
        parent_id: null,
        post_id: 1,
        user_id: 1,
        content: 'Mocked comment 3',
        timestamp: '2022-05-23T12:55:30.000Z'
      }])
  })
});

describe("/comments/:id", () => {
  it("returns code 400 when called with wrong req param", async () => {
    const response = await request.get("/comments/q");
    expect(response.status).toBe(400);
  }),
    it("returns code 404 when called for non existing comment", async () => {
      const response = await request.get("/comments/4");
      expect(response.status).toBe(404);
    }),
    it("returns single comment when called with proper param", async () => {
      const response = await request.get("/comments/1");
      expect(response.status).toBe(200);
    })
});