import React, { useState, useEffect } from 'react';
import axiosWithAuth from '../utils/axiosWithAuth'
import { Form, Field, withFormik } from 'formik';
import * as Yup from "yup";
import axios from "axios";
import { Link } from 'react-router-dom';
import { login, move } from '../../actions/roomActions'

const Registration = ({ errors, touched, values, status, history }) => {
// eslint-disable-next-line
  const [user, setUser] = useState('');

  useEffect(() => {
    if (status) {
      setUser(status);
      history.push('/login')
    }
    // eslint-disable-next-line
  }, [status])

  return (
    <div className='registration'>
      <h1>Register for a New Account</h1>
      <Form>
        <Field
          type='text'
          name='username'
          placeholder='Username'
        />
        {touched.username && errors.username && (
          <p className='error'>{errors.username}</p>
        )}
        <br/>

        <Field
          type='password'
          name='password1'
          placeholder='Password'
        />
        {touched.password1 && errors.password1 && (
          <p className='error'>{errors.password1}</p>
        )}
        <br/>

        <Field
          type='password'
          name='password2'
          placeholder='Password Confirmation'
        />
        {touched.password2 && errors.password2 && (
          <p className='error'>{errors.password2}</p>
        )}
        <br/>

        <button type='submit'>Submit</button>
      </Form>
      <Link to='/login'>Already have an account? Log in here</Link>
    </div>
  )
}

const FormikRegistration = withFormik({
  mapPropsToValues: ({ username, password1, password2 }) => {
    return {
      username: username || "",
      password1: password1 || "",
      password2: password2 || ""
    };
  },

  validationSchema: () => Yup.object().shape({
    username: Yup.string().required("You need a name to play with others."),
    password1: Yup.string()
      .required("Please provide a password")
      .min(8, "Needs to be longer...")
      .max(12, "Do not make it super complicated."),
    password2: Yup.string()
      .required()
  }),

  handleSubmit(values, { setStatus, props }) {
    return axios
      .post(`https://lambda-cs25-mud.herokuapp.com/api/registration/`, values)
      .then(res => {
        setStatus(res.data);
        props.useDispatch(login(values.username))

        localStorage.setItem('token', res.data.key)

        axiosWithAuth().get('https://lambda-cs25-mud.herokuapp.com/api/adv/init/')
          .then(res => props.useDispatch(move(res.data)))
          .catch(err => console.error(err.response))

      })
      .catch(err =>
        console.log("Error in handleSubmit axios call", err.response)
      );
  }
})(Registration);

export default FormikRegistration;