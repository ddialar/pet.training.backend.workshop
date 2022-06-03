import supertest from 'supertest'
import { randomUUID } from 'crypto'
import { StatusCodes } from 'http-status-codes'
import { server } from '@server'
import { petControllers } from '@controllers'
import { petRepositories } from '@repositories'
import { cleanDatabaseFixture, createPetFixture, createUserFixture } from '@fixtures'
import { PetData } from '@types'
import { RetrievePetError } from '@errors'

const { OK, BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = StatusCodes
const BASE_URL = '/pets/:id'
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
  const mockedPetsData = [
    {
      name: 'Flufy',
      birthday: (new Date()).toISOString(),
      ownerId: ''
    },
    {
      name: 'Blacky',
      birthday: (new Date()).toISOString(),
      ownerId: ''
    }
  ]
  const expectedResult: PetData[] = []

  beforeAll(async () => {
    await cleanDatabaseFixture()
    const persistedUsers = await Promise.all(mockedUsersData.map(createUserFixture))
    expectedResult.push(...(
      await Promise.all(
        mockedPetsData
          .map((pet, index) => ({ ...pet, ownerId: persistedUsers[index].id }))
          .map(createPetFixture)
      )
    ))
  })

  it('returns OK (200) and the selected pet data', async () => {
    const [expectedPet] = expectedResult

    const { status, body } = await request.get(BASE_URL.replace(':id', expectedPet.id))

    expect(status).toEqual(OK)

    const persistedPet: PetData = body
    const expectedPetFields = ['id', 'name', 'birthday', 'enabled', 'createdAt', 'updatedAt']

    Object.keys(persistedPet).forEach(key => expect(expectedPetFields.includes(key)).toBeTruthy())
    expect(persistedPet).toStrictEqual(expectedPet)
  })

  it('returns BAD_REQUEST (400) when the id has not the required structure', async () => {
    const expectedError = { message: 'Id param not valid error' }

    const { status, text } = await request.get(BASE_URL.replace(':id', 'non-valid-structure'))

    expect(status).toEqual(BAD_REQUEST)
    expect(JSON.parse(text)).toStrictEqual(expectedError)
  })

  it('returns BAD_REQUEST (400) when there is an error retrieving the users', async () => {
    jest.spyOn(petRepositories, 'getPet').mockImplementation(() => {
      throw new RetrievePetError('Testing Error')
    })

    const [selectedUser] = expectedResult
    const expectedError = { message: 'Retrieving pet error' }

    const { status, text } = await request.get(BASE_URL.replace(':id', selectedUser.id))

    expect(status).toEqual(BAD_REQUEST)
    expect(JSON.parse(text)).toStrictEqual(expectedError)

    jest.spyOn(petRepositories, 'getPet').mockRestore()
  })

  it('returns NOT_FOUND (404) when when there are no persisted users', async () => {
    const expectedError = { message: 'Pet not found' }

    const { status, text } = await request.get(BASE_URL.replace(':id', randomUUID()))

    expect(status).toEqual(NOT_FOUND)
    expect(JSON.parse(text)).toStrictEqual(expectedError)
  })

  it('returns INTERNAL_SERVER_ERROR (500) when a non controlled error happens', async () => {
    jest.spyOn(petControllers, 'getPetById').mockImplementation(() => {
      throw new Error('Testing Error')
    })

    const [selectedUser] = expectedResult
    const expectedError = { message: 'Something went wrong' }

    const { status, text } = await request.get(BASE_URL.replace(':id', selectedUser.id))

    expect(status).toEqual(INTERNAL_SERVER_ERROR)
    expect(JSON.parse(text)).toStrictEqual(expectedError)

    jest.spyOn(petControllers, 'getPetById').mockRestore()
  })
})
