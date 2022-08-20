import request from'supertest';
import app from'../index.js';

describe('Cat fact api endpoint', () => {

  const token = 'Bearer rtxbearertoken'

  it('should create a fact', async () => {
    const res = await request(app)
      .post("/api/v1/facts/create")
      .set('Authorization', token)
      .send({
        _id: "5887e1d85c873e001103688900000",
        user: "5a9ac18c7478810ea6c06381",
        text: "Cats make about 100 different sounds. Dogs make only about 10.",
        __v: 0,
        source: "user",
        updatedAt: "2020-09-03T16:39:39.578Z",
        type: "cat",
        createdAt: "2018-01-15T21:20:00.003Z",
        deleted: false,
        used: true
      });
    
    expect(res.statusCode).toEqual(201)

  })
  
  it('should fetch facts', async () => {
    const res = await request(app)
      .get(`/api/v1/facts/get`)
      .set('Authorization', token);
    expect(res.statusCode).toEqual(200);
  });

  it('should fetch a single fact data', async () => {
    const factId = "5887e1d85c873e001103688900000";
    const res = await request(app)
      .get(`/api/v1/facts/get/${factId}`)
      .set('Authorization', token);
    expect(res.statusCode).toEqual(200);
  });

  it('should response 404 if fact is not found', async () => {
    const factId = "5887e1d85c873e0011036889000009";
    const res = await request(app)
      .get(`/api/v1/facts/get/${factId}`)
      .set('Authorization', token);
    expect(res.statusCode).toEqual(404);
  });

  it('should update a fact', async () => {
    const factId = "5887e1d85c873e001103688900000";
    const res = await request(app)
      .put(`/api/v1/facts/update/${factId}`)
      .send({
        text: "this is test text"
      })
      .set('Authorization', token);
    expect(res.statusCode).toEqual(200);
  });

  it('should delete a fact', async () => {
    const factId = '5887e1d85c873e001103688900000';
    const res = await request(app)
      .delete(`/api/v1/facts/delete/${factId}`)
      .set('Authorization', token);
    expect(res.statusCode).toEqual(200);
  });

})