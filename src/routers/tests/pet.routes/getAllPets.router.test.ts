import supertest from 'supertest'
import { StatusCodes } from 'http-status-codes'
import { server } from '@server'
import { petControllers } from '@controllers'
import { petRepositories } from '@repositories'
import { cleanDatabaseFixture, createPetFixture, createUserFixture } from '@fixtures'
import { PetData } from '@types'
import { RetrievePetError } from '@errors'

const { OK, BAD_REQUEST, INTERNAL_SERVER_ERROR } = StatusCodes
const BASE_URL = '/pets'
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

  it('returns OK (200) and the set of persisted pets', async () => {
    const { status, body } = await request.get(BASE_URL)

    expect(status).toEqual(OK)

    const persistedPets: PetData[] = body
    const expectedPetFields = ['id', 'name', 'birthday', 'enabled', 'createdAt', 'updatedAt']

    expect(persistedPets).toHaveLength(expectedResult.length)
    persistedPets.forEach(pet => {
      const expectedPet = expectedResult.find(({ id }) => pet.id === id)
      Object.keys(pet).forEach(key => expect(expectedPetFields.includes(key)).toBeTruthy())
      expect(pet).toStrictEqual(expectedPet)
    })
  })

  it('returns OK (200) and an empty array when there are no persisted pets', async () => {
    await cleanDatabaseFixture()

    const { status, body } = await request.get(BASE_URL)

    expect(status).toEqual(OK)
    expect(body).toHaveLength(0)
  })

  it('returns BAD_REQUEST (400) when there is an error retrieving the pets', async () => {
    jest.spyOn(petRepositories, 'getAllPets').mockImplementation(() => {
      throw new RetrievePetError('Testing Error')
    })

    const expectedError = { message: 'Retrieving pet error' }

    const { status, text } = await request.get(BASE_URL)

    expect(status).toEqual(BAD_REQUEST)
    expect(JSON.parse(text)).toStrictEqual(expectedError)

    jest.spyOn(petRepositories, 'getAllPets').mockRestore()
  })

  it('returns INTERNAL_SERVER_ERROR (500) when a non controlled error happens', async () => {
    jest.spyOn(petControllers, 'getAllPets').mockImplementation(() => {
      throw new Error('Testing Error')
    })

    const expectedError = { message: 'Something went wrong' }

    const { status, text } = await request.get(BASE_URL)

    expect(status).toEqual(INTERNAL_SERVER_ERROR)
    expect(JSON.parse(text)).toStrictEqual(expectedError)

    jest.spyOn(petControllers, 'getAllPets').mockRestore()
  })
})
