import {Component} from 'react'
import Loader from 'react-loader-spinner'
import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'
import './index.css'

class TeamMatches extends Component {
  state = {
    teamBannerUrl: '',
    latestMatch: {},
    recentMatches: [],
    isLoading: true,
    hasError: false,
  }

  componentDidMount() {
    this.fetchMatches()
  }

  fetchMatches = async () => {
    const {match} = this.props
    const {id} = match.params

    try {
      const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
      if (!response.ok) {
        throw new Error('Failed')
      }

      const data = await response.json()

      const latestMatch = {
        umpires: data.latest_match_details.umpires,
        result: data.latest_match_details.result,
        manOfTheMatch: data.latest_match_details.man_of_the_match,
        id: data.latest_match_details.id,
        date: data.latest_match_details.date,
        venue: data.latest_match_details.venue,
        competingTeam: data.latest_match_details.competing_team,
        competingTeamLogo: data.latest_match_details.competing_team_logo,
        firstInnings: data.latest_match_details.first_innings,
        secondInnings: data.latest_match_details.second_innings,
        matchStatus: data.latest_match_details.match_status,
      }

      const recentMatches = data.recent_matches.map(each => ({
        umpires: each.umpires,
        result: each.result,
        manOfTheMatch: each.man_of_the_match,
        id: each.id,
        date: each.date,
        venue: each.venue,
        competingTeam: each.competing_team,
        competingTeamLogo: each.competing_team_logo,
        firstInnings: each.first_innings,
        secondInnings: each.second_innings,
        matchStatus: each.match_status,
      }))

      this.setState({
        teamBannerUrl: data.team_banner_url,
        latestMatch,
        recentMatches,
        isLoading: false,
      })
    } catch {
      this.setState({isLoading: false, hasError: true})
    }
  }

  render() {
    const {teamBannerUrl, latestMatch, recentMatches, isLoading, hasError} =
      this.state

    const {match} = this.props
    const {id} = match.params

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
      <div className={`team-matches-container ${id.toLowerCase()}`}>
        <img src={teamBannerUrl} alt="team banner" className="team-banner" />
        <h2 className="latest-heading">Latest Matches</h2>
        <LatestMatch latestMatchDetails={latestMatch} />
        <ul className="recent-grid">
          {recentMatches.map(match => (
            <MatchCard key={match.id} matchDetails={match} />
          ))}
        </ul>
      </div>
    )
  }
}

export default TeamMatches
