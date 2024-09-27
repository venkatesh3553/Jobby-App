import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: '', isError: false}

  userName = event => {
    this.setState({username: event.target.value})
  }

  userPassword = event => {
    this.setState({password: event.target.value})
  }

  loginSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  loginFail = errorMsg => {
    this.setState({isError: true, errorMsg})
  }

  onLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const apiUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.loginSuccess(data.jwt_token)
    } else {
      this.loginFail(data.error_msg)
    }
  }

  render() {
    const {username, password, errorMsg, isError} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-contaier">
        <form className="login-container " onSubmit={this.onLogin}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            className="logo"
            alt="website logo"
          />

          <div className="input-container">
            <label className="name" htmlFor="username">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              value={username}
              className="input-box"
              onChange={this.userName}
              placeholder="Username"
            />
          </div>
          <div className="input-container">
            <label className="name" htmlFor="password">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              value={password}
              className="input-box"
              onChange={this.userPassword}
              placeholder="Password"
            />
          </div>
          <button type="submit" className="button">
            Login
          </button>
          {isError && <p className="error-msg">*{errorMsg}</p>}
        </form>
      </div>
    )
  }
}
export default Login
