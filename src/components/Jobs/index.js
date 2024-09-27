import {Component} from 'react'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {BsSearch} from 'react-icons/bs'
import FilterTypeAndSalary from '../FilterTypeAndSalary'
import JobCards from '../JobCards'

import Headers from '../Headers'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    jobList: [],
    apiStatus: apiStatusConstants.initial,
    employeeType: [],
    minimumSalary: 0,
    searchInput: '',
  }

  componentDidMount() {
    this.getJobs()
  }

  onUserSearch = e => {
    this.setState({searchInput: e.target.value})
  }
  getJobs = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {employeeType, minimumSalary, searchInput} = this.state
    const url = `https://apis.ccbp.in/jobs?employment_type=${employeeType.join()}&minimum_package=${minimumSalary}&search=${searchInput}`
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      methode: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()

      const updateList = data.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))
      this.setState({
        jobList: updateList,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderSuccess = () => {
    const {jobList} = this.state
    const consLength = jobList.length > 0

    return consLength ? (
      <ul>
        {jobList.map(eachItem => (
          <JobCards jobList={eachItem} key={eachItem.id} />
        ))}
      </ul>
    ) : (
      <div className="no-jobs-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          className="no-jobs-img"
          alt="no jobs"
        />
        <h1 className="no-jobs-heading">No Jobs Found</h1>
        <p className="no-jobs-description">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }
  renderFail = () => (
    <div className="fail-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="fail-img"
      />
      <h1 className="error">Oops! Something Went Wrong</h1>
      <p className="erroe-pera">
        We cannot seem to find the page you are looking for
      </p>
      <button className="retry-button" onClick={this.getJobs}>
        Retry
      </button>
    </div>
  )
  renderLoder = () => (
    <div className="loader-container" data-testid="loader">
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

  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      this.getJobs()
    }
  }

  changeSalary = salary => {
    this.setState({minimumSalary: salary}, this.getJobs)
  }

  changeEmployeeList = type => {
    this.setState(
      prev => ({employeeType: [...prev.employeeType, type]}),
      this.getJobs,
    )
  }

  render() {
    const {searchInput} = this.state
    return (
      <div className="job-container">
        <Headers />
        <div className="card">
          <ul>
            <FilterTypeAndSalary
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              changeSearchInput={this.changeSearchInput}
              searchInput={searchInput}
              getJobs={this.getJobs}
              changeSalary={this.changeSalary}
              changeEmployeeList={this.changeEmployeeList}
            />
          </ul>

          <div className="jobs-container">
            <div className="search-bar-container">
              <input
                onChange={this.onUserSearch}
                onKeyDown={this.onEnterSearchInput}
                placeholder="Search"
                className="search"
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-button"
                onClick={this.getJobs}
              >
                <BsSearch className="search-icon-desktop" />
              </button>
            </div>
            {this.renderAllView()}
          </div>
          <br />
        </div>
      </div>
    )
  }
}
export default Jobs
