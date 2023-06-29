import React from 'react'
import { Outlet } from 'react-router-dom'

const Account = () => {
  return (
    <div>
        Account
    <hr></hr>
    <hr></hr>
    <h1>Iam a account page</h1>
    <hr></hr>
    <h2>I dispat user detail</h2>
    <Outlet/>
    </div>
  )
}

export default Account