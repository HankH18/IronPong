import React from 'react'
import User from './models/userModel.js'
import STORE from './store.js'

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
	},

	fetchUsers: function(id) {

		var userColl = STORE.get('userCollection')
		userColl.fetch()
			.then(function() {

				STORE.set({
					userCollection: userColl
				})

				// if(id){
				// 	for(var i = 0; i < userColl.models.length; i++){

				// 		if(userColl.models[i].attributes._id === id){
				// 			console.log('found a match')
				// 			STORE.set({

				// 				selectedUser: userColl.models[i].attributes

				// 			})
				// 			console.log(STORE.data.selectedUser)
				// 			return(userColl.models[i].attributes)
				// 		}
				// 	}
				// }	
			})
	},

	getUserId: function(){

		var id = User.getCurrentUser().attributes._id
		STORE.set({'currentUserId': id})

	},

	returnUserById: function(id){
		var theUserId = id
		var usersCollection = STORE.get('userCollection')

		usersCollection.fetch()

			.then(function() {

				console.log(usersCollection.models)

				for(var i = 0; i < usersCollection.models.length; i++){

					if(usersCollection.models[i].attributes._id === id){
						console.log('found a match')
						STORE.set({

							selectedUser: usersCollection.models[i].attributes

						})
						console.log(STORE.data.selectedUser)
						return(usersCollection.models[i].attributes)
					}
				}
			})

	}
}

ACTIONS.loggedInStatus()

export default ACTIONS