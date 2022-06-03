import supertest from 'supertest'
import { StatusCodes } from 'http-status-codes'
import { server } from '@server'
import { petControllers } from '@controllers'
import { cleanDatabaseFixture, createUserFixture, UUID4_REGEX, DATE_REGEX } from '@fixtures'
import { PetData } from '@types'
import { petRequests } from '@orm'

const { CREATED, BAD_REQUEST, INTERNAL_SERVER_ERROR } = StatusCodes
const BASE_URL = '/pets'
const request = supertest(server)

describe(`Integration test - POST ${BASE_URL}`, () => {
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

  beforeAll(async () => {
    await cleanDatabaseFixture()
    await Promise.all(mockedUsersData.map(createUserFixture))
  })

  it('returns CREATED (201) and the new pet is persisted successfully', async () => {
    const [{ email: ownerEmail }] = mockedUsersData
    const payload = {
      name: 'Flufy',
      birthday: (new Date()).toISOString(),
      ownerEmail
    }

    const { status, body } = await request.post(BASE_URL).send(payload)

    expect(status).toEqual(CREATED)
    expect(body).not.toBeUndefined()
    expect(body).not.toBeNull()
    expect(body).not.toEqual('')

    const response: PetData = body
    const expectedPetFields = ['id', 'enabled', 'name', 'birthday', 'createdAt', 'updatedAt']

    expect(Object.keys(response)).toHaveLength(expectedPetFields.length)
    Object.keys(response).forEach(key => expect(expectedPetFields.includes(key)).toBeTruthy())

    expect(response.id).toMatch(UUID4_REGEX)
    expect(response.name).toBe(payload.name)
    expect(response.birthday).toBe(payload.birthday)
    expect(response.enabled).toBeTruthy()
    expect(response.createdAt).toMatch(DATE_REGEX)
    expect(response.updatedAt).toMatch(DATE_REGEX)
  })

  it('returns CREATED (201) and the new pet is persisted successfully with the same name but different owner', async () => {
    const [{ email: ownerEmail }] = mockedUsersData.reverse()
    const payload = {
      name: 'Blacky',
      birthday: (new Date()).toISOString(),
      ownerEmail
    }

    const { status, body } = await request.post(BASE_URL).send(payload)

    expect(status).toEqual(CREATED)
    expect(body).not.toBeUndefined()
    expect(body).not.toBeNull()
    expect(body).not.toEqual('')

    const expectedPetFields = ['id', 'enabled', 'name', 'birthday', 'createdAt', 'updatedAt']
    const response = body as PetData

    expect(Object.keys(response)).toHaveLength(expectedPetFields.length)
    Object.keys(response).forEach(key => expect(expectedPetFields.includes(key)).toBeTruthy())

    expect(response.id).toMatch(UUID4_REGEX)
    expect(response.name).toBe(payload.name)
    expect(response.birthday).toBe(payload.birthday)
    expect(response.enabled).toBeTruthy()
    expect(response.createdAt).toMatch(DATE_REGEX)
    expect(response.updatedAt).toMatch(DATE_REGEX)
  })

  it.todo('returns BAD_REQUEST (400) when trying to record the same pet name for the same owner')

  it('returns BAD_REQUEST (400) when name is not provided', async () => {
    const [{ email: ownerEmail }] = mockedUsersData
    const payload = {
      birthday: (new Date()).toISOString(),
      ownerEmail
    }
    const expectedError = { message: 'New pet payload error' }

    const { status, text } = await request.post(BASE_URL).send(payload)

    expect(status).toEqual(BAD_REQUEST)
    expect(JSON.parse(text)).toStrictEqual(expectedError)
  })

  it('returns BAD_REQUEST (400) when the name is empty', async () => {
    const [{ email: ownerEmail }] = mockedUsersData
    const payload = {
      name: '',
      birthday: (new Date()).toISOString(),
      ownerEmail
    }
    const expectedError = { message: 'New pet payload error' }

    const { status, text } = await request.post(BASE_URL).send(payload)

    expect(status).toEqual(BAD_REQUEST)
    expect(JSON.parse(text)).toStrictEqual(expectedError)
  })

  it('returns BAD_REQUEST (400) when the birthday is not provided', async () => {
    const [{ email: ownerEmail }] = mockedUsersData
    const payload = {
      name: 'Kiwi',
      ownerEmail
    }
    const expectedError = { message: 'New pet payload error' }

    const { status, text } = await request.post(BASE_URL).send(payload)

    expect(status).toEqual(BAD_REQUEST)
    expect(JSON.parse(text)).toStrictEqual(expectedError)
  })

  it('returns BAD_REQUEST (400) when the birthday is empty', async () => {
    const [{ email: ownerEmail }] = mockedUsersData
    const payload = {
      name: 'Kiwi',
      birthday: '',
      ownerEmail
    }
    const expectedError = { message: 'New pet payload error' }

    const { status, text } = await request.post(BASE_URL).send(payload)

    expect(status).toEqual(BAD_REQUEST)
    expect(JSON.parse(text)).toStrictEqual(expectedError)
  })

  it('returns BAD_REQUEST (400) when owner email is not provided', async () => {
    const payload = {
      name: 'Kiwi',
      birthday: (new Date()).toISOString()
    }
    const expectedError = { message: 'New pet payload error' }

    const { status, text } = await request.post(BASE_URL).send(payload)

    expect(status).toEqual(BAD_REQUEST)
    expect(JSON.parse(text)).toStrictEqual(expectedError)
  })

  it('returns BAD_REQUEST (400) when owner email is malformed', async () => {
    const payload = {
      name: 'Kiwi',
      birthday: (new Date()).toISOString(),
      ownerEmail: 'test@'
    }
    const expectedError = { message: 'New pet payload error' }

    const { status, text } = await request.post(BASE_URL).send(payload)

    expect(status).toEqual(BAD_REQUEST)
    expect(JSON.parse(text)).toStrictEqual(expectedError)
  })

  it('returns BAD_REQUEST (400) when owner email is empty', async () => {
    const payload = {
      name: 'Kiwi',
      birthday: (new Date()).toISOString(),
      ownerEmail: ''
    }
    const expectedError = { message: 'New pet payload error' }

    const { status, text } = await request.post(BASE_URL).send(payload)

    expect(status).toEqual(BAD_REQUEST)
    expect(JSON.parse(text)).toStrictEqual(expectedError)
  })

  it('returns BAD_REQUEST (400) when the persisting process fails', async () => {
    jest.spyOn(petRequests, 'createPet').mockImplementation(() => {
      throw new Error('Testing Error')
    })

    const [{ email: ownerEmail }] = mockedUsersData
    const payload = {
      name: 'Kiwi',
      birthday: (new Date()).toISOString(),
      ownerEmail
    }
    const expectedError = { message: 'Creating new pet error' }

    const { status, text } = await request.post(BASE_URL).send(payload)

    expect(status).toEqual(BAD_REQUEST)
    expect(JSON.parse(text)).toStrictEqual(expectedError)

    jest.spyOn(petRequests, 'createPet').mockRestore()
  })

  it('returns INTERNAL_SERVER_ERROR (500) when a non controlled error happens', async () => {
    jest.spyOn(petControllers, 'createPet').mockImplementation(() => {
      throw new Error('Testing Error')
    })

    const [{ email: ownerEmail }] = mockedUsersData
    const payload = {
      name: 'Kiwi',
      birthday: (new Date()).toISOString(),
      ownerEmail
    }
    const expectedError = { message: 'Something went wrong' }

    const { status, text } = await request.post(BASE_URL).send(payload)

    expect(status).toEqual(INTERNAL_SERVER_ERROR)
    expect(JSON.parse(text)).toStrictEqual(expectedError)

    jest.spyOn(petControllers, 'createPet').mockRestore()
  })
})
