import React from 'react'
import ACTIONS from '../actions.js'
import STORE from '../store.js'
import NavBar from './components/navBar'
import Header from './components/header'

var ReclaimPage = React.createClass({

	render: function(){

		return(
			<div className = 'reclaim-page-wrapper'>
				<Header />
				<NavBar />
					<ReclaimForm />
			</div>
		)

	}

})

var ReclaimForm = React.createClass({
	handleKeyPress: function(){

	},
	render: function() {
		return(
			<div>
				<input onKeyPress={this.handleKeyPress} type="text" placeholder="Enter old nickname"/>
			</div>
		) 
	}
})

export default ReclaimPage