import React from 'react'
import '../index.css'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  else if (message.type === "success"){
    return (
      <div className="success">
        {message.content}
      </div>
    )
  }
  else if (message.type === "error"){
    return (
      <div className="error">
        {message.content}
      </div>
    )
  }
}


export default Notification