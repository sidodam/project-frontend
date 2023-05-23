// @ts-nocheck
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import axios from 'axios'
import { Formik, Form } from 'formik'
import * as yup from 'yup'
import { useRef } from 'react'
import { useRouter } from 'next/router'

interface FormClassNameProps {
  FormClassName?: string
}

let SignupSchema = yup.object().shape({
  username: yup.string().required('This field is required.'),
  lastName: yup.string(),
  email: yup.string().email().required('This field is required.'),
  password: yup
    .string()
    .min(6, 'Password need to be at least 6 characters.')
    .max(20, 'Password is too long.')
    .required('This field is required.'),

  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match'),
})

const useStyles = makeStyles((theme) => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

const SignupForm = ({ FormClassName }: FormClassNameProps) => {
  const classes = useStyles()
  const ref = useRef(null)
  const router = useRouter()
  return (
    <div className={`mx-2 ${FormClassName}`}>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h4" gutterBottom>
          Sign up
        </Typography>
        <Formik
          initialValues={{
            username: '',
            lastName: '',
            email: '',
            password: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={async (values) => {
            console.log(values)
            try {
              const res = await axios.post(
                'http://localhost:8800/api/auth/register',
                values,
              )
              ref.current.innerHTML = ''
              ref.current.innerHTML = res.data
              ref.current.style.color = 'green'

              router.push({
                pathname: '/signInPage',
                query: {
                  username: values.username,
                  password: values.password,
                },
              })
            } catch (err) {
              ref.current.innerHTML = ''
              ref.current.innerHTML = 'User already exists'
            }
          }}
        >
          {({ errors, handleChange, touched }) => (
            <Form className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    error={errors.username && touched.username}
                    autoComplete="fname"
                    name="username"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    id="username"
                    label="First Name"
                    autoFocus
                    helperText={
                      errors.username && touched.username
                        ? errors.username
                        : null
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    error={errors.lastName && touched.lastName}
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                    helperText={
                      errors.lastName && touched.lastName
                        ? errors.lastName
                        : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={errors.email && touched.email}
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    helperText={
                      errors.email && touched.email ? errors.email : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={errors.password && touched.password}
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    helperText={
                      errors.password && touched.password
                        ? errors.password
                        : null
                    }
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    error={
                      errors.passwordConfirmation &&
                      touched.passwordConfirmation
                    }
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    name="passwordConfirmation"
                    label="Retype password"
                    type="passwordConfirmation"
                    id="passwordConfirmation"
                    autoComplete="current-password"
                    helperText={
                      errors.passwordConfirmation &&
                      touched.passwordConfirmation
                        ? errors.passwordConfirmation
                        : null
                    }
                  />
                </Grid>
              </Grid>
              <p ref={ref} className="text-red-500"></p>

              <div className="mt-[19px] ">
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign Up
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default SignupForm
