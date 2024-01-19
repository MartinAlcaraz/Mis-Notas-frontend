import React from 'react'

function Layuot(props) {
  return (
    <div className='bg-secondary min-h-[94vh] p-2 '>
        {props.children}
    </div>
  )
}

export default Layuot;