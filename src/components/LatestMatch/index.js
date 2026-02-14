import './index.css'

const LatestMatch = props => {
  const {latestMatchDetails} = props
  const {
    competingTeam,
    competingTeamLogo,
    date,
    venue,
    result,
    firstInnings,
    secondInnings,
    manOfTheMatch,
    umpires,
  } = latestMatchDetails

  return (
    <div className="latest-match-container">
      <div className="latest-logo-left-container">
        <div className="latest-left">
          <h3 className="latest-team">{competingTeam}</h3>
          <p className="latest-date">{date}</p>
          <p className="latest-venue">{venue}</p>
          <p className="latest-result">{result}</p>
        </div>

        <div className="latest-center">
          <img
            src={competingTeamLogo}
            alt={`latest match ${competingTeam}`}
            className="latest-logo"
          />
        </div>
      </div>
      <hr className="hr-line" />
      <div className="latest-right">
        <div className="detail-block">
          <p className="detail-title">First Innings</p>
          <p>{firstInnings}</p>
        </div>

        <div className="detail-block">
          <p className="detail-title">Second Innings</p>
          <p>{secondInnings}</p>
        </div>

        <div className="detail-block">
          <p className="detail-title">Man Of The Match</p>
          <p>{manOfTheMatch}</p>
        </div>

        <div className="detail-block">
          <p className="detail-title">Umpires</p>
          <p>{umpires}</p>
        </div>
      </div>
    </div>
  )
}

export default LatestMatch
