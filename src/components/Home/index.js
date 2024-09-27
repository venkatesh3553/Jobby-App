import {Link} from 'react-router-dom'

import Headers from '../Headers'
import './index.css'

const Home = () => (
  <>
    <Headers />
    <div className="home-container">
      <h1 className="home-head">Find The Job That Fits Your Life</h1>
      <p className="home-pera">
        Millions of people are searching for jobs, salary information,
        <br /> company reviews. Find the job that fits your
        <br /> abilities and potential.
      </p>
      <Link to="/jobs">
        <button className="button">Find Jobs</button>
      </Link>
    </div>
  </>
)
export default Home
