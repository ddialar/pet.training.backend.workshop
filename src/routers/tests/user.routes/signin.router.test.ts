import supertest from 'supertest'
import { StatusCodes } from 'http-status-codes'
import { server } from '@server'
import { userControllers } from '@controllers'
import { cleanDatabaseFixture } from '@fixtures'

const { CREATED, BAD_REQUEST, INTERNAL_SERVER_ERROR } = StatusCodes
const BASE_URL = '/signin'
const request = supertest(server)

describe(`Integration test - POST ${BASE_URL}`, () => {
  beforeAll(async () => {
    await cleanDatabaseFixture()
  })

  it('returns CREATED (201) and the new user is persisted successfully', async () => {
    const payload = {
      email: 'jane@doe.com',
      password: 'janedoepassword',
      firstName: 'Jane',
      lastName: 'Doe'
    }

    const { status, body } = await request.post(BASE_URL).send(payload)

    expect(status).toEqual(CREATED)
    expect(body).toEqual('')
  })

  it('returns BAD_REQUEST (400) when trying to record an already persisted user', async () => {
    const payload = {
      email: 'jane@doe.com',
      password: 'janedoepassword',
      firstName: 'Jane',
      lastName: 'Doe'
    }
    const expectedError = { message: 'User already exists' }

    const { status, text } = await request.post(BASE_URL).send(payload)

    expect(status).toEqual(BAD_REQUEST)
    expect(JSON.parse(text)).toStrictEqual(expectedError)
  })

  it('returns BAD_REQUEST (400) when email is not provided', async () => {
    const payload = {
      password: 'janedoepassword',
      firstName: 'Jane',
      lastName: 'Doe'
    }
    const expectedError = { message: 'Signin payload error' }

    const { status, text } = await request.post(BASE_URL).send(payload)

    expect(status).toEqual(BAD_REQUEST)
    expect(JSON.parse(text)).toStrictEqual(expectedError)
  })

  it('returns BAD_REQUEST (400) when email is malformed', async () => {
    const payload = {
      email: 'jane@',
      password: 'janedoepassword',
      firstName: 'Jane',
      lastName: 'Doe'
    }
    const expectedError = { message: 'Signin payload error' }

    const { status, text } = await request.post(BASE_URL).send(payload)

    expect(status).toEqual(BAD_REQUEST)
    expect(JSON.parse(text)).toStrictEqual(expectedError)
  })

  it('returns BAD_REQUEST (400) when password is not provided', async () => {
    const payload = {
      email: 'jane@doe.com',
      firstName: 'Jane',
      lastName: 'Doe'
    }
    const expectedError = { message: 'Signin payload error' }

    const { status, text } = await request.post(BASE_URL).send(payload)

    expect(status).toEqual(BAD_REQUEST)
    expect(JSON.parse(text)).toStrictEqual(expectedError)
  })

  it('returns BAD_REQUEST (400) when password is too short', async () => {
    const payload = {
      email: 'jane@doe.com',
      password: 'jane',
      firstName: 'Jane',
      lastName: 'Doe'
    }
    const expectedError = { message: 'Signin payload error' }

    const { status, text } = await request.post(BASE_URL).send(payload)

    expect(status).toEqual(BAD_REQUEST)
    expect(JSON.parse(text)).toStrictEqual(expectedError)
  })

  it('returns BAD_REQUEST (400) when password contains non valid characters', async () => {
    const payload = {
      email: 'jane@doe.com',
      password: 'janedoepassword%&',
      firstName: 'Jane',
      lastName: 'Doe'
    }
    const expectedError = { message: 'Signin payload error' }

    const { status, text } = await request.post(BASE_URL).send(payload)

    expect(status).toEqual(BAD_REQUEST)
    expect(JSON.parse(text)).toStrictEqual(expectedError)
  })

  it('returns BAD_REQUEST (400) when firstName is not provided', async () => {
    const payload = {
      email: 'jane@doe.com',
      password: 'janedoepassword',
      lastName: 'Doe'
    }
    const expectedError = { message: 'Signin payload error' }

    const { status, text } = await request.post(BASE_URL).send(payload)

    expect(status).toEqual(BAD_REQUEST)
    expect(JSON.parse(text)).toStrictEqual(expectedError)
  })

  it('returns BAD_REQUEST (400) when firstName is an empty string', async () => {
    const payload = {
      email: 'jane@doe.com',
      password: 'janedoepassword',
      firstName: '',
      lastName: 'Doe'
    }
    const expectedError = { message: 'Signin payload error' }

    const { status, text } = await request.post(BASE_URL).send(payload)

    expect(status).toEqual(BAD_REQUEST)
    expect(JSON.parse(text)).toStrictEqual(expectedError)
  })

  it('returns BAD_REQUEST (400) when lastName is not provided', async () => {
    const payload = {
      email: 'jane@doe.com',
      password: 'janedoepassword',
      firstName: 'Jane'
    }
    const expectedError = { message: 'Signin payload error' }

    const { status, text } = await request.post(BASE_URL).send(payload)

    expect(status).toEqual(BAD_REQUEST)
    expect(JSON.parse(text)).toStrictEqual(expectedError)
  })

  it('returns BAD_REQUEST (400) when lastName is an empty string', async () => {
    const payload = {
      email: 'jane@doe.com',
      password: 'janedoepassword',
      firstName: 'Jane',
      lastName: ''
    }
    const expectedError = { message: 'Signin payload error' }

    const { status, text } = await request.post(BASE_URL).send(payload)

    expect(status).toEqual(BAD_REQUEST)
    expect(JSON.parse(text)).toStrictEqual(expectedError)
  })

  it('returns INTERNAL_SERVER_ERROR (500) when a non controlled error happens', async () => {
    jest.spyOn(userControllers, 'signin').mockImplementation(() => {
      throw new Error('Testing Error')
    })

    const payload = {
      email: 'jane@doe.com',
      password: 'janedoepassword',
      firstName: 'Jane',
      lastName: 'Doe'
    }
    const expectedError = { message: 'Something went wrong' }

    const { status, text } = await request.post(BASE_URL).send(payload)

    expect(status).toEqual(INTERNAL_SERVER_ERROR)
    expect(JSON.parse(text)).toStrictEqual(expectedError)

    jest.spyOn(userControllers, 'signin').mockRestore()
  })
})
