import styles from '@/styles/QuizCard.module.css'

const QuizCard = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <h2>Baghad is the capital of</h2>
      <button>
        <span>A</span>Gambia
      </button>
    </div>
  )
}

export default QuizCard
