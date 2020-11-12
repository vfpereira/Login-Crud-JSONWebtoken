import React from 'react'
import 'styles/app.css'
import 'styles/util.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from 'components/Login'
import Register from 'components/Register'
import axios from 'axios'
export default class App extends React.Component {
  constructor (props) {
    super()

    this.state = {
      register: {
        email: '',
        password: '',
        error: '',
        validation: []
      },
      login: {
        email: '',
        password: ''
      }

    }

    this.handleChange = this.handleChange.bind(this)
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this)
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this)
  }

  handleChange (event, type) {
    const targetName = event.target.name
    const targetValue = event.target.value

    if (type === 'register') {
      this.setState(prevState => ({
        register: {
          ...prevState.register,
          [targetName]: targetValue
        }
      }))
    }

    if (type === 'login') {
      this.setState(prevState => ({
        login: {
          ...prevState.login,
          [targetName]: targetValue
        }
      }))
    }
  }

  handleLogin (event) {

  }

  handleLoginSubmit (event) {
    event.preventDefault()
    axios.post('/api/v1.0/login-user', {
      email: this.state.register.email,
      password: this.state.register.password
    })
      .then(resp => console.log(resp))
      .catch(err => console.log(err))
  }

  handleRegisterSubmit (event) {
    event.preventDefault()
    if (this.validate()) {
      axios.post('/api/v1.0/register-user', {
        email: this.state.register.email,
        password: this.state.register.password
      })
        .then(resp => console.log(resp))
        .catch(err => console.log(err))
    }

    console.log('validation', this.state.register.validation)
  }

  validate (event) {
    let valid = true

    this.setState(prevState => ({
      register: {
        ...prevState.register,
        validation: []
      }
    }))

    if (this.state.register.email === '') {
      this.setState(prevState => ({
        register: {
          ...prevState.register,
          validation: [...prevState.register.validation.concat(['E-mail is required'])]
        }
      }))
      valid = false
    }

    if (this.state.register.password === '') {
      this.setState(prevState => ({
        register: {
          ...prevState.register,
          validation: [...prevState.register.validation.concat(['Password is required'])]
        }
      }))
      valid = false
    }

    return valid
  }

  render () {
    return (
      <Router>
        <Route
          exact path='/'
          render={() =>
            <Login
              login={this.state.login}
              onHandleChange={this.handleChange}
              onHandleLoginSubmit={this.handleLoginSubmit}
            />}
        />
        <Route
          path='/register' render={() =>
            <Register
              register={this.state.register}
              onHandleChange={this.handleChange}
              onHandleRegisterSubmit={this.handleRegisterSubmit}
            />}
        />
      </Router>
    )
  }
}
