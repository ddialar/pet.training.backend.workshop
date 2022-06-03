import supertest from 'supertest'
import { StatusCodes } from 'http-status-codes'
import { server } from '@server'
import { authControllers } from '@controllers'
import { cleanDatabaseFixture, createUserFixture, JWT_REGEX } from '@fixtures'

const { OK, BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = StatusCodes
const BASE_URL = '/login'
const request = supertest(server)

describe(`Integration test - POST ${BASE_URL}`, () => {
  const mockedUserData = {
    email: 'jane@doe.com',
    password: 'janedoepassword',
    firstName: 'Jane',
    lastName: 'Doe'
  }

  beforeAll(async () => {
    await cleanDatabaseFixture()
    await createUserFixture(mockedUserData)
  })

  it('returns OK (200) with the new user token', async () => {
    const payload = {
      username: mockedUserData.email,
      password: mockedUserData.password
    }

    const { status, body } = await request.post(BASE_URL).send(payload)

    expect(status).toEqual(OK)
    expect(body).not.toBeUndefined()
    expect(body).not.toBeNull()

    const expectedFields = ['token']

    Object.keys(body).forEach(key => expect(expectedFields.includes(key)).toBeTruthy())
    expect(body.token).toMatch(JWT_REGEX)
  })

  it('returns BAD_REQUEST (400) when email is not provided', async () => {
    const payload = {
      password: mockedUserData.password
    }
    const expectedError = { message: 'Login payload error' }

    const { status, text } = await request.post(BASE_URL).send(payload)

    expect(status).toEqual(BAD_REQUEST)
    expect(JSON.parse(text)).toStrictEqual(expectedError)
  })

  it('returns BAD_REQUEST (400) when email is malformed', async () => {
    const payload = {
      username: 'jane@',
      password: mockedUserData.password
    }
    const expectedError = { message: 'Login payload error' }

    const { status, text } = await request.post(BASE_URL).send(payload)

    expect(status).toEqual(BAD_REQUEST)
    expect(JSON.parse(text)).toStrictEqual(expectedError)
  })

  it('returns BAD_REQUEST (400) when password is not provided', async () => {
    const payload = {
      username: mockedUserData.email
    }
    const expectedError = { message: 'Login payload error' }

    const { status, text } = await request.post(BASE_URL).send(payload)

    expect(status).toEqual(BAD_REQUEST)
    expect(JSON.parse(text)).toStrictEqual(expectedError)
  })

  it('returns BAD_REQUEST (400) when password is too short', async () => {
    const payload = {
      username: mockedUserData.email,
      password: 'jane'
    }
    const expectedError = { message: 'Login payload error' }

    const { status, text } = await request.post(BASE_URL).send(payload)

    expect(status).toEqual(BAD_REQUEST)
    expect(JSON.parse(text)).toStrictEqual(expectedError)
  })

  it('returns BAD_REQUEST (400) when password contains non valid characters', async () => {
    const payload = {
      username: mockedUserData.email,
      password: 'janedoepassword%&'
    }
    const expectedError = { message: 'Login payload error' }

    const { status, text } = await request.post(BASE_URL).send(payload)

    expect(status).toEqual(BAD_REQUEST)
    expect(JSON.parse(text)).toStrictEqual(expectedError)
  })

  it('returns NOT_FOUND (404) when the user does not exist', async () => {
    const payload = {
      username: 'mr@unknown.com',
      password: 'mrunknown123'
    }
    const expectedError = { message: 'User not found' }

    const { status, text } = await request.post(BASE_URL).send(payload)

    expect(status).toEqual(NOT_FOUND)
    expect(JSON.parse(text)).toStrictEqual(expectedError)
  })

  it('returns INTERNAL_SERVER_ERROR (500) when a non controlled error happens', async () => {
    jest.spyOn(authControllers, 'login').mockImplementation(() => {
      throw new Error('Testing Error')
    })

    const payload = {
      username: mockedUserData.email,
      password: mockedUserData.password
    }
    const expectedError = { message: 'Something went wrong' }

    const { status, text } = await request.post(BASE_URL).send(payload)

    expect(status).toEqual(INTERNAL_SERVER_ERROR)
    expect(JSON.parse(text)).toStrictEqual(expectedError)

    jest.spyOn(authControllers, 'login').mockRestore()
  })
})
