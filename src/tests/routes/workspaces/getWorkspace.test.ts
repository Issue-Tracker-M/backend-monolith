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

describe('get all workspaces', () => {
  test('should return no workspaces found', async () => {
    const response = await supertest(app).get('/api/workspace/')
    expect(response.status).toBe(200)
    // expect(response.body).toEqual({ message: 'No products found' })
  })
})

describe('get a workspace', () => {
  test('should return one workspace by its id', async () => {
    const response = await supertest(app).get(`/api/workspace/${workspaceId}`)
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('name', 'testworkspace7')
  })
})
