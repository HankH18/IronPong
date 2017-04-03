import React from 'react'
import ACTIONS from '../actions.js'
import STORE from '../store.js'
import NavBar from './components/navBar'
import Header from './components/header'
import User from '../models/userModel'

var CreateGamePage = React.createClass({
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
		console.log(this.state)
		if (this.state.queueCollection.models.length >= 2 && 
			(this.state.queueCollection.models[0].get('_id') === User.getCurrentUser().get('_id') ||
			this.state.queueCollection.models[1].get('_id') === User.getCurrentUser().get('_id'))){
			return(
				<div className='login-page-wrapper'>
					<Header />
					<NavBar />
					<div className='register-login-wrapper'>
						<div className='form-wrapper login-form'>
							<form onSubmit={(ev) => ACTIONS.createNewGame(ev)}>
								<input type='text' name='player1' disabled placeholder='Player 1'  value={this.state.queueCollection.models[0].get('nickName')}/><br/>
								<input type='text' name='player2' disabled placeholder='Player 2'  value= {this.state.queueCollection.models[1].get('nickName')}/>	<br/>
								<input type='text' name='player1Score' placeholder='Player 1 Score' />	<br/>
								<input type='text' name='player2Score' placeholder='Player 2 Score' />	<br/>
								<button type='submit'>Create game</button>
							</form>
						</div>
					</div>
				</div>
			)
		}
		else return (
			<div className='login-page-wrapper'>
					<Header />
					<NavBar />
			</div>
		)
	}

})

export default CreateGamePage