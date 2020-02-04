import React, { useState, useEffect } from "react";
import axiosWithAuth from '../utils/axiosWithAuth'
import { Form, Field, withFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { Link } from "react-router-dom";
import { login, move } from '../../actions/roomActions'
import './Login.css'

const Login = ({ props, errors, touched, values, status, history }) => {
  // eslint-disable-next-line
  const [user, setUser] = useState("");

  useEffect(() => {
    if (status) {
      setUser(status);
      history.push('/home')
    }
    // eslint-disable-next-line
  }, [status]);

  return (
    <div className="login">
      <h1>Log into your account</h1>
      <Form>
        <Field
          type="text"
          name="username"
          placeholder="Username" />
        {touched.username && errors.username && (
          <p className="error">{errors.username}</p>
        )}
        <br/>
        <Field type="password" name="password" placeholder="Password" />
        {touched.password && errors.password && (
          <p className="error">{errors.password}</p>
        )}
        <br/>
        <button type="submit">Submit</button>
      </Form>
      <Link to='/'>Need a new account? Register here</Link>
    </div>
  );
};

const FormikLogin = withFormik({
  mapPropsToValues: ({ username, password }) => {
    return {
      username: username || "",
      password: password || ""
    };
  },

  validationSchema: () => Yup.object().shape({
    username: Yup.string().required("What is your name?"),
    password: Yup.string()
      .required("Please provide your password"),
  }),

  handleSubmit(values, { setStatus, resetForm, props }) {
    return axios
      .post(`https://lambda-mud-test.herokuapp.com/api/login/`, values)
      .then(res => {
        setStatus(res.data);
        props.useDispatch(login(values.username))

        localStorage.setItem('token', res.data.key)

        axiosWithAuth().get('https://lambda-mud-test.herokuapp.com/api/adv/init/')
          .then(res => props.useDispatch(move(res.data)))
          .catch(err => console.error(err.response))

        resetForm();
      })
      .catch(err =>
        console.log("Error in handleSubmit axios call", err.response)
      );
  }
})(Login);

export default FormikLogin;