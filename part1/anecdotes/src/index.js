import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const Anecdote = (props) => {
  return (<>
    <div>{props.text}</div>
    <div>has {props.votes} votes</div>
  </>);
}

const initArray = (size) => Array(size).fill(0)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(initArray(6))
  const [maxVoteAnec, setMaxVoteAnec] = useState(0)

  const handleVote = () => {
    const index = selected
    const copy = [...points]
    copy[index] += 1
    setPoints(copy)
    if(copy[index] > copy[maxVoteAnec]) setMaxVoteAnec(index)
  }
  const handleAnecdote = () => {
    const next = Math.round(Math.random() * 5)
    setSelected(next)
  }
  
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote text={props.anecdotes[selected]} votes={points[selected]} />
      <div>
        <Button handleClick={handleVote} text="vote" />
        <Button handleClick={handleAnecdote} text="next anecdote" />
      </div>
      <h1>Anecdote with most votes</h1>
      <Anecdote text={props.anecdotes[maxVoteAnec]} votes={points[maxVoteAnec]}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)