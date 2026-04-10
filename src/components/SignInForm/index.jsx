import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import store from '../../redux/store'
import { userSlice } from '../../reducers/user/userSlice'

import '../../Styles/app.css'

function Signinform() {
  const [error, setError] = useState(null)
  const navigation = useNavigate()

  const handleSignIn = async (e) => {
    e.preventDefault()

    const username = e.target.elements.username.value
    const password = e.target.elements.password.value

    console.log(JSON.stringify({ email: username, password: password }))

    try {
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: username, password: password }),
      })

      if (!response.ok) {
        throw new Error('Error: User not found!')
      } else {
        const data = await response.json()
        const token = data.body.token

        //console.log('token' + token)

        fetch('http://localhost:3001/api/v1/user/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        })
          .then((promise) => promise.json())
          .then((responseJson) => responseJson.body)
          .then((user) => {
            if (user.email === username) {
              // Dispatch action to set user data
              store.dispatch(
                userSlice.actions.setUser({
                  firstname: user.userName.split(' ').slice(0, 1),
                  lastname: user.userName.split(' ').slice(1, 2),
                  token: token,
                })
              )
            }
          })
          .catch((error) => console.error(error))

        // Redirect to the User page
        console.log(token)
        navigation('/User')
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div>
      <section className="sign-in-content">
        <FontAwesomeIcon icon={faUserCircle} />
        <h1>Sign In</h1>
        <form onSubmit={handleSignIn}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          {error && <p>{error}</p>}
          <button className="sign-in-button" type="submit">
            Sign In
          </button>{' '}
        </form>
      </section>
    </div>
  )
}

export default Signinform
