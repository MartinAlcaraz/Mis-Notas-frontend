import React from 'react'

function ErrorComponent({message, stack, info}) {
  return (
    <div className="min-h-screen bg-gray-600">
        <h1>Something went wrong.</h1>
        <h3 className='underline'>Message</h3>
        <p>{message}</p>
        <h3 className='underline'>Stack</h3>
        <p>{stack}</p>
        <h3 className='underline'>Info</h3>
        <p>{info}</p>

    </div>
  )
}

export default ErrorComponent