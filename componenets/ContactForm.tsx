// @ts-nocheck
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import { useRef } from "react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import React, { useContext } from "react";
import { AuthContext } from "../componenets/AuthContext";
import { useRouter } from "next/router";
interface FormClassNameProps {
  FormClassName?: string;
}

let SignupSchema = yup.object().shape({
  fullname: yup.string().required("This field is required."),

  email: yup.string().email().required("This field is required."),
  textarea: yup
    .string()
    .min(6, "message is too short.")
    .max(50, "Whoa!!, message is too long.")
    .required("This field is required."),
});

const useStyles = makeStyles((theme) => ({
  "@global": {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    display: "flex",
    flexDirection: "column",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const ContactForm = ({ FormClassName }: FormClassNameProps) => {
  const classes = useStyles();
  const ref = useRef(null);
  const { user } = useContext(AuthContext) as any;
  const router = useRouter();
  return (
    <div className={`mx-2 ${FormClassName}`}>
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5" className="!mb-5">
          Contact us
        </Typography>
        <Formik
          initialValues={{
            fullname: "",
            email: "",
            textarea: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={
            user
              ? async (values) => {
                  console.log(values);
                  try {
                    const res = await axios.post("https://weak-lime-sea-urchin-cap.cyclic.app/api/contactus", values);
                    console.log(res);
                    ref.current.innerHTML = "";
                    ref.current.innerHTML = res.data;
                    ref.current.style.color = "green";
                    router.push("/");
                  } catch (err) {
                    console.log("err", err);
                    ref.current.innerHTML = "";
                    ref.current.style.color = "red";
                    ref.current.innerHTML = "Please use unique credentials.";
                  }
                }
              : () => {
                  router.push("/signInPage");
                }
          }
        >
          {({ errors, handleChange, touched }) => (
            <Form className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    error={errors.fullname && touched.fullname}
                    autoComplete="fname"
                    name="fullname"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    id="fullname"
                    label="Full Name"
                    autoFocus
                    helperText={errors.fullname && touched.fullname ? errors.fullname : null}
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
                    helperText={errors.email && touched.email ? errors.email : null}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={errors.textarea && touched.textarea}
                    id="textarea"
                    label="Message"
                    name="textarea"
                    variant="outlined"
                    multiline
                    fullWidth
                    minRows={5}
                    onChange={handleChange}
                    helperText={errors.textarea && touched.textarea ? errors.textarea : null}
                  />
                </Grid>
              </Grid>
              <p ref={ref}></p>
              <div className="mt-[19px]">
                <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
                  SEND
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ContactForm;
