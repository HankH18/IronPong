import React from 'react'
import ACTIONS from '../actions.js'
import STORE from '../store.js'
import NavBar from './components/navBar'
import Header from './components/header'

var HomePage = React.createClass({
	componentWillMount: function() {
		ACTIONS.fetchQueue()
		STORE.on('dataUpdated', () => {
			this.setState(STORE.data)
		})
	},
	componentWillUnmount: function() {
		STORE.off('dataUpdated')
	},
	getInitialState: function() {
		return STORE.data
	},

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
							<button id='home-button' onClick={ACTIONS.addUserToQueue}>Join the Queue</button>
						<a href='#leaderboard'>
							<button id='home-button'>View Leaderboard</button>
						</a>
						<a href={"/#profile/" + STORE.data.currentUserId}>
							<button id='home-button'>View my Profile</button>
						</a>
					</div>
					<div id='queue-col'>
						<h4>Current Queue</h4>
						<HomeQueue queueCollection={this.state.queueCollection} />
					</div>
				</div>
			</div>		)
	}

})

var HomeQueue = React.createClass({
	_makeQueueUser: function(model, index){
		return(
			<QueueWidget 
			queuePosition ={++index}
			queueModel={model} />
		)
	},
	render: function(){
		console.log('logging the queuecoll', this.props.queueCollection)
		return(
		<div>
			{this.props.queueCollection.map(this._makeQueueUser)}
		</div>
		)
	}
})

var QueueWidget = React.createClass({
	render: function() {
		return(
			<div className = 'home-queue-widget'>
				<p>
					{this.props.queueModel.get('nickName')}
					<button id="widget-delete" onClick={ACTIONS.removeUserFromQueue}>X</button>
				</p>
			</div>
		)
	}
})

export default HomePage