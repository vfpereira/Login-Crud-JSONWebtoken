import React, { useState } from 'react'
import 'styles/app.css'
import 'styles/util.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from 'components/Login'
import Register from 'components/Register'
import axios from 'axios'

export default function App () {
  const [auth, setAuth] = useState(false)
  const [token, setToken] = useState('')
  const [register, setRegister] = useState({
    email: '',
    password: '',
    error: '',
    validation: []
  })

  const [login, SetLogin] = useState({
    email: '',
    password: ''
  })

  function handleChange (e, type) {
    const targetName = e.target.name
    const targetValue = e.target.value

    if (type === 'register') {
      setRegister({ ...register, [targetName]: targetValue })
    }

    if (type === 'login') {
      SetLogin({ ...login, [targetName]: targetValue })
    }
  }

  function handleRegisterSubmit (e) {
    e.preventDefault()
    if (validate()) {
      axios.post('/api/v1.0/register-user', {
        email: register.email,
        password: register.password
      })
        .then(resp => console.log(resp))
        .catch(err => console.log(err))
    }
  }

  function handleLoginSubmit (e) {
    e.preventDefault()
    axios.post('/api/v1.0/login-user', {
      email: login.email,
      password: login.password
    })
      .then(resp => {
        console.log(resp.data.error === true)
        if (resp.data.error) {
          console.log('Not valid user or password')
          return false
        }
        setToken({token: resp.data.token})

        // this.authorization(resp.data.token)
      })
      .catch(err => console.log(err))
  }

  function validate (e) {
    let valid = true

    setRegister((register) => ({ ...register, validation: [] }))

    if (register.email === '') {
      console.log('email vazio')
      setRegister((register) => ({ ...register, validation: register.validation.concat('E-mail is required') }))
      valid = false
      console.log(register)
    }

    if (register.password === '') {
      setRegister((register) => ({ ...register, validation: register.validation.concat('Password is required') }))
      valid = false
    }

    return valid
  }


  return (
    <Router>
      {auth ? (
        <Route exact path='/' render={() => <div>Logged</div>} />
      )
        : (
          <Route
            exact path='/'
            render={() =>
              <Login
                login={login}
                onHandleChange={handleChange}
                onHandleLoginSubmit={handleLoginSubmit}
              />}
          />
        )}
      <Route
        path='/register' render={() =>
          <Register
            register={register}
            onHandleChange={handleChange}
            onHandleRegisterSubmit={handleRegisterSubmit}
          />}
      />
    </Router>
  )
}
