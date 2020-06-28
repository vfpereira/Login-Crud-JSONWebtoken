import React from 'react'
import 'styles/app.css'
import 'styles/util.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Login from 'components/Login'
import Register from 'components/Register'
export default class App extends React.Component {
  constructor (props) {
    super()
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (event) {
    console.log(event.target.value)
  }

  render () {
    return (
      <Router>
        <Route exact path='/' render={() => <Login onHandleChange={this.handleChange} />} />
        <Route path='/register' render={() => <Register onHandleChange={this.handleChange} />} />
      </Router>
    )
  }
}
