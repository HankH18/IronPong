import React from 'react'
import ACTIONS from '../actions.js'
import STORE from '../store.js'
import NavBar from './components/navBar'
import Header from './components/header'

var ReclaimPage = React.createClass({
	render: function(){
		return(
			<div>
				<Header />
				<NavBar />
					<ReclaimUpdateForm userID={this.props.userID}/>
			</div>
		)

	}

})

var ReclaimUpdateForm = React.createClass({
	_handleSubmit: function(eventObj){
		eventObj.preventDefault()
		var formEl = eventObj.target
		var newData = {
			email: formEl.email.value,
			password: formEl.password.value,
			claimed: true
		}
		formEl.reset()

		ACTIONS.reclaimUser(this.props.userID,newData)
	},
	render: function() {

		return(
			<div>
				<form onSubmit={this._handleSubmit}>
					<input name="email" type="text" placeholder="Enter Email" />
					<input name="password" type="text" placeholder="Enter Password" />
					<button type="submit">Reclaim Profile</button>
				</form>
			</div>
		) 
	}
})

export default ReclaimPage