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
				<LeaderboardDisplay userColl={this.state.userCollection.where({claimed:true})} />
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
			<div>
				<table>
					<thead>
						<tr>
							<th>Name</th>
							<th>Wins</th>
							<th>Losses</th>
							<th>Winning Streak</th>
							<th>Winning Percentage</th>
						</tr>
					</thead>
					<tbody>
						{users.map( (user) => {
							return <tr key={user.get("_id")}>
								<td>{user.get("nickName")}</td>
								<td>{user.get("wins")}</td>
								<td>{user.get("losses")}</td>
								<td>{user.get("winStreak")}</td>
								<td>{user.get("winRatio")}</td>
							</tr>
						})}
					</tbody>
				</table>

			</div>
		)

	}
})

export default LeaderboardPage