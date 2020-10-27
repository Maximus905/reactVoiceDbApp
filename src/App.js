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
import {DICT_REG_CENTERS_MAPPING, UNREGISTERED_PHONES, CUCM_ROUTES, TEST_TOOLS, LOGIN_PAGE} from "./constants";
import PageNotFound from "./components/Page404"
import {refreshToken, isLoggedIn, setToken, setTokenInfo, getTokenInfo, clearToken} from "./components/LoginPageMU/helpers";


const PrivateRoute = ({children, ...rest}) => {
  const location = useLocation()
  return (
    <Route {...rest} render={({match}) => {
      return isLoggedIn() ? children : <Redirect to={{pathname: LOGIN_PAGE, state: {from: location}}} />
    }} />
  )
}

function App() {
  const [tokenExpDate, setTokenExpDate] = useState(0)
  const timerId = useRef(null)

  useEffect(() => {
    async function refresh() {
      const {user, token, errorCode, errorMessage} = await refreshToken()
      if (!errorCode && !errorMessage) {
        setToken(token)
        setTokenInfo(JSON.stringify(user))
        setTokenExpDate(user.exp)
      } else {
        clearToken()
        setTokenExpDate(false)
      }
      return {user, token}
    }
    if (tokenExpDate === 0) {
      const tokenInfo = JSON.parse(getTokenInfo())
      const tokenExp = tokenInfo && tokenInfo.exp ? tokenInfo.exp : null
      setTokenExpDate(tokenExp)
    } else if (tokenExpDate && new Date((tokenExpDate - 1*60) * 1000) > new Date()) {
      const timeout = new Date((tokenExpDate - 1*60) * 1000) - new Date()
      timerId.current = setTimeout(() => refresh(), timeout)
      return () => {
        clearTimeout(timerId.current)
      }
    }
    // else if (tokenExpDate === false) {
    //   return
    // } else {
    //   refresh().catch(e => console.log(e.message))
    // }
  }, [tokenExpDate])

  const clearTimerSchedule = () => {
    if (timerId.current) clearTimeout(timerId.current)
  }

  return (
      <Router>
        <Page>
            <PageHeader>
              {isLoggedIn() ? <TopNavBar clearTimerSchedule={clearTimerSchedule} setTokenExpDate={setTokenExpDate} /> : null}
            </PageHeader>
            <PageMain>
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
                      <SignIn setTokenExpDate={setTokenExpDate} />
                    </Route>
                    <Route path='*'>
                      <PageNotFound/>
                    </Route>
                </Switch>
            </PageMain>
            <PageFooter />
        </Page>
      </Router>
  );
}

export default App;
