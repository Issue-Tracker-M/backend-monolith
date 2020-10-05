const supertest = require('supertest')
import app from '../api/app'

describe('index route', () => {
  it('it runs', async (done) => {
    const res = await supertest(app).get('/')
    expect(res.body).toEqual({ message: 'API is up 🚀' })
    expect(res.status).toBe(200)
    done()
  })
  it('it returns URL cannot be found', async () => {
    const res = await supertest(app).get('/server/auth')
    expect(res.body).toEqual({ message: 'This URL can not be found' })
    expect(res.status).toBe(404)
  })
})
