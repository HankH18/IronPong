import React from 'react'
import ACTIONS from '../actions.js'
import STORE from '../store.js'
import NavBar from './components/navBar'
import Header from './components/header'

var ProfilePage = React.createClass({

	componentWillMount: function(){

		
		ACTIONS.fetchUsers()
		ACTIONS.fetchGames()
		STORE.on('dataUpdated', () => {
			
			this.setState(STORE.data)
		})

	},

	getInitialState: function(){
	
		return STORE.data

	},

	render: function(){

		var users = this.state.userCollection.models

		var totalGamesArray = this.state.items.models
		console.log(totalGamesArray)

		var currentUserId = this.props.currentUserId

		var recentGamesArray = []

		for (var i = 0; i < totalGamesArray.length; i ++) {
			if (totalGamesArray[i].attributes.playerOne === currentUserId ||
				totalGamesArray[i].attributes.playerTwo === currentUserId) {
				recentGamesArray.push(totalGamesArray[i])
			}
		}

		for(var i = 0; i < users.length; i++){

			var theUser = users[i].attributes

			if(location.hash.split('/')[1] === theUser._id){

				return(

					<div className = 'profile-page-wrapper'>

						<Header />

						<NavBar />

						<div className = 'user-info-wrapper'>

							<AvatarComponent user = {theUser} />

							<StatsComponent stats = {theUser} />

						</div>

						<RecentGamesComponent recentGames={recentGamesArray} makeItem={this.createRecentGames}/>

					</div>

				)

			}
			else{
				return(<div></div>)
			}
		}

		

	}

})

var RecentGamesComponent = React.createClass({

	createRecentGames: function(singleGame) {
		var attributes = singleGame.attributes
		return(
			<div className = 'game-snapshot-wrapper'>
				<h3>{attributes.createdAt}</h3>
				<h4>winning score: &nbsp; {attributes.winner} &nbsp; {(attributes.playerOneScore>attributes.playerTwoScore)?attributes.playerOneScore:attributes.playerTwoScore}</h4>
				<h4>losing score: &nbsp; {attributes.loser} &nbsp; {(attributes.playerOneScore>attributes.playerTwoScore)?attributes.playerTwoScore:attributes.playerOneScore}</h4>
				<h4>spread: &nbsp; {(attributes.playerOneScore>attributes.playerTwoScore)?(attributes.playerOneScore-attributes.playerTwoScore):(attributes.playerTwoScore-attributes.playerOneScore)}</h4>
			</div>
		)
	},

	render: function(){

		return (

			<div className = 'recent-games-wrapper'>
				<h2>Recent Games</h2>
				{this.props.recentGames.map(this.props.makeItem)}

			</div>

		)

	}
})

var AvatarComponent = React.createClass({

	render: function(){
		console.log(this.props.user)
		return(
		
			<div className = 'avatar-wrapper'>
				<h3>{this.props.user.nickName}</h3>
				<div className = 'avatar-img'>
					<img src='images/sid.png'/>
				</div>
			</div>
		)
	}
})


var StatsComponent = React.createClass({

	render: function(){

		return(

			<div className = 'profile-stats-wrapper'>

				<h3>wins: {this.props.stats.wins}</h3>
				<h3>losses: {this.props.stats.losses}</h3>
				<h3>spread: {this.props.stats.winRatio}</h3>
				
			</div>

		)

	}

})

export default ProfilePage