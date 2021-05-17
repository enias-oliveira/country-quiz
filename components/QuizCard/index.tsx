import { useState, useEffect } from 'react'
import Image from 'next/image'

import { getQuestionType, getRandomCountry, getAlternatives } from './helper'

import { Quiz } from '../../interfaces'

import styles from '@/styles/QuizCard.module.css'

const QuizCard = (): JSX.Element => {
  const [quiz, setQuiz] = useState<Quiz | undefined>(undefined)
  const [correctCount, setCorrectCount] = useState<number>(0)

  const getRandomQuiz = async (): Quiz => {
    const questionType = getQuestionType()
    const country = await getRandomCountry()
    const alternatives = await getAlternatives(country.name)

    setQuiz({
      questionType: questionType,
      alternatives: alternatives,
      correctAlternative: country.name,
      capital: country.capital,
      flagUrl: country.flagUrl,
    })
  }

  const handleButton = (selectedAlternative: string): void => {
    if (selectedAlternative === quiz.correctAlternative) {
      setCorrectCount(correctCount + 1)
    }

    getRandomQuiz()
  }

  useEffect(() => {
    getRandomQuiz()
  }, [])

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
              <button key={idx} onClick={() => handleButton(quiz.alternatives[idx])}>
                <span>{ALTERNATIVES_LETTERS[idx]}</span> {quiz.alternatives[idx]}
              </button>
            )
          })}
        </div>
      )}
      <h4>{correctCount}</h4>
    </>
  )
}

export default QuizCard
