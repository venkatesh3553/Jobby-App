import {BsFillBriefcaseFill, BsStarFill} from 'react-icons/bs'
import {MdLocationOn} from 'react-icons/md'

import './index.css'

const SimilorJobs = props => {
  const {similarList} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarList

  return (
    <div className="simililar-container">
      <li className="similar-card-li-list">
        <div className="logo-and-name">
          <img
            src={companyLogoUrl}
            className="card-logo"
            alt="similar job company logo"
          />
          <div className="details">
            <h1 className="card-name">{title}</h1>
            <div className="star-card">
              <BsStarFill className="star" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>

        <div className="discription-card">
          <h1 className="discription-name">Description</h1>
          <p className="discription">{jobDescription}</p>
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
        </div>
      </li>
    </div>
  )
}
export default SimilorJobs
