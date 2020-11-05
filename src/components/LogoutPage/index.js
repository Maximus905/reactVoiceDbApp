/**@jsx jsx*/
import {jsx} from '@emotion/core'
import {useState, useEffect} from 'react'
import {logout} from "../../helpers";
import {Redirect} from "react-router-dom";
import {LOGIN_PAGE, LOGOUT_ERROR_PAGE} from "../../constants";



const Logout = ({clearFunction, setLoggedOutState}) => {
  const REDIRECT_TIMEOUT  = 500
  const [loggedOut, setLoggedOut] = useState(false)
  const [error, setError] = useState(false)
  const [redirect, setRedirect] = useState(false)


  useEffect(() => {
    logout().then(
      (res) => {
        if (res) {
          clearFunction()
          setLoggedOut(true)
          setLoggedOutState()
          setTimeout(() => setRedirect(true), REDIRECT_TIMEOUT)
        } else {
          setError(true)
        }
      }
    )
  }, [])
  return loggedOut
    ? redirect
      ? <Redirect to={LOGIN_PAGE}/>
      : <div className="m-5"><h5 className='text-center text-dark'>You are logged out</h5></div>
    : error
      ? <Redirect to={LOGOUT_ERROR_PAGE}/>
      : <div className="m-5"><h5 className='text-center text-dark'>Logout...</h5></div>
}

export default Logout