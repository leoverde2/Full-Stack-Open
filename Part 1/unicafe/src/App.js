import React, { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const feedbackTracked = [good, neutral, bad]

  const setFeedback = (feedback, setToFeedback) => () => {
    feedback(setToFeedback + 1)
  }

  return (
    <div>
      <h2>Give Feedback</h2>
      <Button clickHandler={setFeedback(setGood, good)} text="Good" />
      <Button clickHandler={setFeedback(setNeutral, neutral)} text="Neutral" />
      <Button clickHandler={setFeedback(setBad, bad)} text="Bad" />
      <h2>Statistics</h2>
      <Statistics feedbackTracked={feedbackTracked} />
    </div>
  )
}

const Button = ({ clickHandler, text }) => {
  return (
    <button onClick={clickHandler}>{text}</button>
  )
}

const Statistics = ({ feedbackTracked }) => {
  const allFeedback = feedbackTracked.reduce((accumulator, current) => accumulator + current)
  const averageFeedback = (feedbackTracked[0] - feedbackTracked[2]) / allFeedback || 0
  const positiveFeedback = (feedbackTracked[0] / allFeedback) * 100 || 0
  
  if (allFeedback === 0) {
    return (
      <div> No feedback given </div>
    )
  }
  return (  
    <div>
      <StatisticLine value={feedbackTracked[0]} text="Good" />
      <StatisticLine value={feedbackTracked[1]} text="Neutral" />
      <StatisticLine value={feedbackTracked[2]} text="Bad" />
      <StatisticLine value={allFeedback} text="All" />
      <StatisticLine value={averageFeedback} text="Average" />
      <StatisticLine value={positiveFeedback} text="Positive" />
    </div>
  )
}

const StatisticLine = ({ value, text }) => {
  return (
    <>
      {text + ": " + value}<br></br>
    </>
  )
}

export default App