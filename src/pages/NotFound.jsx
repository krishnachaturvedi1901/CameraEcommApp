import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
        <h1>Page Not Found</h1>
        <button><Link to={'/'} >Back to home</Link></button>
    </div>
  )
}

export default NotFound