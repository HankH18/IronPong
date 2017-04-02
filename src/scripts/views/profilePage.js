import React from 'react'
import ACTIONS from '../actions.js'
import STORE from '../store.js'
import NavBar from './components/navBar'
import Header from './components/header'

var ProfilePage = React.createClass({

	componentWillMount: function(){

		ACTIONS.fetchGames()
		STORE.on('dataUpdated', () => {
			this.setState(STORE.data)
		})

	},

	getInitialState: function(){

		return STORE.data

	},

	createRecentGames: function(singleGame) {
		return(
			<div className = 'game-snapshot-wrapper'>
				<h3>{singleGame.attributes.date}</h3>
				<h4>winning score: &nbsp; {singleGame.attributes.winner} &nbsp; {singleGame.attributes.winningScore}</h4>
				<h4>losing score: &nbsp; {singleGame.attributes.loser} &nbsp; {singleGame.attributes.losingScore}</h4>
				<h4>spread: &nbsp; {singleGame.attributes.winningScore-singleGame.attributes.losingScore}</h4>
			</div>
		)
	},

	render: function(){

		var totalGamesArray = this.state.items.models

		var currentUserId = this.props.currentUserId

		var recentGamesArray = []

		for (i = 0; i < totalGamesArray.length; i ++) {
			if (totalGamesArray[i].attributes.playerOne === currentUserId ||
				totalGamesArray[i].attributes.playerTwo === currentUserId) {
				recentGamesArray.push(totalGamesArray[i])
			}
		}

		return(

			<div className = 'profile-page-wrapper'>

				<Header />

				<NavBar />

				<StatsComponent stats = {this.state}/>

				<RecentGamesComponent recentGames={recentGamesArray} makeItem={this.createRecentGames}/>	

			</div>

		)

	}

})

var AvatarComponent = React.createClass({
	render: function(){

		return(

			<div className = 'avatar-img'>
				<img src='images/doge.png'/>
			</div>

		)
	}
})

var RecentGamesComponent = React.createClass({

	render: function(){

		return (

			<div className = 'recent-games-wrapper'>
				<h2>Recent Games</h2>
				{recentGames.map(this.props.makeItem)}

			</div>

		)

	}

})


var StatsComponent = React.createClass({

	render: function(){

		return(

			<div className = 'profile-stats-wrapper'>

				<h3>spread: {this.props.stats.spread}</h3>
				<h3>wins: {this.props.stats.wins}</h3>
				<h3>losses: {this.props.stats.losses}</h3>
				
			</div>

		)

	}

})


export default ProfilePage