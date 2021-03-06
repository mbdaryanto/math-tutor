import Head from 'next/head'
import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import CheckIcon from '@material-ui/icons/Check'
import HomeIcon from '@material-ui/icons/Home'
import AutorenewIcon from '@material-ui/icons/Autorenew'
import TimerIcon from '@material-ui/icons/Timer'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import classNames from 'classnames'
import moment from 'moment'

interface QueryString {
  min?: string
  max?: string
  count?: string
}

const Addition = () => {
  const router = useRouter()

  const [isLoading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [results, setResults] = useState<string[]>([]);
  const [startTime, setStartTime] = useState(moment());
  const [stopwatch, setStopwatch] = useState(moment.duration(0));


  const query: QueryString = router.query as QueryString;

  const min = parseInt(query.min ?? '1')
  const max = parseInt(query.max ?? '9')
  const count = parseInt(query.count ?? '5')

  const reset = () => {
    setLoading(true)
    const arr = Array(count).fill('')
    setQuestions(arr.map(() => ({
      left: Math.floor(Math.random() * (max - min + 1) + min),
      right: Math.floor(Math.random() * (max - min + 1) + min),
    })))
    setResults(arr)
    setLoading(false)
    setStartTime(moment())
  }

  useEffect(reset, [min, max, count])
  useEffect(() => {
    const intervalId = setInterval(() => {
      const isAllCorrect = questions.every((question, index) => isAnswerCorrect(question, results[index]))
      if (!isAllCorrect) {
        setStopwatch(moment.duration(moment().diff(startTime)))
      }
    }, 100)
    return () => clearInterval(intervalId)
  }, [startTime, questions, results])

  const handleResultChange = (changeIndex: number) => (newValue: string) => {
    setResults(results.map((oldValue, index) => index === changeIndex ? newValue : oldValue))
  }

  if (isLoading) {
    return <div>Loading ...</div>
  }

  const firstIncorrectIndex = questions.findIndex((question, index) => !isAnswerCorrect(question, results[index]))

  return (
    <div className={styles.container}>
      <Head>
        <title>Addition</title>
      </Head>
      <main className={styles.main}>
        <h4 className={styles.subtitle}>
          <Link href="/">
            <button className={classNames(styles.btn, styles.info)}>
              <HomeIcon/>
            </button>
          </Link>
          {' '}
          Addition
          {' '}
          <button className={classNames(styles.btn, styles.info)} onClick={() => reset()}>
            <AutorenewIcon/>
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
              focused={index === firstIncorrectIndex}
            />
          ))}
        </div>
        <div className={styles.timer}>
          <TimerIcon/>{' '}
          {stopwatch.asSeconds().toFixed(1)}
          {' '}
          s
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
  return (question.left + question.right === value)
}

const Problem = ({left, right, result, onChange, isCorrect, focused}: {
  left: number,
  right: number,
  result: string,
  onChange: {(value: string): void},
  isCorrect: boolean,
  focused: boolean,
}) => {
  const inputRef = useRef(null);
  useEffect(() => {
    if (focused) {
      inputRef.current.focus()
    }
  }, [focused])

  return (
    <div className={styles.full}>
      <span className={styles.operand}>{left}</span>
      <span className={styles.operator}>+</span>
      <span className={styles.operand}>{right}</span>
      <span className={styles.operator}>=</span>
      <input
        type="number"
        ref={inputRef}
        className={styles.result}
        value={result}
        onChange={(event) => onChange(event.target.value)}
        autoFocus={focused}
        maxLength={2}
      />
      <span className={styles.checkresult}>{ isCorrect ? <CheckIcon fontSize="large" /> : '' }</span>
    </div>
  )
}

export default Addition