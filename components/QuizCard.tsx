import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

import { Country, Question, Quiz } from '../interfaces'

import styles from '@/styles/QuizCard.module.css'

const QuizCard = (): JSX.Element => {
  const [quiz, setQuiz] = useState<Quiz | undefined>(undefined)

  const getRandomIntInclusive = (min: number, max: number): number => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

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
    try {
      return await getCountry('xy')
    } catch {
      return await getCountry('us')
    }
  }

  const getRandomQuiz = useCallback(async (): Quiz => {
    const questionType = getQuestionType()
    const country = await getRandomCountry()

    const quiz = {
      questionType: questionType,
      alternatives: ['Gambia', country.name, 'Canada', 'Denmark'],
      correctAlternative: country.name,
    }

    //questionType === 'flag' ? (quiz.flagUrl = country.flagUrl) : (quiz.capital = country.capital)
    quiz.capital = country.capital

    setQuiz(quiz)
  }, [])

  useEffect(() => {
    getRandomQuiz()
  }, [getRandomQuiz])

  console.log(quiz)

  return (
    <>
      {quiz && (
        <div className={styles.container}>
          <h2>{quiz.capital} is the capital of</h2>
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
