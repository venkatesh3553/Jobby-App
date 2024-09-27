import {Link} from 'react-router-dom'
import {BsFillBriefcaseFill, BsStarFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'
import './index.css'

const JobCards = props => {
  const {jobList} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    id,
  } = jobList
  return (
    <Link className="card-container" to={`/jobs/${id}`}>
      <li className="card-li-list">
        <div className="logo-and-name">
          <img src={companyLogoUrl} className="card-logo" alt="company logo" />
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
          <h1 className="discription-name">Description</h1>
          <p className="discription">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}
export default JobCards
