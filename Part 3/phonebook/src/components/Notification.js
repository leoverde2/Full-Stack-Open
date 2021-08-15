import React from 'react'
import '../index.css'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={message.type}>
      {message.content}
    </div>
  )
}


export default Notification