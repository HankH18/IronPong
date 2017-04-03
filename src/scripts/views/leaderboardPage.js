import React from 'react'
import ACTIONS from '../actions.js'
import STORE from '../store.js'
import NavBar from './components/navBar'
import Header from './components/header'

var LeaderboardPage = React.createClass({
	componentWillMount: function() {
		ACTIONS.fetchUsers()
		STORE.on('dataUpdated', () => {
			this.setState(STORE.data)
		})
	},
	componentWillUnmount: function() {
		STORE.off('dataUpdated')
	},
	getInitialState: function() {
		return STORE.data
	},
	render: function(){
		return(
			<div className = 'leaderboard-page-wrapper'>
				<Header />
				<NavBar />
				<LeaderboardDisplay userColl={this.state.userCollection} />
			</div>
		)

	}

})

var LeaderboardDisplay = React.createClass({
	render: function() {

		var users = this.props.userColl.models

		users = users.sort( function(a, b) {
			return b.get("winRatio") - a.get("winRatio")
		})
		
		return(
			<div id="leaderboardDisplay">
				<h2>Leaderboard</h2>
				<div className="leaderboard-row">
					<div className="leaderboard-column nick-name">Name</div>
					<div className="leaderboard-column wins">Wins</div>
					<div className="leaderboard-column losses">Losses</div>
					<div className="leaderboard-column win-streak">Win Streak</div>
					<div className="leaderboard-column win-ratio">Win Ratio</div>
					<div className="leaderboard-column trophy"></div>
				</div>
				{users.map( (user, i) => {
					return <div className="leaderboard-row" key={user.get("_id")}>
						<div className="leaderboard-column nick-name">{user.get("nickName")}</div>
						<div className="leaderboard-column wins">{user.get("wins")}</div>
						<div className="leaderboard-column losses">{user.get("losses")}</div>
						<div className="leaderboard-column win-streak">{user.get("winStreak")}</div>
						<div className="leaderboard-column win-ratio">{user.get("winRatio")}</div>

						<div className="leaderboard-column trophy">
							{i === 0 &&
							<img src="/images/trophy.png"/>
							}
						</div>
					</div>
				})}

			</div>
		)

	}
})

export default LeaderboardPage