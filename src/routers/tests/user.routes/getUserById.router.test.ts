import supertest from 'supertest'
import { StatusCodes } from 'http-status-codes'
import { server } from '@server'
import { userControllers } from '@controllers'
import { userRepositories } from '@repositories'
import { cleanDatabaseFixture, createUserFixture } from '@fixtures'
import { RetrieveUserError } from '@errors'
import { UserWithProfile } from '@types'

const { OK, BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = StatusCodes
const BASE_URL = '/users/:id'
const request = supertest(server)

describe(`Integration test - GET ${BASE_URL}`, () => {
  const mockedUsersData = [
    {
      email: 'jane@doe.com',
      password: 'janedoepassword',
      firstName: 'Jane',
      lastName: 'Doe'
    },
    {
      email: 'john@doe.com',
      password: 'johndoepassword',
      firstName: 'John',
      lastName: 'Doe'
    }
  ]
  const spectedResult: UserWithProfile[] = []

  beforeAll(async () => {
    await cleanDatabaseFixture()
    const persistedUsers = await Promise.all(mockedUsersData.map(createUserFixture))
    persistedUsers.map(user => spectedResult.push(user))
  })

  it('returns OK (200) and the selected user data', async () => {
    const [selectedUser] = spectedResult

    const { status, body } = await request.get(BASE_URL.replace(':id', selectedUser.id))

    expect(status).toEqual(OK)
    expect(body).toStrictEqual(selectedUser)
  })

  it('returns BAD_REQUEST (400) when the id has not the required structure', async () => {
    jest.spyOn(userRepositories, 'getUser').mockImplementation(() => {
      throw new RetrieveUserError('Testing Error')
    })

    const expectedError = { message: 'Id param not valid error' }

    const { status, text } = await request.get(BASE_URL.replace(':id', 'non-valid-structure'))

    expect(status).toEqual(BAD_REQUEST)
    expect(JSON.parse(text)).toStrictEqual(expectedError)

    jest.spyOn(userRepositories, 'getUser').mockRestore()
  })

  it('returns BAD_REQUEST (400) when there is an error retrieving the users', async () => {
    jest.spyOn(userRepositories, 'getUser').mockImplementation(() => {
      throw new RetrieveUserError('Testing Error')
    })

    const [selectedUser] = spectedResult
    const expectedError = { message: 'Retrieving user error' }

    const { status, text } = await request.get(BASE_URL.replace(':id', selectedUser.id))

    expect(status).toEqual(BAD_REQUEST)
    expect(JSON.parse(text)).toStrictEqual(expectedError)

    jest.spyOn(userRepositories, 'getUser').mockRestore()
  })

  it('returns NOT_FOUND (404) when when there are no persisted users', async () => {
    await cleanDatabaseFixture()

    const [selectedUser] = spectedResult
    const expectedError = { message: 'User not found' }

    const { status, text } = await request.get(BASE_URL.replace(':id', selectedUser.id))

    expect(status).toEqual(NOT_FOUND)
    expect(JSON.parse(text)).toStrictEqual(expectedError)
  })

  it('returns INTERNAL_SERVER_ERROR (500) when a non controlled error happens', async () => {
    jest.spyOn(userControllers, 'getUserById').mockImplementation(() => {
      throw new Error('Testing Error')
    })

    const [selectedUser] = spectedResult
    const expectedError = { message: 'Something went wrong' }

    const { status, text } = await request.get(BASE_URL.replace(':id', selectedUser.id))

    expect(status).toEqual(INTERNAL_SERVER_ERROR)
    expect(JSON.parse(text)).toStrictEqual(expectedError)

    jest.spyOn(userControllers, 'getUserById').mockRestore()
  })
})
