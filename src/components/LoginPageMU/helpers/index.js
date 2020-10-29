import {decode} from "js-base64"
import axios from 'axios'
import check from 'check-types'
import {
  URL_AUTH_LOGIN,
  URL_AUTH_LOGOUT,
  URL_REFRESH_TOKEN,
  LS_RAW_ACCESS_TOKEN,
  LS_USER_PROFILE
} from "../../../constants"


export const getToken = () => localStorage.getItem(LS_RAW_ACCESS_TOKEN)
export const setToken = (token) => token === undefined ? localStorage.setItem(LS_RAW_ACCESS_TOKEN, null) : localStorage.setItem(LS_RAW_ACCESS_TOKEN, token)
export const getTokenInfo = () => localStorage.getItem(LS_USER_PROFILE)
export const setTokenInfo = (tokenInfo) => tokenInfo === undefined ? localStorage.setItem(LS_USER_PROFILE, null) : localStorage.setItem(LS_USER_PROFILE, tokenInfo)
export const clearToken = () => {
  localStorage.removeItem(LS_USER_PROFILE)
  localStorage.removeItem(LS_RAW_ACCESS_TOKEN)
}


export const checkTokenTime = (token) => {
  // return false if difference between current time and iat time less 1 minute
  const iat = token && check.integer(token.iat) && token.iat
  const timeDiff = (new Date()).getTime() - iat * 1000
  return  timeDiff >= 0 && timeDiff < 60 * 1000
}

export const getTokenTimeBeforeRefresh = (token) => {
  // return false if difference between current time and iat time less 1 minute
  const exp = token && check.integer(token.exp) && token.exp
  return exp ? exp * 1000 - (new Date()).getTime() : 0
}

const fetchToken = async ({username, password}) => {
  try {
    const {data} = !! username
      ? await axios.post(URL_AUTH_LOGIN, {username, password}, {withCredentials: true})
      : await axios.get(URL_REFRESH_TOKEN, {withCredentials: true})
    const token = data && data.accessToken
    if (!check.string(token) || token.split('.').length !== 3) {
      return {errorCode: 500, errorMessage: 'Auth service error, invalid token'}
    } else {
      const tokenParts = token.split('.')
      const tokenPayload = check.string(tokenParts[1]) && JSON.parse(decode(tokenParts[1]))
      if (checkTokenTime(tokenPayload)) {
        return {token, tokenPayload}
      } else {
        return {errorCode: 401, errorMessage: 'Incorrect client time'}
      }
    }
  } catch (e) {
    if (e.response && e.response.status) {
      const errorCode = e.response.status
      const errorMessage = e.response.data && e.response.data.message
      console.log('ERROR', {errorCode, errorMessage})
      return {errorCode, errorMessage: errorMessage || 'Unexpected auth service error'}
    } else {
      const errorCode = 500
      const errorMessage = 'Unexpected auth service error'
      console.log('ERROR', {errorCode, errorMessage})
      return {errorCode, errorMessage}
    }
  }
}

export const isLoggedIn = () => {
  const token = getToken()
  const tokenParts = check.string(token) && token.split('.').length === 3 && token.split('.')
  const tokenInfo = tokenParts && check.string(tokenParts[1]) && JSON.parse(decode(tokenParts[1]))
  return tokenInfo && getTokenTimeBeforeRefresh(tokenInfo) > 0
}


export const login = async ({username, password}) => {
  return await fetchToken({username, password})
}

export const refreshToken = async () => {
  return await fetchToken({username: null, password: null})
}

export const logout = async () => {
  try {
    await axios.get(URL_AUTH_LOGOUT, {withCredentials: true})
    return true
  } catch (e) {
    console.log('Error in logout: ', e.message)
    return false
  }
}

