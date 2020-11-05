/**@jsx jsx*/
import {jsx} from '@emotion/core'
import {useState, useEffect} from 'react'
import {login, isLoggedIn, setToken, setTokenInfo} from "../../helpers";
import {Redirect, useLocation} from 'react-router-dom'
import {MAX_REFRESH_ATTEMPTS, URL_HOME_PAGE} from "../../constants";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card'
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const RedirectExt = (props) => {
  const {external, to, ...rest} = props
  if (external) {
    window.location = to.pathname
    return null
  } else {
    return <Redirect to={to} {...rest} />
  }
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://rsb.ru">
        Русский Стандарт Банк
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  card: {

    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(3)
  }
}));

export default function SignIn({setTokenState}) {
  const classes = useStyles();
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loggedIn, setLoggedIn] = useState(false)
  const location = useLocation()
  const redirectInfo = location.state && location.state.from
    ? {pathname: location.state.from.pathname, search: location.state.from.search}
    : {pathname: URL_HOME_PAGE}

  const onSubmit = async (e) => {
    e.preventDefault()
    const {token, tokenPayload, errorCode, errorMessage} = await login({username, password})
    if (!errorCode && !errorMessage) {
      setToken(token)
      setTokenInfo(JSON.stringify(tokenPayload))
      setError(null)
      setTokenState({expTime: tokenPayload.exp, resCode: 200, refreshAttempts: MAX_REFRESH_ATTEMPTS})
      setLoggedIn(true)
    } else {
      setError(errorMessage)
    }
  }

  useEffect(() => {
    if (isLoggedIn()) {
      setLoggedIn(true)
    }
  }, [])

  return loggedIn
    ? <RedirectExt external={redirectInfo.pathname === URL_HOME_PAGE} to={redirectInfo} />
    : (
    <Container component="main" maxWidth="xs">
      <Card className={classes.card} >
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={onSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Domain Username"
              name="username"
              autoComplete="username"
              autoFocus
              onChange={e => setUsername(e.target.value)} value={username}
              placeholder='username@rs.ru'
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={e => setPassword(e.target.value)} value={password}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={!username || !password}
            >
              Sign In
            </Button>

          </form>
        </div>
        <Box style={{height: '2rem'}} textAlign="center" color="error.main">
          {error ? <h5>{error}</h5> : null}
        </Box>
        <Box mt={1}>
          <Copyright />
        </Box>
      </Card>
    </Container>
  );
}
