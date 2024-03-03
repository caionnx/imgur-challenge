import request from "supertest";
import app from './index';
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

describe("GET /gallery", () => {
  it("should return all data from default config", async () => {
     return request(app).get("/gallery")
       .expect('Content-Type', /json/)
       .expect(200)
       .then((res) => {
         expect(res.statusCode).toBe(200);
       })
  });

  it("should pass custom path and query parameters", async () => {
    const spy = jest.spyOn(axios, 'get');
    return request(app).get("/gallery?window=month&showViral=false")
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(spy).toHaveBeenCalledWith(expect.stringContaining('/hot/viral/month/1?showViral=false'), expect.any(Object));
      })
  });

  it("should not pass custom unkown parameters", async () => {
    const spy = jest.spyOn(axios, 'get');
    return request(app).get("/gallery?random=true")
      .expect('Content-Type', /json/)
      .expect(200)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(spy).not.toHaveBeenCalledWith(expect.stringContaining('random'), expect.any(Object));
      })
  });
});