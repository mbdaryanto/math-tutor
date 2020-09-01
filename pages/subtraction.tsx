import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import CheckIcon from '@material-ui/icons/Check'
import HomeIcon from '@material-ui/icons/Home'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import styles from '../styles/Home.module.css'
// import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'

// export const getStaticProps: GetStaticProps = async (context) => {
//   return {
//     props: {
//       min: 0,
//       max: 10,
//       count: 5,
//     },
//   }
// }

const Subtraction = () => {
  const router = useRouter();

  const [isLoading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [results, setResults] = useState<string[]>([]);

  const min = parseInt(router.query.min || '1')
  const max = parseInt(router.query.max || '9')
  const count = parseInt(router.query.count || '5')

  const reset = () => {
    setLoading(true)
    const arr = Array(count).fill('')
    setQuestions(arr.map(() => {
      const left = Math.floor(Math.random() * (max - min) + min + 1)
      const right = Math.floor(Math.random() * (left - min + 1) + min)
      return { left: left, right: right }
    }))
    setResults(arr)
    setLoading(false)
  }

  useEffect(reset, [min, max, count])

  const handleResultChange = (changeIndex: number) => (newValue: string) => {
    setResults(results.map((oldValue, index) => index === changeIndex ? newValue : oldValue))
  }

  if (isLoading) {
    return <div>Loading ...</div>
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Subtraction</title>
      </Head>
      <main className={styles.main}>
        <h4 className={styles.title}>
          <Link href="/">
            <button className={styles.link}>
              <HomeIcon className={styles.linkicon}/>
            </button>
          </Link>
          {' '}
          Subtraction
          {' '}
          <button className={styles.link}>
            <AutorenewIcon className={styles.linkicon} onClick={() => reset()}/>
          </button>
        </h4>
        <div className={styles.grid}>
          {questions.map((question, index) => (
            <Problem
              key={index}
              left={question.left}
              right={question.right}
              result={results[index]}
              onChange={handleResultChange(index)}
              isCorrect={isAnswerCorrect(question, results[index])}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

interface Question {
  left: number
  right: number
}

function isAnswerCorrect(question: Question, answer: string): boolean {
  const value = parseInt(answer)
  return (question.left - question.right === value)
}

const Problem = ({left, right, result, onChange, isCorrect}: {
  left: number,
  right: number,
  result: string,
  onChange: {(value: string): void},
  isCorrect: boolean,
}) => (
  <div className={styles.full}>
    <span className={styles.operand}>{left}</span>
    <span className={styles.operator}>-</span>
    <span className={styles.operand}>{right}</span>
    <span className={styles.operator}>=</span>
    <input type="number" className={styles.result} value={result} onChange={(event) => onChange(event.target.value)} />
    <span className={styles.checkresult}>{ isCorrect ? <CheckIcon fontSize="large" /> : '' }</span>
  </div>
)

export default Subtraction