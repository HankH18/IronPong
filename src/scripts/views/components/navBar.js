import React from 'react'
import ACTIONS from '../../actions'
import STORE from '../../store.js'
import User from '../../models/userModel.js'


var NavBar = React.createClass({

	componentWillMount: function(){

		ACTIONS.getUserId()
		STORE.on('dataUpdated', () => {

			this.setState(STORE.data)

		})

	},

	componentWillUnmount: function() {
		STORE.off('dataUpdated')
	},

	getInitialState: function(){

		return STORE.data

	},

	handleLogout: function () {

		ACTIONS.loggedInStatus()
		ACTIONS.logoutUser()

	},

	render: function() {
<<<<<<< HEAD
		//<a href="/#profile/:id">Profile</a>
		console.log(STORE.data.currentUserId)
=======
		console.log(this.state.userLoginStatus)

		var userId = User.getCurrentUser()
		console.log('userid', userId)
		let gamePage = (User.getCurrentUser()) ? <a href="/#create_game">Create New Game</a> : null

>>>>>>> a7ba3c63350cc032d3d9a88cdca9494ad278eadc
		return(

			<div className='nav-bar-wrapper'>

				<a href="/#home">Home</a>
				<a href="/#queue">Queue</a>
				<a href="/#leaderboard">Leaderboard</a>
				<a href={"/#profile/" + STORE.data.currentUserId}>Profile</a>
				<a href="/#rules">Rules</a>
				{gamePage}
				<a onClick={this.handleLogout}>{this.state.userLoginStatus}</a>
				
			</div>

		)
	}
})

export default NavBar