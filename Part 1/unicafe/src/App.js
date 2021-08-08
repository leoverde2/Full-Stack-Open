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
  return (
    <div>
      <h2>Statistics</h2>
      <p>
        <FeedbackTracker feedback={feedbackTracked[0]} text="Good" />
        <FeedbackTracker feedback={feedbackTracked[1]} text="Neutral" />
        <FeedbackTracker feedback={feedbackTracked[2]} text="Bad" />
        <FeedbackTracker feedback={allFeedback} text="All" />
        <FeedbackTracker feedback={averageFeedback} text="Average" />
        <FeedbackTracker feedback={positiveFeedback} text="Positive" />
      </p>
    </div>
  )
}

const FeedbackTracker = ({ feedback, text }) => {
  return (
    <>
      {text + ": " + feedback}<br></br>
    </>
  )
}

export default App