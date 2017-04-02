import React from 'react'
import ACTIONS from '../../actions'
import STORE from '../../store.js'
import User from '../../models/userModel'

var NavBar = React.createClass({

	componentWillMount: function(){

		ACTIONS.getUserId()
		STORE.on('dataUpdated', () => {

			this.setState(STORE.data)

		})

	},

	getInitialState: function(){

		return STORE.data

	},

	handleLogout: function () {

		ACTIONS.loggedInStatus()
		ACTIONS.logoutUser()

	},

	render: function() {
		//<a href="/#profile/:id">Profile</a>
		console.log(STORE.data.currentUserId)
		return(

			<div className='nav-bar-wrapper'>

				<a href="/#home">Home</a>
				<a href="/#queue">Queue</a>
				<a href="/#leaderboard">Leaderboard</a>
				<a href={"/#profile/" + STORE.data.currentUserId}>Profile</a>
				<a onClick={this.handleLogout}>{this.state.userLoginStatus}</a>
				
			</div>

		)
	}
})

export default NavBar