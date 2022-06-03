import supertest from 'supertest'
import { randomUUID } from 'crypto'
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
  const expectedResult: UserWithProfile[] = []

  beforeAll(async () => {
    await cleanDatabaseFixture()
    expectedResult.push(...(await Promise.all(mockedUsersData.map(createUserFixture))))
  })

  it('returns OK (200) and the selected user data', async () => {
    const [expectedUser] = expectedResult

    const { status, body } = await request.get(BASE_URL.replace(':id', expectedUser.id))

    expect(status).toEqual(OK)

    const persistedUser: UserWithProfile = body
    const expectedUserFields = ['id', 'username', 'password', 'enabled', 'profile', 'createdAt', 'updatedAt']
    const expectedUserProfileFields = ['id', 'firstName', 'lastName', 'email', 'userId']

    Object.keys(persistedUser).forEach(key => expect(expectedUserFields.includes(key)).toBeTruthy())
    Object.keys(persistedUser.profile).forEach(key => expect(expectedUserProfileFields.includes(key)).toBeTruthy())
    expect(persistedUser).toStrictEqual(expectedUser)
  })

  it('returns BAD_REQUEST (400) when the id has not the required structure', async () => {
    const expectedError = { message: 'Id param not valid error' }

    const { status, text } = await request.get(BASE_URL.replace(':id', 'non-valid-structure'))

    expect(status).toEqual(BAD_REQUEST)
    expect(JSON.parse(text)).toStrictEqual(expectedError)
  })

  it('returns BAD_REQUEST (400) when there is an error retrieving the users', async () => {
    jest.spyOn(userRepositories, 'getUser').mockImplementation(() => {
      throw new RetrieveUserError('Testing Error')
    })

    const [selectedUser] = expectedResult
    const expectedError = { message: 'Retrieving user error' }

    const { status, text } = await request.get(BASE_URL.replace(':id', selectedUser.id))

    expect(status).toEqual(BAD_REQUEST)
    expect(JSON.parse(text)).toStrictEqual(expectedError)

    jest.spyOn(userRepositories, 'getUser').mockRestore()
  })

  it('returns NOT_FOUND (404) when when there are no persisted users', async () => {
    const expectedError = { message: 'User not found' }

    const { status, text } = await request.get(BASE_URL.replace(':id', randomUUID()))

    expect(status).toEqual(NOT_FOUND)
    expect(JSON.parse(text)).toStrictEqual(expectedError)
  })

  it('returns INTERNAL_SERVER_ERROR (500) when a non controlled error happens', async () => {
    jest.spyOn(userControllers, 'getUserById').mockImplementation(() => {
      throw new Error('Testing Error')
    })

    const [selectedUser] = expectedResult
    const expectedError = { message: 'Something went wrong' }

    const { status, text } = await request.get(BASE_URL.replace(':id', selectedUser.id))

    expect(status).toEqual(INTERNAL_SERVER_ERROR)
    expect(JSON.parse(text)).toStrictEqual(expectedError)

    jest.spyOn(userControllers, 'getUserById').mockRestore()
  })
})
