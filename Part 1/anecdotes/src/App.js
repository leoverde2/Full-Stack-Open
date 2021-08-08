import React, { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]
   
  const zeroFilledArray = () => {
    return (
      new Array(anecdotes.length + 1).join('0').split('').map(parseFloat)
    )
  }

  const setSelectedToRandom = () => {
    const number = Math.floor(Math.random() * anecdotes.length)
    setSelected(number)
  }

  const setToVotes = (array, index) => () => {
    const copy = [...array]
    copy[index] += 1
    setVotes(copy)
  }

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(zeroFilledArray)

  return (
    <div>
      <Anecdotes anecdote={anecdotes[selected]} votes={votes[selected]} />
      <Button clickHandler={setSelectedToRandom} text="next anecdote" />
      <Button clickHandler={setToVotes(votes, selected)} text="vote" />
    </div>
  )
}

const Button = ({ clickHandler, text }) => {
  return (
  
    <button onClick={clickHandler}>
    {text}
    </button>
  
  )
}

const Anecdotes = ({ anecdote, votes }) => {
  return (
    <div>
      {anecdote}<br></br>
      has {votes} votes
    </div>
  )
}

export default App