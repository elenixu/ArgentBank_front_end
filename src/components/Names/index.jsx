import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { userSlice } from '../../reducers/user/userSlice' // Adjust the import path based on your project structure
import store from '../../redux/store'

import '../../Styles/app.css'

function Names(props) {
  const userNameOld = useSelector((state) => state.user)

  useEffect(() => {
    var firstName = document.getElementById('first-name')
    var lastName = document.getElementById('last-name')

    firstName.value = userNameOld ? userNameOld.firstname : ''
    lastName.value = userNameOld ? userNameOld.lastname : ''
  })

  const cancel = () => {
    props.setShowNames(false)
  }

  const updateName = async () => {
    var firstNameNew = document.getElementById('first-name')
    var lastNameNew = document.getElementById('last-name')

    if (firstNameNew != null && lastNameNew != null) {
      // Update the store
      store.dispatch(
        userSlice.actions.setUser({
          firstname: firstNameNew.value,
          lastname: lastNameNew.value,
          token: userNameOld.token,
        })
      )

      // Call the API POST to update the database
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
              userName: firstNameNew.value + ' ' + lastNameNew.value,
            }),
          }
        )
        if (!response.ok) {
          throw new Error('Error: Could not edit name!')
        }
        // Toggle the showName state in the parent to get back to the original view
        props.setShowNames(false)
      } catch (error) {
        console.error('Error updating name:', error)
      }
    } else {
      alert('the firstname or lastname is empty')
    }
    props.setShowNames(false)
  }

  return (
    <div>
      <div className="global-container">
        <div className="input-containers">
          <div>
            <input
              className="input-style"
              type="text"
              id="first-name"
              name="name"
            />
          </div>
          <div>
            <input
              className="input-style"
              type="text"
              id="last-name"
              name="last-name"
            />
          </div>
        </div>
        <div className="button-containers">
          <button className="button-style" type="submit" onClick={updateName}>
            Update
          </button>
          <button className="edit-button" onClick={cancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default Names
