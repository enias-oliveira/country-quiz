import { useState } from 'react'
import { NextPage } from 'next'

import Layout from '@/components/Layout'
import QuizCard from '@/components/QuizCard'

const Index: NextPage = () => {
  return (
    <Layout title="Country Quiz">
      <h1>COUNTRY QUIZ</h1>
      <QuizCard />
    </Layout>
  )
}

export default Index
