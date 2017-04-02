import React from 'react'
import ACTIONS from './../actions.js'
import STORE from './../store.js'
import NavBar from './components/navBar'
import Header from './components/header'
import User from './../models/userModel.js'
import {QueueCollection} from './../models/gameModel.js'

const QueuePage = React.createClass({
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
		let buttons=null
		if(this.state.userLoginStatus === 'Log Out'){
			buttons= 
					<div>
						<button onClick={ACTIONS.addUserToQueue}>Add me to the queue</button>
						<button onClick={ACTIONS.removeUserFromQueue}>Remove me from the queue</button>
					</div> 
		}
		return(
			<div>
				<div className = 'queue-page-wrapper'>
					<Header />
					<NavBar />
					<Queue queueCollection={this.state.queueCollection} />
				</div>
				{buttons}
			</div>
		)
	}
})

const Queue = React.createClass({
	_makeQueueUser: function(model, index){
		return(
			<QueueDisplay 
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


const QueueDisplay = React.createClass({
	render: function() {
	
		
		return(
			<div className = 'queue-wrapper'>
				<table>
					<thead>
						<tr>
							<th>Queue Position</th>
							<th>Name</th>
							<th>Wins</th>
							<th>Losses</th>
							<th>Winning Streak</th>
							<th>Winning Percentage</th>
						</tr>
					</thead>
					<tbody>
							<tr>
								<td>{this.props.queuePosition}</td>
								<td>{this.props.queueModel.get('nickName')}</td>
								<td>{this.props.queueModel.get('wins')}</td>
								<td>{this.props.queueModel.get('losses')}</td>
								<td>{this.props.queueModel.get('winStreak')}</td>
								<td>{this.props.queueModel.get('winRatio')}</td>
							</tr>
					</tbody>
				</table>
			</div>
		)
	}
})

export default QueuePage