import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>

const Statistic = (props) => <><td>{props.text}</td><td>{props.value}</td></>

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad
  const totalScore = good-bad
  if (all === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  const score = totalScore/all
  const positiveScore = good / all * 100.0 + " %"

  return (<><h1>statistics</h1>
  <table>
  <tbody>
    <tr><Statistic text="good" value={good}/></tr>
    <tr><Statistic text="neutral" value={neutral}/></tr>
    <tr><Statistic text="bad" value={bad}/></tr>
    <tr><Statistic text="all" value={all}/></tr>
    <tr><Statistic text="average" value={score}/></tr>
    <tr><Statistic text="positive" value={positiveScore}/></tr>
    </tbody>
    </table>
    </>)
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const setGoodValue = (value) => {
    setGood(value+1)
  }
  const setNeutralValue = (value) => {
    setNeutral(value+1)
  }
  const setBadValue = (value) => {
    setBad(value+1)
  }
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGoodValue(good)} text="Good" />
      <Button handleClick={() => setNeutralValue(neutral)} text="Neutral" />
      <Button handleClick={() => setBadValue(bad)} text="Bad" />
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)