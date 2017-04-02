import React from 'react'
import User from './models/userModel.js'
import STORE from './store.js'
import $ from 'jquery'

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
	},

	fetchUsers: function() {
		var userColl = STORE.get('userCollection')
		userColl.fetch()
			.then(function() {
				STORE.set({
					userCollection: userColl
				})
			})
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
	}
}

ACTIONS.loggedInStatus()

export default ACTIONS