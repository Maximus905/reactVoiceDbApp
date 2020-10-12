/**@jsx jsx*/
import {jsx, css} from '@emotion/core'
import {Container, Col, Row, Form, FormGroup, Label, Input, Button} from 'reactstrap'
import {useState} from 'react'
import {login, isLoggedIn, setToken, setTokenInfo} from "./helpers";
import {Redirect, useLocation} from 'react-router-dom'
import {URL_HOME_PAGE} from "../../constants";

const LoginPage = ({setTokenExpDate, setLoggedIn}) => {
  const appCss = css`
  text-align: left;
  padding: 1em;
  margin: 100px auto 1em auto;
  border: 2px solid #d3d3d3;
  border-radius: .5em;
  vertical-align: middle;
  width: 600px;
  background-color: #9fcdff;
`
  const labelCss = css`
  display: flex;
  font-weight: bold;
`
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const location = useLocation()
  const redirectInfo = location.state && location.state.from
    ? {pathname: location.state.from.pathname, search: location.state.from.search}
    : {pathname: URL_HOME_PAGE}
  console.log('login page', {location, redirectInfo})


  const onSubmit = async (e) => {
    e.preventDefault()
    const {user, token, errorCode, errorMessage} = await login({username, password})
    if (!errorCode && !errorMessage) {
      setToken(token)
      setTokenInfo(JSON.stringify(user))
      setTokenExpDate(user.exp)
      setError(null)
    } else {
      setError(errorMessage)
    }
  }
  return isLoggedIn()
    ? <Redirect to={redirectInfo} />
    :  (
    <Container css={appCss}>
      <Row>
        <Col className='col-3'>
          <h2>Sign In</h2>
        </Col>

      </Row>
      <Row>
        <Col>
          <Form css={css`padding: 1em`} onSubmit={onSubmit} >
            <Row>
              <Col>
                <FormGroup>
                  <Label css={labelCss} for='username'>Email</Label>
                  <Input type='email' name='username' id='username' placeholder='myemail@email.rs.ru' onChange={e => setUsername(e.target.value)} value={username} />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label css={labelCss} for='password'>Password</Label>
                  <Input type='password' name='password' id='password' placeholder='*******' onChange={e => setPassword(e.target.value)} value={password} />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col className='col-3'>
                <Button>Submit</Button>
              </Col>
              <Col className='col-9'>{error && <h4 className='text-danger'>{error}</h4>}</Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginPage