import supertest from 'supertest'
import app from '../../../api/app'

import Workspace from '../../../models/Workspace'

let workspaceId: string

async function clearDb() {
  await Workspace.deleteMany({})
}
beforeEach(() => {
  jest.setTimeout(10000)
})

beforeAll(async () => {
  jest.setTimeout(10000)

  try {
    await clearDb()

    const workspace = await supertest(app).post('/api/workspace/').send({
      name: 'testworkspace7',
      labels: [],
      admin: '5f7f4800a552e6ec677a2766',
    })

    workspaceId = workspace.body._id
  } catch (error) {
    console.error(error.name, error.message)
  }
})

describe('edit a workspace', () => {
  it('wrong credentials provided', async () => {
    const res = await supertest(app).put(
      '/api/workspace/5f7f4800a552e6ec677a2766'
    )
    expect(res.body).toBeDefined()
    expect(res.status).toBe(400)
  })
  it('returns workspace has been updated', async () => {
    const res = await supertest(app)
      .put(`/api/workspace/${workspaceId}`)
      .send({
        name: 'testworkspace8',
        labels: [],
        admin: '5f7f4800a552e6ec677a2766',
        users: ['5f7f4800a552e6ec677a2766'],
        history: [],
        tasks: [],
      })

    expect(res.status).toBe(200)
    expect(res.body).toEqual({ message: 'workspace updated' })
  })
})
