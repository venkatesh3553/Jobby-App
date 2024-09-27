import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class UserProfile extends Component {
  state = {
    userData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getUser()
  }

  getUser = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const token = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const userData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }

      this.setState({apiStatus: apiStatusConstants.success, userData})
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccess = () => {
    const {userData} = this.state
    const {name, profileImageUrl, shortBio} = userData
    return (
      <div className="profail-cotainer">
        <img src={profileImageUrl} className="user-img" alt="profail" />
        <h1 className="user-name">{name}</h1>
        <p className="boi">{shortBio}</p>
      </div>
    )
  }

  renderFail = () => (
    <div className="user-fail">
      <button className="user-fail-button" onClick={this.getUser} type="button">
        Retry
      </button>
    </div>
  )

  renderAllView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccess()
      case apiStatusConstants.failure:
        return this.renderFail()
      case apiStatusConstants.inProgress:
        return this.renderLoder()
      default:
        return null
    }
  }

  renderLoder = () => (
    <div className="profile-loader-container " id="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  render() {
    const {list} = this.state
    console.log(list)
    return <div>{this.renderAllView()}</div>
  }
}

export default UserProfile
