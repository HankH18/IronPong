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
					<div id='queue-col'>
						<h4>Current Queue</h4>
					</div>
				</div>
			</div>
		)
	}

})

export default HomePage