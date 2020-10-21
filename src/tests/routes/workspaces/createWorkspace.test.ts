import supertest from 'supertest';
import app from '../../../api/app';

describe('create new workspace', () => {
  it('successfully creates a workspace', async () => {
    const response = await supertest(app).post('/api/workspace/').send({
      name: 'testworkspace7',
      labels: [],
      admin: '5f7f4800a552e6ec677a2766',
    });

    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
    expect(response.body.name).toBe('testworkspace7');
    expect(response.body.labels).toStrictEqual([]);
    expect(response.body.admin).toBe('5f7f4800a552e6ec677a2766');
    expect(response.body.tasks).toStrictEqual([]);
    expect(response.body.history).toStrictEqual([]);
    expect(response.body.users).toStrictEqual(['5f7f4800a552e6ec677a2766']);
  });

  it('Name is required', async () => {
    const response = await supertest(app).post('/api/workspace/').send({
      labels: [],
      admin: '5f7f4800a552e6ec677a2766',
    });
    expect(response.status).toBe(400);
    expect(response.body).toBeDefined();
  });

  it('admin is required', async () => {
    const response = await supertest(app).post('/api/workspace/').send({
      name: 'testworkspace7',
      labels: [],
    });
    expect(response.status).toBe(400);
    expect(response.body).toBeDefined();
  });

  it('labels is an array', async () => {
    const response = await supertest(app).post('/api/workspace/').send({
      name: 'testworkspace7',
      labels: 'notanarray',
      admin: '5f7f4800a552e6ec677a2766',
    });
    expect(response.status).toBe(400);
    expect(response.body).toBeDefined();
  });
});
