import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'
import './index.css'

class Home extends Component {
  state = {
    teams: [],
    isLoading: true,
    hasError: false,
  }

  componentDidMount() {
    this.fetchTeams()
  }

  fetchTeams = async () => {
    try {
      const response = await fetch('https://apis.ccbp.in/ipl')
      if (!response.ok) {
        throw new Error('Failed')
      }

      const data = await response.json()

      console.log(data)

      const updatedData = data.teams.map(team => ({
        name: team.name,
        id: team.id,
        teamImageUrl: team.team_image_url,
      }))

      this.setState({teams: updatedData, isLoading: false})
    } catch {
      this.setState({isLoading: false, hasError: true})
    }
  }

  render() {
    const {teams, isLoading, hasError} = this.state

    if (isLoading) {
      return (
        <div className="loader-container" data-testid="loader">
          <Loader type="Oval" color="#ffffff" height={50} width={50} />
        </div>
      )
    }

    if (hasError) {
      return (
        <div className="home-container">
          <p className="error-text">Failed to fetch teams</p>
        </div>
      )
    }

    return (
      <div className="home-container">
        <div className="header">
          <img
            className="ipl-logo"
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
          />
          <h1 className="heading">IPL Dashboard</h1>
        </div>
        <ul className="teams-grid">
          {teams.map(each => (
            <TeamCard key={each.id} teamDetails={each} />
          ))}
        </ul>
      </div>
    )
  }
}

export default Home