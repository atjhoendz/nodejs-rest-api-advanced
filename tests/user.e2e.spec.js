import request from 'supertest';
import app from '../src/server';
import { statusCode } from '../src/utils/status.js';

describe('User Endpoint', () => {
  describe('Create a user', () => {
    const body = {
      first_name: 'john',
      last_name: 'doe',
      email: 'testemail@gmail.com',
    };

    it('should create a data', async () => {
      const res = await request(app).post('/api/v1/user').send(body);

      expect(res.statusCode).toEqual(statusCode.created);
      expect(res.body.data).toHaveProperty('first_name');
    });

    it('should throw an error if any duplicate email', async () => {
      const res = await request(app).post('/api/v1/user').send(body);

      expect(res.statusCode).toEqual(statusCode.conflict);
    });
  });

  describe('Get all user', () => {
    it('should fetch all data', async () => {
      const res = await request(app).get('/api/v1/user');
      expect(res.statusCode).toEqual(statusCode.success);
      expect(res.body.data).toHaveLength(1);
    });
  });

  describe('Get a user', () => {
    it('should fetch a data', async () => {
      const idUser = 1;
      const res = await request(app).get(`/api/v1/user/${idUser}`);

      expect(res.statusCode).toEqual(statusCode.success);
      expect(res.body.data).toHaveProperty('first_name');
      expect(res.body.data.id).toEqual(idUser);
    });

    it('should send notfound result if data is not exist', async () => {
      const idUser = 9999;
      const res = await request(app).get(`/api/v1/user/${idUser}`);

      expect(res.statusCode).toEqual(statusCode.notfound);
      expect(res.body.message).toEqual(`User with id #${idUser} doesn't exist`);
    });
  });

  describe('Update a user', () => {
    const body = {
      first_name: 'another',
      last_name: 'name',
      email: 'newmail@gmail.com',
    };

    it('should update a data', async () => {
      const idUser = 1;

      const res = await request(app).put(`/api/v1/user/${idUser}`).send(body);
      expect(res.statusCode).toEqual(statusCode.success);
      expect(res.body.data.first_name).toEqual('another');
      expect(res.body.message).toEqual('User data updated successfully');
    });

    it('should update a data with partial column', async () => {
      const idUser = 1;
      const body = {
        first_name: 'john2',
      };

      const res = await request(app).put(`/api/v1/user/${idUser}`).send(body);
      expect(res.statusCode).toEqual(statusCode.success);
      expect(res.body.data.first_name).toEqual('john2');
      expect(res.body.data.last_name).toEqual('name');
      expect(res.body.message).toEqual('User data updated successfully');
    });

    it('should send conflict response if any duplicate email', async () => {
      const idUser = 1;
      const body = {
        email: 'mail2@gmail.com',
      };

      // create another user
      await request(app).post('/api/v1/user').send({
        first_name: 'michael',
        last_name: 'drake',
        email: 'mail2@gmail.com',
      });

      const res = await request(app).put(`/api/v1/user/${idUser}`).send(body);
      expect(res.statusCode).toEqual(statusCode.conflict);
    });

    it('should send notfound response if data is not exist', async () => {
      const idUser = 9999;
      const res = await request(app).put(`/api/v1/user/${idUser}`).send(body);

      expect(res.statusCode).toEqual(statusCode.notfound);
      expect(res.body.message).toEqual(`User with id #${idUser} doesn't exist`);
    });
  });

  describe('Remove a user', () => {
    it('should remove a data', async () => {
      const idUser = 1;
      const res = await request(app).delete(`/api/v1/user/${idUser}`);

      expect(res.statusCode).toEqual(200);
      expect(res.body.data).toHaveProperty('first_name');
      expect(res.body.message).toEqual('A user data removed successfully');
    });

    it('should send notfound response if data is not exist', async () => {
      const idUser = 9999;
      const res = await request(app).delete(`/api/v1/user/${idUser}`);

      expect(res.statusCode).toEqual(statusCode.notfound);
      expect(res.body.message).toEqual(`User with id #${idUser} doesn't exist`);
    });
  });
});
