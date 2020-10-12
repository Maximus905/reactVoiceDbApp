import React, {useState, useEffect, useRef} from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import TopNavBar from "./components/TopNavBar"
import {BrowserRouter as Router, Switch, Route, Redirect, useRouteMatch, useLocation} from "react-router-dom";
import {Page, PageHeader, PageMain, PageFooter} from "./components/Page";
import RegCentersMapTable from "./components/RegCentersMapTable";
import UnregisteredPhonesPage from "./components/UnregistredPhonesPage";
import CucmRoutingPage from "./components/CucmRoutingPage";
import TestToolsPage from "./components/TestToolsPage";
import LoginPage from "./components/LoginPage";
import LocationsPage from "./components/LocationsPage";
import {DICT_REG_CENTERS_MAPPING, UNREGISTERED_PHONES, CUCM_ROUTES, TEST_TOOLS, LOGIN_PAGE} from "./constants";
import PageNotFound from "./components/Page404"
import {login, refreshToken, isLoggedIn, getTokenTimeBeforeRefresh, checkTokenTime, setToken, setTokenInfo, clearToken} from "./components/LoginPage/helpers";

// const isLogged = () => {
//   const user = JSON.parse(localStorage.getItem('user'))
//   return user && user.exp && new Date(user.exp * 1000) > new Date()
// }

const PrivateRoute = ({children, ...rest}) => {
  const {path, url} = useRouteMatch()
  const location = useLocation()
  console.log({path, url, location})
  return (
    <Route {...rest} render={({match}) => {
      return isLoggedIn() ? children : <Redirect to={{pathname: LOGIN_PAGE, state: {from: location}}} />
    }} />
  )
}

function App() {
  const [tokenExpDate, setTokenExpDate] = useState()
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
      }
      return {user, token}
    }

    if (tokenExpDate && new Date((tokenExpDate - 2*60) * 1000) > new Date()) {
      const timeout = new Date((tokenExpDate - 2*60) * 1000) - new Date()
      console.log('setTimeout')
      timerId.current = setTimeout(() => refresh(), timeout)
      return () => {
        console.log('clear timeout')
        clearTimeout(timerId.current)
      }
    } else {
      console.log('before refresh')
      refresh().then(() => console.log('refresh'))
    }
  }, [tokenExpDate])

  const clearTimerSchedule = () => {
    if (timerId.current) clearTimeout(timerId.current)
  }

  return (
      <Router>
        <Page>
            <PageHeader>
                <TopNavBar clearTimerSchedule={clearTimerSchedule} setTokenExpDate={setTokenExpDate} />
            </PageHeader>
            <PageMain>
                <Switch>
                  <Route path='/vra/locations'>
                    <LocationsPage />
                  </Route>
                    <Route path={DICT_REG_CENTERS_MAPPING} exact>
                        <RegCentersMapTable/>
                    </Route>
                    <Route path={UNREGISTERED_PHONES} exact>
                        <UnregisteredPhonesPage/>
                    </Route>
                    <PrivateRoute path={CUCM_ROUTES} exact>
                      <CucmRoutingPage/>
                    </PrivateRoute>
                    <PrivateRoute path={TEST_TOOLS} exact>
                      <TestToolsPage/>
                    </PrivateRoute>
                    <Route path={LOGIN_PAGE}>
                      <LoginPage setTokenExpDate={setTokenExpDate}/>
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
