import './index.css'

const AllSkills = props => {
  const {skills} = props
  const {imageUrl, name} = skills

  return (
    <div className="c">
      <li className="skill-container">
        <img src={imageUrl} alt={name} className="skill-img" />
        <p className="skill-name">{name}</p>
      </li>
    </div>
  )
}
export default AllSkills
