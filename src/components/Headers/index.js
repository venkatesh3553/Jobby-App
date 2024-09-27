import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Headers = props => {
  const onLogOut = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav>
      <div className="header-contaiener">
        <div className="header-logo">
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              className="header-logoimg"
              alt="website logo"
            />
          </Link>
        </div>

        <ul className="header-names-contaiener">
          <li className="li">
            <Link to="/" className="header-name">
              Home
            </Link>
          </li>
          <li className="li">
            <Link to="/jobs" className="header-name">
              jobs
            </Link>
          </li>
          <li>
            <button className="logout-button" onClick={onLogOut}>
              Logout
            </button>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Headers)
