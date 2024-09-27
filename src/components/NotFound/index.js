import Headers from '../Headers'
import './index.css'

const NotFound = () => (
  <>
    <div className="notfound-container">
      <Headers />
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        className="notfound-img"
        alt="not found"
      />
      <h1 className="notfound-head">Page Not Found</h1>
      <p className="notfound-pera">
        we're sorry, the page you requested could not be found
      </p>
    </div>
  </>
)
export default NotFound
