import { ReactNode } from 'react'
import Head from 'next/head'

type Props = {
  children?: ReactNode
  title?: string
}

import styles from '@/styles/Layout.module.css'

const Layout = ({ children, title = 'Default title' }: Props): JSX.Element => (
  <>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <div className={styles.container}>
      {children}
      <footer className={styles.footer}>
        Created By Enias Oliveira, a challenge by devChallenges.io
      </footer>
    </div>
  </>
)

export default Layout
