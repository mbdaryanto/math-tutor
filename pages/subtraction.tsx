import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import CheckIcon from '@material-ui/icons/Check'
import HomeIcon from '@material-ui/icons/Home'
import styles from '../styles/Home.module.css'

const Subtraction = () => (
  <div className={styles.container}>
    <Head>
      <title>Subtraction</title>
    </Head>
    <main className={styles.main}>
      <h4 className={styles.title}>
        <Link href="/">
          <a>
            <HomeIcon style={{ fontSize: 50 }}/>
          </a>
        </Link>
        {' '}
        Subtraction
      </h4>
      <div className={styles.grid}>
        <MultipleProblem min={0} max={19} count={5}/>        
      </div>
    </main>
  </div>
)

interface Question {
  left: number
  right: number
}

function isAnswerCorrect(question: Question, answer: string): boolean {
  const value = parseInt(answer)
  return (question.left - question.right === value)
}

const MultipleProblem = ({min, max, count}: {
  min: number,
  max: number,
  count: number,
}) => {
  const [isLoading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    setLoading(true)
    const arr = Array(count).fill('')
    setQuestions(arr.map(() => {
      const left = Math.floor(Math.random() * (max - min) + min + 1)
      const right = Math.floor(Math.random() * (left - min + 1) + min)
      return { left: left, right: right }
    }))
    setResults(arr)
    setLoading(false)
  }, [min, max, count])

  const handleResultChange = (changeIndex: number) => (newValue: string) => {
    setResults(results.map((oldValue, index) => index === changeIndex ? newValue : oldValue))
  }

  if (isLoading) {
    return <div>Loading ...</div>
  }
  
  return (
    <>
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
    </>
  )
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