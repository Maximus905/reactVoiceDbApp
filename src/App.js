import React, {useState, useEffect, useRef} from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import TopNavBar from "./components/TopNavBar"
import {BrowserRouter as Router, Switch, Route, Redirect, useLocation} from "react-router-dom";
import {Page, PageHeader, PageMain, PageFooter} from "./components/Page";
import RegCentersMapTable from "./components/RegCentersMapTable";
import UnregisteredPhonesPage from "./components/UnregistredPhonesPage";
import CucmRoutingPage from "./components/CucmRoutingPage";
import TestToolsPage from "./components/TestToolsPage";
import SignIn from "./components/LoginPageMU";
import {DICT_REG_CENTERS_MAPPING, UNREGISTERED_PHONES, CUCM_ROUTES, TEST_TOOLS, LOGIN_PAGE, MAX_REFRESH_ATTEMPTS} from "./constants";
import PageNotFound from "./components/Page404"
import {refreshToken, isLoggedIn, setToken, setTokenInfo, getTokenInfo, clearToken, getTokenTimeBeforeRefresh} from "./components/LoginPageMU/helpers";

const RedirectExt = (props) => {
  const {external, to, ...rest} = props
  if (external) {
    window.location = to
  } else {
    return <Redirect to={to} {...rest} />
  }
}

const PrivateRoute = ({children, ...rest}) => {
  const location = useLocation()
  return (
    <Route {...rest} render={({match}) => {
      return isLoggedIn() ? children : <Redirect to={{pathname: LOGIN_PAGE, state: {from: location}}} />
    }} />
  )
}

function App() {
  const [tokenState, setTokenState] = useState({expTime: 0, resCode: 200, refreshAttempts: MAX_REFRESH_ATTEMPTS})
  const timerId = useRef(null)

  useEffect(() => {
    const {expTime, resCode, refreshAttempts} = tokenState
    console.log('tokenState', tokenState)

    async function tokenRefreshHandler() {
      const {token, tokenPayload, errorCode, errorMessage} = await refreshToken()
      if (!errorCode) {
        setToken(token)
        setTokenInfo(JSON.stringify(tokenPayload))
        console.log('refresh OK', tokenPayload, getTokenTimeBeforeRefresh(tokenPayload))
        setTokenState({expTime: tokenPayload.exp, resCode: 200, refreshAttempts: MAX_REFRESH_ATTEMPTS})
      } else if (errorCode === 401) {
        clearToken()
        console.log(`Auth error ${errorCode}: ${errorMessage}`)
        setTokenState({expTime: false, resCode: errorCode, refreshAttempts: MAX_REFRESH_ATTEMPTS})
      } else {
        console.log(`Auth error ${errorCode}: ${errorMessage}`)
        const tokenPayload = JSON.parse(getTokenInfo())

        if (getTokenTimeBeforeRefresh(tokenPayload) > 0) {
          console.log('will try again', tokenPayload, getTokenTimeBeforeRefresh(tokenPayload))
          setTokenState({expTime, resCode: errorCode, refreshAttempts: refreshAttempts - 1})
        } else {
          clearToken()
          console.log('Bad', tokenPayload, getTokenTimeBeforeRefresh(tokenPayload))
          setTokenState({expTime: false, resCode: errorCode, refreshAttempts: MAX_REFRESH_ATTEMPTS})
        }
      }
    }
    const scheduler = () => setTimeout(() => tokenRefreshHandler(), new Date((tokenExp - refreshAttempts * 30) * 1000) - new Date())

    if (expTime === false) return

    const tokenInfo = JSON.parse(getTokenInfo())
    const tokenExp = tokenInfo && tokenInfo.exp ? tokenInfo.exp : null
    // refresh immediately if app has just started or time before expiration less than refreshAttempts * 30 seconds
    if (expTime === 0) {
      if (refreshAttempts > 0) {
        tokenRefreshHandler().then()
      } else {
        clearToken()
        setTokenState({expTime: false, resCode, refreshAttempts: MAX_REFRESH_ATTEMPTS})
      }
    } else if (refreshAttempts > 0) {
      timerId.current = scheduler()
    } else {
      clearToken()
      setTokenState({expTime: false, resCode, refreshAttempts: MAX_REFRESH_ATTEMPTS})
    }

    return () => {
      clearTimeout(timerId.current)
    }
  }, [tokenState])

  const setLoggedOutState = () => {
    if (timerId.current) clearTimeout(timerId.current)
    clearToken()
    setTokenState({expTime: false, resCode: 200, refreshAttempts: MAX_REFRESH_ATTEMPTS})
  }

  return (
      <Router>
        <Page>
            <PageHeader>
              {isLoggedIn() ? <TopNavBar setLoggedOutState={setLoggedOutState}  /> : null}
            </PageHeader>
            <PageMain>
              {tokenState.expTime === 0 ? <h5 className='text-center'>Please wait...</h5> :
                <Switch>
                  <PrivateRoute path={DICT_REG_CENTERS_MAPPING} exact>
                    <RegCentersMapTable/>
                  </PrivateRoute>
                  <PrivateRoute path={UNREGISTERED_PHONES} exact>
                    <UnregisteredPhonesPage/>
                  </PrivateRoute>
                  <PrivateRoute path={CUCM_ROUTES} exact>
                    <CucmRoutingPage/>
                  </PrivateRoute>
                  <PrivateRoute path={TEST_TOOLS} exact>
                    <TestToolsPage/>
                  </PrivateRoute>
                  <Route path={LOGIN_PAGE}>
                    <SignIn setTokenState={setTokenState} />
                  </Route>
                  <Route path='*'>
                    <PageNotFound/>
                  </Route>
                </Switch>
              }
            </PageMain>
            <PageFooter />
        </Page>
      </Router>
  );
}

export default App;
