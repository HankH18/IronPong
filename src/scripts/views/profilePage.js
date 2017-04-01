import React from 'react'
import ACTIONS from '../actions.js'
import STORE from '../store.js'
import NavBar from './components/navBar'
import Header from './components/header'

var ProfilePage = React.createClass({

	componentWillMount: function(){

		//fetch the user info collection
		//this.setState(STORE.data)

		//dumby data:
		this.setState(

		{
			'name': 'james',
			'spread': 3,
			'wins': 5,
			'losses': 2,
			'recentGames': [{

						'date': '1-2-18',
						'winningScore': '21',
						'losingScore': '4',
						'winner': 'kenji',
						'loser': 'james'

					},
					{	
						'date': '2-20-20',
						'winningScore': '21',
						'losingScore': '20',
						'winner': 'james',
						'loser': 'sean'
					}]

		})

	},

	getInitialState: function(){

		return STORE.data

	},

	render: function(){

		return(

			<div className = 'profile-page-wrapper'>

				<Header />

				<NavBar />

				<StatsComponent stats = {this.state}/>

				<RecentGamesComponent recentGames = {this.state.recentGames}/>	

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

	_makeRecentGames: function(recentGames){

		var recentGamesArray = []

		for(var i = 0; i < recentGames.length; i++){

			recentGamesArray.push(<SingleGameComponent recentGames={recentGames[i]}/>)

		}

		return (

			recentGamesArray

		)

	},

	render: function(){

		return (

			<div className = 'recent-games-wrapper'>
				<h2>Recent Games</h2>
				{this._makeRecentGames(this.props.recentGames)}

			</div>

		)

	}

})

var SingleGameComponent = React.createClass({

	render: function(){

		var spread = this.props.recentGames.winningScore - this.props.recentGames.losingScore

		return(

			<div className = 'game-snapshot-wrapper'>

				<h3>{this.props.recentGames.date}</h3>
				<h4>winning score: &nbsp; {this.props.recentGames.winner} &nbsp; {this.props.recentGames.winningScore}</h4>
				<h4>losing score: &nbsp; {this.props.recentGames.loser} &nbsp; {this.props.recentGames.losingScore}</h4>
				<h4>spread: &nbsp; {spread}</h4>

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