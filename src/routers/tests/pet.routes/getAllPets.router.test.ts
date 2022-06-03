import supertest from 'supertest'
import { StatusCodes } from 'http-status-codes'
import { server } from '@server'
import { userControllers } from '@controllers'
import { userRepositories } from '@repositories'
import { cleanDatabaseFixture, createUserFixture } from '@fixtures'
import { UserWithProfile } from '@types'
import { RetrieveUserError } from '@errors'

const { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR } = StatusCodes
const BASE_URL = '/users'
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

  it('returns OK (200) and the set of persisted users', async () => {
    const { status, body } = await request.get(BASE_URL)

    expect(status).toEqual(OK)

    const persistedUsers: UserWithProfile[] = body
    const expectedUserFields = ['id', 'username', 'password', 'enabled', 'profile', 'createdAt', 'updatedAt']
    const expectedUserProfileFields = ['id', 'firstName', 'lastName', 'email', 'userId']

    expect(persistedUsers).toHaveLength(expectedResult.length)
    persistedUsers.forEach(user => {
      const expectedUser = expectedResult.find(({ id }) => user.id === id)
      Object.keys(user).forEach(key => expect(expectedUserFields.includes(key)).toBeTruthy())
      Object.keys(user.profile).forEach(key => expect(expectedUserProfileFields.includes(key)).toBeTruthy())
      expect(user).toStrictEqual(expectedUser)
    })
  })

  it('returns OK (200) and an empty array when there are no persisted users', async () => {
    await cleanDatabaseFixture()

    const { status, body } = await request.get(BASE_URL)

    expect(status).toEqual(OK)
    expect(body).toHaveLength(0)
  })

  it('returns BAD_REQUEST (400) when there is an error retrieving the users', async () => {
    jest.spyOn(userRepositories, 'getAllUsers').mockImplementation(() => {
      throw new RetrieveUserError('Testing Error')
    })

    const expectedError = { message: 'Retrieving user error' }

    const { status, text } = await request.get(BASE_URL)

    expect(status).toEqual(BAD_REQUEST)
    expect(JSON.parse(text)).toStrictEqual(expectedError)

    jest.spyOn(userRepositories, 'getAllUsers').mockRestore()
  })

  it('returns INTERNAL_SERVER_ERROR (500) when a non controlled error happens', async () => {
    jest.spyOn(userControllers, 'getAllUsers').mockImplementation(() => {
      throw new Error('Testing Error')
    })

    const expectedError = { message: 'Something went wrong' }

    const { status, text } = await request.get(BASE_URL)

    expect(status).toEqual(INTERNAL_SERVER_ERROR)
    expect(JSON.parse(text)).toStrictEqual(expectedError)

    jest.spyOn(userControllers, 'getAllUsers').mockRestore()
  })
})
