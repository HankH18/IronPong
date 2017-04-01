import React from 'react'
import ReactDOM from 'react-dom'
import Backbone from 'backbone'
import init from './init'
import LoginView from './views/loginPage'
import STORE from './store'
import ACTIONS from './actions'

//Pages imports
import HomePage from './views/homepage.js'
import LoginPage from './views/loginPage.js'
import ProfilePage from './views/profilePage.js'
import CreateGamePage from './views/createGamePage.js'
import LeaderboardPage from './views/leaderboardPage.js'


const app = function() {
  	let PongRouter = Backbone.Router.extend({

	    routes: {
	    	'home': 'renderHomePage',
	    	'login': 'renderLoginPage',
	    	'profile/:id': 'renderProfilePage',
	    	'leaderboard': 'renderLeaderboardPage',
	    	'create_game': 'renderCreateGamePage',
	    	'*default': 'handleRedirect',

	    },

	    handleRedirect: function(){

	    	location.hash = "home"

	    },

	    renderHomePage: function(){
	    	ACTIONS.loggedInStatus()
	    	ReactDOM.render(<HomePage />, document.querySelector('.container'))

	    },

	    renderLoginPage: function(){
	    	ACTIONS.loggedInStatus()
	    	ReactDOM.render(<LoginPage />, document.querySelector('.container'))

	    },

	    renderProfilePage: function(id){

    		ReactDOM.render(<ProfilePage />, document.querySelector('.container'))

    	},

    	renderCreateGamePage: function(){

    		ReactDOM.render(<CreateGamePage />, document.querySelector('.container'))
    	},

    	renderLeaderboardPage: function(){

    		ReactDOM.render(<LeaderboardPage />, document.querySelector('.container'))

    	}

  	})

	new PongRouter
	Backbone.history.start()
}

// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..
// NECESSARY FOR USER FUNCTIONALITY. DO NOT CHANGE. 
export const app_name = init()
app()
// x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..