import request from 'supertest';
import app from '../src/server';

describe('User Endpoint', () => {
  it('should post a data', async () => {
    const body = {
      first_name: 'atjhoendz',
      last_name: 'armando',
      email: 'testemail@gmail.com',
    };

    const res = await request(app).post('/api/v1/user').send(body);

    expect(res.statusCode).toEqual(201);
    expect(res.body.data).toHaveProperty('first_name');
  });

  it('should fetch all data', async () => {
    const res = await request(app).get('/api/v1/user');
    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveLength(1);
  });

  it('should fetch a data', async () => {
    const idUser = 1;
    const res = await request(app).get(`/api/v1/user/${idUser}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty('first_name');
    expect(res.body.data.id).toEqual(idUser);
  });

  it('should update a data', async () => {
    const idUser = 1;
    const body = {
      first_name: 'another',
      last_name: 'name',
      email: 'newmail@gmail.com',
    };

    const res = await request(app).put(`/api/v1/user/${idUser}`).send(body);
    expect(res.statusCode).toEqual(200);
    expect(res.body.data.first_name).toEqual('another');
    expect(res.body.message).toEqual('User data updated successfully');
  });

  it('should remove a data', async () => {
    const idUser = 1;
    const res = await request(app).delete(`/api/v1/user/${idUser}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.data).toHaveProperty('first_name');
    expect(res.body.message).toEqual('A user data removed successfully');
  });
});
