import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsFillBriefcaseFill, BsStarFill} from 'react-icons/bs'
import {BiLinkExternal} from 'react-icons/bi'
import {MdLocationOn} from 'react-icons/md'

import SimilorJobs from '../SimilorJobs'
import AllSkills from '../AllSkills'
import Headers from '../Headers'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobDetails extends Component {
  state = {apiStatus: apiStatusConstants.initial, jobData: {}, similarList: []}

  componentDidMount() {
    this.getJobData()
  }
  getJobAllData = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    location: data.location,
    rating: data.rating,
    title: data.title,
    packagePerAnnum: data.package_per_annum,
    skills: data.skills.map(eachSkill => ({
      imageUrl: eachSkill.image_url,
      name: eachSkill.name,
    })),
  })

  getSimilarData = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    rating: data.rating,
    title: data.title,
  })

  getJobData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updateData = this.getJobAllData(data.job_details)
      const updateDataSimilorJobsDataList = data.similar_jobs.map(eachItem =>
        this.getSimilarData(eachItem),
      )

      this.setState({
        apiStatus: apiStatusConstants.success,
        jobData: updateData,
        similarList: updateDataSimilorJobsDataList,
      })
      console.log(data)
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccess = () => {
    const {jobData, similarList} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      lifeAtCompany,
      skills,
    } = jobData

    const {description, imageUrl} = lifeAtCompany

    return (
      <div className="JobDetails-container">
        <div className="alldetails-card">
          <div className="logo-and-name">
            <img
              src={companyLogoUrl}
              className="card-logo"
              alt="job details company logo"
            />
            <div className="details">
              <h1 className="card-name">{title}</h1>
              <div className="star-card">
                <BsStarFill className="star" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="bottom">
            <div className="location-type">
              <div className="star-card">
                <MdLocationOn className="icon" />
                <p className="location">{location}</p>
              </div>
              <div className="star-card">
                <BsFillBriefcaseFill className="icon" />
                <p className="location">{employmentType}</p>
              </div>
            </div>
            <p className="packagePerAnnum">{packagePerAnnum}</p>
          </div>
          <hr className="hr" />
          <div className="discription-card">
            <div className="visi-container">
              <h1 className="discription-name">Description</h1>
              <div className="visit-card">
                <a href={companyWebsiteUrl} className="visit-name">
                  {' '}
                  Visit
                </a>
                <BiLinkExternal className="visit-icon" />
              </div>
            </div>
            <p className="discription">{jobDescription}</p>
            <h1 className="skill-head">Skills</h1>
            <ul className="skill-card">
              {skills.map(eachSkill => (
                <AllSkills skills={eachSkill} key={eachSkill.name} />
              ))}
            </ul>

            <div className="similor-card">
              <h1 className="similor-head">Life at Company</h1>
              <div className="similior-discription-img">
                <p className="similior-description">{description}</p>
                <img
                  src={imageUrl}
                  alt="life at company"
                  className="similior-img"
                />
              </div>
            </div>
          </div>
        </div>

        <h1 className="similor-head">Similor Jobs</h1>
        <ul className="similor-jobs">
          {similarList.map(eacjItem => (
            <SimilorJobs similarList={eacjItem} key={eacjItem.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderFail = () => (
    <div className="fail">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="fail-img"
      />
      <h1 className="head">Oops! Something Went Wrong</h1>
      <p className="pera">
        {' '}
        We cannot seem to find the page you are looking for
      </p>
      <button
        className="button"
        type="button"
        id="button"
        onClick={this.getJobAllData}
      >
        Retry
      </button>
    </div>
  )

  renderLoder = () => (
    <div className="loder" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
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
  render() {
    return (
      <>
        <Headers />
        {this.renderAllView()}
      </>
    )
  }
}
export default JobDetails
