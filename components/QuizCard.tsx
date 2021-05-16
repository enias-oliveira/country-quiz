import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

import Image from 'next/image'

import { getRandomCountryCode } from '../components/CountryCodes'

import { getRandomIntInclusive, shuffleArray } from '../utils/helpers'

import { Country, Question, Quiz } from '../interfaces'

import styles from '@/styles/QuizCard.module.css'

const QuizCard = (): JSX.Element => {
  const [quiz, setQuiz] = useState<Quiz | undefined>(undefined)

  const getQuestionType = (): Question => {
    return getRandomIntInclusive(0, 1) ? 'flag' : 'capital'
  }

  const getCountry = async (countryCode: string): Country => {
    const BASE_API_URL = 'https://restcountries.eu/rest/v2'

    const response = await axios.get(`${BASE_API_URL}/alpha/${countryCode}`)

    const { name, capital, flag: flagUrl } = response.data

    return { name, capital, flagUrl }
  }

  const getRandomCountry = async (): Country => {
    return getCountry(getRandomCountryCode())
  }

  const getAlternatives = async (quizCountryName: string): string[] => {
    const randomCountriesNames: Country[] = await Promise.all(
      [...new Array(3)].map(async () => {
        const randomCountry = await getRandomCountry()
        return randomCountry.name
      })
    )
    return shuffleArray([...randomCountriesNames, quizCountryName])
  }

  const getRandomQuiz = useCallback(async (): Quiz => {
    const questionType = getQuestionType()
    const country = await getRandomCountry()
    const alternatives = await getAlternatives(country.name)

    const quiz = {
      questionType: questionType,
      alternatives: alternatives,
      correctAlternative: country.name,
      capital: country.capital,
      flagUrl: country.flagUrl,
    }

    setQuiz(quiz)
  }, [])

  useEffect(() => {
    getRandomQuiz()
  }, [getRandomQuiz])

  console.log(quiz)

  const CAPITAL_QUESTION = `${quiz?.capital} is the capital of`
  const FLAG_QUESTION = 'Which country does this flag belongs to?'

  return (
    <>
      {quiz && (
        <div className={styles.container}>
          {quiz.questionType == 'flag' && (
            <Image src={quiz.flagUrl} alt={`${quiz.name} flag`} width={84} height={54} />
          )}
          <h2>{quiz.questionType === 'capital' ? CAPITAL_QUESTION : FLAG_QUESTION}</h2>
          <button>
            <span>A</span> - {quiz.alternatives[0]}
          </button>
          <button>
            <span>B</span> - {quiz.alternatives[1]}
          </button>
          <button>
            <span>C</span> - {quiz.alternatives[2]}
          </button>
          <button>
            <span>D</span> - {quiz.alternatives[3]}
          </button>
        </div>
      )}
    </>
  )
}

export default QuizCard
