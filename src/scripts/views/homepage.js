import React from 'react'
import ACTIONS from '../actions.js'
import STORE from '../store.js'
import NavBar from './components/navBar'
import Header from './components/header'

var HomePage = React.createClass({

	render: function(){
		return(
			<div className = 'home-page-wrapper'>
				<Header />
				<NavBar />
				<div id='home-page-columns'>
					<div id='button-col'>
						<a href='#create_game'>
							<button id='home-button'>Create a Game</button> 
						</a>
							<button id='home-button'>Join the Queue</button>
						<a href='#leaderboard'>
							<button id='home-button'>View Leaderboard</button>
						</a>
						<a href='#profile/:id'>
							<button id='home-button'>View my Profile</button>
						</a>
							<button id='home-button'>View All Players</button>
					</div>
					<div id='queue-col'>
						<h4>Current Queue</h4>
					</div>
				</div>
			</div>
		)
	}

})

export default HomePage