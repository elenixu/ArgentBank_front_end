import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { userSlice } from '../../reducers/user/userSlice'
import store from '../../redux/store'

import '../../Styles/app.css'

function Names(props) {
  const userNameOld = useSelector((state) => state.user)
  const [errors, setErrors] = useState({
    firstname: false,
    lastname: false,
  })

  useEffect(() => {
    const firstName = document.getElementById('first-name')
    const lastName = document.getElementById('last-name')

    if (firstName) firstName.value = userNameOld ? userNameOld.firstname : ''
    if (lastName) lastName.value = userNameOld ? userNameOld.lastname : ''
  }, [userNameOld])

  const cancel = () => {
    props.setShowNames(false)
  }

  const updateName = async () => {
    const firstNameNew = document.getElementById('first-name')
    const lastNameNew = document.getElementById('last-name')

    const firstnameValue = firstNameNew.value.trim()
    const lastnameValue = lastNameNew.value.trim()

    const newErrors = {
      firstname: firstnameValue === '',
      lastname: lastnameValue === '',
    }

    setErrors(newErrors)

    if (newErrors.firstname || newErrors.lastname) {
      return
    }

    store.dispatch(
      userSlice.actions.setUser({
        firstname: firstnameValue,
        lastname: lastnameValue,
        token: userNameOld.token,
      }),
    )

    try {
      const response = await fetch(
        'http://localhost:3001/api/v1/user/profile',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + userNameOld.token,
          },
          body: JSON.stringify({
            userName: firstnameValue + ' ' + lastnameValue,
          }),
        },
      )

      if (!response.ok) {
        throw new Error('Error: Could not edit name!')
      }

      props.setShowNames(false)
    } catch (error) {
      console.error('Error updating name:', error)
    }
  }

  return (
    <div>
      <div className="global-container">
        <div className="input-containers">
          <div>
            <input
              className={`input-style ${errors.firstname ? 'input-error' : ''}`}
              type="text"
              id="first-name"
              name="name"
            />
          </div>

          <div>
            <input
              className={`input-style ${errors.lastname ? 'input-error' : ''}`}
              type="text"
              id="last-name"
              name="last-name"
            />
          </div>
        </div>

        <div className="button-containers">
          <button className="button-style" type="button" onClick={updateName}>
            Update
          </button>

          <button className="edit-button" type="button" onClick={cancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default Names
