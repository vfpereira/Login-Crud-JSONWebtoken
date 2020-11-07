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
      sign: {
        email: '',
        password: '',
        error: '',
        validation: []
      }
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleRegisterSubmit = this.handleRegisterSubmit.bind(this)
  }

  handleChange (event) {
    const targetName = event.target.name
    const targetValue = event.target.value

    this.setState(prevState => ({
      sign: {
        ...prevState.sign,
        [targetName]: targetValue
      }
    }))
  }

  handleRegisterSubmit (event) {
    event.preventDefault()
    if (this.validate()) {
      axios.post('/api/v1.0/register-user', {
        email: this.state.sign.email,
        password: this.state.sign.password
      })
        .then(resp => console.log(resp))
        .catch(err => console.log(err))
    }

    console.log('validation', this.state.sign.validation)
  }

  validate (event) {
    let valid = true

    this.setState(prevState => ({
      sign: {
        ...prevState.sign,
        validation: []
      }
    }))

    if (this.state.sign.email === '') {
      this.setState(prevState => ({
        sign: {
          ...prevState.sign,
          validation: [...prevState.sign.validation.concat(['E-mail is required'])]
        }
      }))
      valid = false
    }

    if (this.state.sign.password === '') {
      this.setState(prevState => ({
        sign: {
          ...prevState.sign,
          validation: [...prevState.sign.validation.concat(['Password is required'])]
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
              sign={this.state.sign}
              onHandleChange={this.handleChange}
            />}
        />
        <Route
          path='/register' render={() =>
            <Register
              sign={this.state.sign}
              onHandleChange={this.handleChange}
              onHandleRegisterSubmit={this.handleRegisterSubmit}
            />}
        />
      </Router>
    )
  }
}
