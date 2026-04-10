import React from 'react'
import { Link } from 'react-router-dom'
import logoBanque from '../../assets/argentBankLogo.webp'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faUserCircle,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import { userSlice } from '../../reducers/user/userSlice'
import store from '../../redux/store'

import '../../Styles/app.css'

function Header() {
  const user = useSelector((state) => state.user)

  //console.log('token : ' + user.token)

  const signOut = () => {
    //Reinitialize the user in the store
    store.dispatch(
      userSlice.actions.setUser({
        firstname: null,
        lastname: null,
        token: null,
      })
    )
  }

  return (
    <nav className="main-nav">
      <Link className="main-nav-item" to="/">
        <img
          className="main-nav-logo-image"
          src={logoBanque}
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        {(!user || !user.token) && (
          <Link className="main-nav-item" to="/Signin">
            <FontAwesomeIcon icon={faUserCircle}></FontAwesomeIcon>
            Sign In
          </Link>
        )}

        {user && user.token && (
          <>
            <Link to="/user" className="main-nav-item">
              <FontAwesomeIcon icon={faUserCircle} />
              {user.firstname + '  '}
            </Link>
            <Link onClick={signOut} className="main-nav-item" to="/">
              <FontAwesomeIcon icon={faRightFromBracket} />
              Sign Out
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}

export default Header
