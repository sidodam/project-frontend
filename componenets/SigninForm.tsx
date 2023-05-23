// @ts-nocheck
import axios from 'axios'
import { useContext, useEffect } from 'react'

import { AuthContext } from '../componenets/AuthContext'
import { useRouter } from 'next/router'
import * as yup from 'yup'
import { Formik, Field, Form } from 'formik'

let SignupSchema = yup.object().shape({
  username: yup.string().required('This field is required.'),

  password: yup
    .string()
    .required('No password provided.')
    .min(5, 'Password is too short - should be 5 chars minimum.'),
})

const Login = () => {
  const { loading, error, dispatch } = useContext(AuthContext)
  const router = useRouter()

  const {
    query: { username, password },
  } = router

  const props = {
    username,
    password,
  }

  return (
    <>
      <Formik
        initialValues={{
          username: username,

          password: password,
        }}
        validationSchema={SignupSchema}
        onSubmit={async (values) => {
          dispatch({ type: 'LOGIN_START' })
          try {
            const res = await axios.post(
              'http://localhost:8800/api/auth/login',
              values,
            )
            dispatch({ type: 'LOGIN_SUCCESS', payload: res.data.details })

            router.push('/')
          } catch (err) {
            dispatch({ type: 'LOGIN_FAILURE', payload: err.response.data })
          }
        }}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col md:w-1/3 w-full gap-4">
            <div>
              <Field
                id="username"
                name="username"
                className="border"
                className="block w-full px-4 py-2 text-xl font-normal
         text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
          rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white 
          focus:border-blue-600 focus:outline-none"
                placeholder="Username"
              />
              {errors.username && touched.username ? (
                <div className="text-red-600">{errors.username}</div>
              ) : null}
            </div>

            <div>
              <Field
                id="password"
                name="password"
                className="border"
                type="password"
                className="block w-full px-4 py-2 text-xl font-normal
       text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300
        rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white 
        focus:border-blue-600 focus:outline-none"
                placeholder="Password"
              />
              {errors.password && touched.password ? (
                <div className="text-red-600">{errors.password}</div>
              ) : null}
            </div>

            <button
              disabled={loading}
              type="submit"
              className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Login
            </button>
            {error && <span className="text-red-700">{error.message}</span>}
            <p class="text-sm font-semibold mt-2 pt-1 mb-0">
              Don't have an account?
              <a
                href="/signUpPage"
                className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
              >
                {' '}
                Register
              </a>
            </p>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default Login
