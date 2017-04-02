import React from 'react'
import ACTIONS from '../actions.js'
import STORE from '../store.js'
import NavBar from './components/navBar'
import Header from './components/header'

var ProfilePage = React.createClass({

	componentWillMount: function(){

		ACTIONS.fetchUsers()

		STORE.on('dataUpdated', () => {
			
			this.setState(STORE.data)

		})

	},

	getInitialState: function(){
	
		return STORE.data

	},

	render: function(){

		var users = this.state.userCollection.models

		console.log(users)

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

				</div>

				)

			}
		}
		
		return(

			<div className = 'profile-page-wrapper'>

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