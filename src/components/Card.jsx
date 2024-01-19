import React from 'react'

function Card({children, style='p-4'}) {
  return (
    <div className={'bg-card rounded-md shadow-md shadow-black my-3 '+style}>
        {children}
    </div>
  )
}

export default Card;