import axios from 'axios'

import { getRandomIntInclusive, shuffleArray } from '../../utils/helpers'
import { Country, Question } from '../../interfaces'

import countriesCodes from './data'

export const getRandomCountryCode = (): string => {
  return countriesCodes[getRandomIntInclusive(0, countriesCodes.length - 1)].code
}

export const getQuestionType = (): Question => {
  return getRandomIntInclusive(0, 1) ? 'flag' : 'capital'
}

export const getCountry = async (countryCode: string): Promise<Country> => {
  const BASE_API_URL = 'https://restcountries.eu/rest/v2'

  const response = await axios.get(`${BASE_API_URL}/alpha/${countryCode}`)

  const { name, capital, flag: flagUrl } = response.data

  return { name, capital, flagUrl }
}

export const getRandomCountry = async (): Promise<Country> => {
  try {
    return await getCountry(getRandomCountryCode())
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return await getCountry(getRandomCountryCode())
    } else {
      throw error
    }
  }
}

export const getAlternatives = async (quizCountryName: string): Promise<string[]> => {
  const randomCountriesNames: string[] = await Promise.all(
    [...new Array(3)].map(async () => {
      const randomCountry = await getRandomCountry()
      return randomCountry.name
    })
  )
  return shuffleArray([...randomCountriesNames, quizCountryName])
}
