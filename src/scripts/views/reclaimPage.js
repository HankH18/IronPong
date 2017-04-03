import React from 'react'
import ACTIONS from '../actions.js'
import STORE from '../store.js'
import NavBar from './components/navBar'
import Header from './components/header'

var ReclaimPage = React.createClass({
	componentWillMount: function() {
		ACTIONS.fetchUsers()
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
			<div className = 'reclaim-page-wrapper'>
				<Header />
				<NavBar />
					<ReclaimForm oldUsers={this.state.userCollection.where({claimed:false})}/>
			</div>
		)

	}

})

var ReclaimForm = React.createClass({
	handleKeyPress: function(e){
		if(e.key == 'Enter' ){
			this.props.oldUsers.forEach(function(singleUser){
				if(singleUser.get('nickName') === e.target.value){
					location.hash = 'reclaim/'+singleUser.get('_id')
				}
			})
		}
	},
	render: function() {
		console.log('old users',this.props.oldUsers)

		return(
			<div>
				<input onKeyPress={this.handleKeyPress} type="text" placeholder="Enter old nickname"/>
			</div>
		) 
	}
})

export default ReclaimPage