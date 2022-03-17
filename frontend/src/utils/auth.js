import Cookies from 'storejs'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getStorage(name) {
  return Cookies.get(name)
}

export function setStorage(name,value) {
  return Cookies.set(name, value)
}

export function removeStorage(name) {
  return Cookies.remove(name)
}

