import Layout from '@/components/Layout'
import QuizCard from '@/components/QuizCard'
import { NextPage } from 'next'

const Index: NextPage = () => {
  return (
    <Layout title="Country Quiz">
      <QuizCard />
    </Layout>
  )
}

export default Index
