// @ts-nocheck
import { createContext, useEffect, useReducer, useState } from 'react'

const INITIAL_STATE = {
  user: null,
  loading: false,
  error: null,
}

export const AuthContext = createContext(INITIAL_STATE)

const AuthReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return {
        user: null,
        loading: true,
        error: null,
      }
    case 'LOGIN_SUCCESS':
      return {
        user: action.payload,
        loading: false,
        error: null,
      }
    case 'LOGIN_FAILURE':
      return {
        user: null,
        loading: false,
        error: action.payload,
      }
    case 'LOGOUT':
      return {
        user: null,
        loading: false,
        error: null,
      }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [storage, setStorage] = useState(INITIAL_STATE.user)
  // console.log("storage", storage)
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)

  useEffect(() => {
    INITIAL_STATE.user = JSON.parse(localStorage.getItem('user')) || null
    localStorage.setItem('user', JSON.stringify(state.user))
    setStorage(JSON.stringify(state.user))
  }, [state.user])

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loading: state.loading,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
