import { useState, useEffect } from 'react'
import Image from 'next/image'

import { getQuestionType, getRandomCountry, getAlternatives } from './helper'

import { Quiz } from '../../interfaces'

import styles from '@/styles/QuizCard.module.css'

const QuizCard = (): JSX.Element => {
  const [quiz, setQuiz] = useState<Quiz | undefined>(undefined)
  const [correctCount, setCorrectCount] = useState<number>(0)
  const [isQuizAnswered, setIsQuizAnswered] = useState<boolean>(false)
  const [isQuizEnded, setIsQuizEnded] = useState<boolen>(false)

  const [alternativeBackgroundColor, setAlternativeBackgroundColor] = useState<string[]>([
    '',
    '',
    '',
    '',
  ])

  const resetQuiz = async (): void => {
    setCorrectCount(0)
    setIsQuizAnswered(false)
    setIsQuizEnded(false)
    setAlternativeBackgroundColor(['', '', '', ''])
    await getRandomQuiz()
  }

  const getRandomQuiz = async (): void => {
    const questionType = getQuestionType()
    const country = await getRandomCountry()
    const alternatives = await getAlternatives(country.name)
    const randomQuiz: Quiz = {
      questionType: questionType,
      alternatives: alternatives,
      correctAlternativeIndex: alternatives.findIndex((element) => element === country.name),
      capital: country.capital,
      flagUrl: country.flagUrl,
    }

    setQuiz(randomQuiz)
  }

  const handleButton = (selectedAlternativeIdx: string): void => {
    if (selectedAlternativeIdx !== quiz?.correctAlternativeIndex) {
      setAlternativeBackgroundColor((prevState) => {
        const newState = [...prevState]
        newState[selectedAlternativeIdx] = 'red'
        newState[quiz?.correctAlternativeIndex] = 'green'
        return newState
      })
      setIsQuizEnded(true)
    } else {
      setAlternativeBackgroundColor((prevState) => {
        const newState = [...prevState]
        newState[selectedAlternativeIdx] = 'green'
        return newState
      })
      setCorrectCount(correctCount + 1)
      setIsQuizAnswered(true)
    }
  }

  useEffect(() => {
    getRandomQuiz()
  }, [])

  const handleNextButton = (): void => {
    if (!isQuizEnded) {
      setIsQuizAnswered(false)
      setAlternativeBackgroundColor(['', '', '', ''])
      getRandomQuiz()
    }
  }

  const CAPITAL_QUESTION = `${quiz?.capital} is the capital of`
  const FLAG_QUESTION = 'Which country does this flag belongs to?'

  const ALTERNATIVES_LETTERS = ['A', 'B', 'C', 'D']

  return (
    <>
      {quiz && (
        <div className={styles.container}>
          {quiz.questionType == 'flag' && (
            <Image src={quiz.flagUrl} alt={`${quiz.name} flag`} width={84} height={54} />
          )}
          <h2>{quiz.questionType === 'capital' ? CAPITAL_QUESTION : FLAG_QUESTION}</h2>

          {quiz.alternatives.map((alternative, idx) => {
            return (
              <button
                style={{ backgroundColor: alternativeBackgroundColor[idx] }}
                key={idx}
                onClick={() => handleButton(idx)}
              >
                <span>{ALTERNATIVES_LETTERS[idx]}</span> {quiz.alternatives[idx]}
              </button>
            )
          })}

          {isQuizAnswered && (
            <div>
              <button onClick={handleNextButton}>Next</button>
            </div>
          )}
        </div>
      )}
      {isQuizEnded && (
        <div>
          <h4>{correctCount}</h4>
          <button onClick={resetQuiz}>New Game</button>
        </div>
      )}
    </>
  )
}

export default QuizCard
