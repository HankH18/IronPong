import React from 'react'
import User from './models/userModel.js'
import STORE from './store.js'
import $ from 'jquery'
import { GameModel } from './models/gameModel'
import Backbone from 'backbone'

const ACTIONS = {

	registerUser: function(formData) {
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
		User.register(formData)
			.done(
				function(response) {
					console.log('register success', response)
					ACTIONS.loginUser(formData.email, formData.password)
				}
				)
			.fail(
				function(error) {
					console.log('register fail', error)
				}
				)
		} 
		else {
			console.log('bad email')
			document.querySelector('.registerEmailRejection').innerHTML = 'Invalid email address'
		}
	},

	loginUser: function(email, password) {
		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
		User.login(email, password) 
			.done(
				function(response){
					console.log('login success', response)
					ACTIONS.loggedInStatus()
					ACTIONS.getUserId()
					location.hash = 'home'
				}
				)
			.fail(
				function(error){
					console.log('login fail', error)
				}
				)
		} else {
			document.querySelector('.loginEmailRejection').innerHTML = ' Invalid email address'
		}
	},

	logoutUser: function() {
		User.logout()
			.done(
				function(response) {
					console.log('you logged out', response)
					ACTIONS.loggedInStatus()
					location.hash = 'login'
				})
			.fail(
				function(error) {
					console.log('problem logging out', error)
				})
	},

	loggedInStatus: function(){

		console.log(User.getCurrentUser())
		if(User.getCurrentUser() != null){

			STORE.set({userLoginStatus: 'Log Out'})
			console.log(STORE.data.userLoginStatus)

			return 'Log Out'
		}

		else{

			STORE.set({userLoginStatus: 'Log In'})
			console.log(STORE.data.userLoginStatus)

			return 'Log In'
		}
		this.getUserId()
	},

	fetchUsers: function(id) {

		var userColl = STORE.get('userCollection')
		userColl.fetch()
			.then(function() {

				STORE.set({
					userCollection: userColl
				})
	
			})
	},

	getUserId: function(){

		if(User.getCurrentUser()){
			var id = User.getCurrentUser().attributes._id
			console.log(id)
			STORE.set({'currentUserId': id})
		}

	},

	fetchQueue: function(){
		var queueColl = STORE.get('queueCollection')
		queueColl.fetch()

			.then(function() {
					console.log(queueColl)
				STORE.set({

					queueCollection: queueColl
				})
			})
	},

	reclaimUser: function(userID,formData){
		console.log(JSON.stringify(formData))
		$.ajax({
			method: 'PUT',
			type: 'json',
			url: `api/users/${userID}`,
			data: formData
		})
		.done((res)=>{
			ACTIONS.loginUser(formData.email, formData.password)
		})
		.fail((err)=>{
			alert(err.responseText)
		})
	},
	
	fetchGames: function() {
		var gameColl = STORE.get('items')
		gameColl.fetch()

			.then(function() {
				STORE.set({
					items: gameColl
				})
			})
	},

	addUserToQueue: function() {
		let userId = User.getCurrentUser().get('_id')
		$.ajax({
			method: 'PUT',
			type: 'json',
			url: `api/queue/add/${userId}`,
		})
		.done(()=>{
			ACTIONS.fetchQueue()
		})
		.fail((err)=>{
			alert(err.responseText)
		})
	},

	removeUserFromQueue: function() {
		let userId = User.getCurrentUser().get('_id')
		$.ajax({
			method: 'PUT',
			type: 'json',
			url: `api/queue/delete/${userId}`,
		})
		.done(()=>{
			ACTIONS.fetchQueue()
		})
		.fail((err)=>{
			alert(err.responseText)
		})

	},
	createNewGame: function(ev) {
		ev.preventDefault()
		
		var winnerID,
		loserID,
		player1ID='',
		player2ID='',
		player1 = ev.target.player1.value,
		player2 = ev.target.player2.value,
		p1Score = Number(ev.target.player1Score.value),
		p2Score = Number(ev.target.player2Score.value)
		
	
		var p1Promise = $.ajax({
			method: 'GET',
			type: 'json',
			url: `api/users/`,
			data:{
				nickName:`${player1}`
			}
		})

		var p2Promise = $.ajax({
			method: 'GET',
			type: 'json',
			url: `api/users/`,
			data:{
				nickName:`${player2}`
			}
		})

		$.when(p1Promise,p2Promise).done((p1,p2) => {
			
			player1ID = p1[2].responseJSON[0]._id
			player2ID = p2[2].responseJSON[0]._id
			console.log(p1Score>p2Score)
			if (p1Score > p2Score){
				winnerID = player1ID
				loserID = player2ID
			}
			else {
				winnerID = player2ID
				loserID = player1ID
			}
			console.log(winnerID,loserID)
			let newGame = new GameModel({
				playerOne: player1,
				playerTwo: player2,
				winner: winnerID,
				loser: loserID,
				playerOneScore: p1Score,
				playerTwoScore: p2Score
			})
			newGame.save().then(location.hash='leaderboard')
		})

	}
}

ACTIONS.loggedInStatus()

export default ACTIONS