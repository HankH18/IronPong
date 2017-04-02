import React from 'react'
import ACTIONS from '../actions.js'
import STORE from '../store.js'
import NavBar from './components/navBar'

var CreateGamePage = React.createClass({

	render: function(){
		return(
			<div className = 'create-game-page-wrapper'>
				<NavBar />
				<NewGame />
			</div>
		)

	}

})

var NewGame = React.createClass({
	render: function(){
		return(
			<div className='form-wrapper login-form'>
				<h2>Create New Game</h2>
				<form onSubmit={this._handleSubmit}>
					<input type='text' name='player1' placeholder='Player 1' />
					<span className='loginEmailRejection emailRejection'></span><br /><br />
					<input type='text' name='player2' placeholder='Player 2' /><br /><br />
					<span className='loginEmailRejection emailRejection'></span><br /><br />
					<input type='text' name='winner' placeholder='Winner' /><br /><br />
					<span className='loginEmailRejection emailRejection'></span><br /><br />
					<input type='text' name='loser' placeholder='Loser' /><br /><br />
					<span className='loginEmailRejection emailRejection'></span><br /><br />
					<input type='text' name='player1Score' placeholder='Player 1 Score' /><br /><br />
					<span className='loginEmailRejection emailRejection'></span><br /><br />
					<input type='text' name='player2Score' placeholder='Player 2 Score' /><br /><br />
					<button type='submit'>Login</button>
				</form>
			</div>

		)
	}

})

export default CreateGamePage