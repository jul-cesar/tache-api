import supertest from "supertest";
import app from "..";

describe("task", () => {
  describe("gest user task route", () => {
    describe("given the user does not exist ", () => {
      it("should return a 403", async () => {
        const userId = "adasdddad223";
        await supertest(app).get(`/tarea/${userId}`).expect(403);
      });
    });
  });
});
