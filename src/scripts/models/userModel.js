import Backbone from 'backbone'
import $ from 'jquery'
import {app_name} from '../app'

// var logoutUrl = 'https://iron-pong.herokuapp.com/auth/logout'
// var usersUrl = 'https://iron-pong.herokuapp.com/api/users'
// var registerUrl = 'https://iron-pong.herokuapp.com/auth/register'
// var loginUrl = 'https://iron-pong.herokuapp.com/auth/login'
var logoutUrl = '/auth/logout'
var usersUrl = '/api/users'
var registerUrl = '/auth/register'
var loginUrl = '/auth/login'

// ..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x
const UserAuthModel = Backbone.Model.extend({

	urlRoot: usersUrl,
	idAttribute: '_id'
})

UserAuthModel.register = function(newUserData) {
	if(typeof newUserData !== 'object') {  throw new Error("User.register needs to be of type object with email & password properties") }
	if(!newUserData.email || !newUserData.password || !newUserData.nickName) {  throw new Error("object needs email + password properties") }

	return $.ajax({
		method: 'POST',
		type: 'json',
		url: registerUrl,
		data: newUserData
	})
}

UserAuthModel.login = function(email, password) {
	if(!email || !password || email === '' || password === '') {  
		throw new Error("User.login(«email», «password») method needs strings for email, password arguments") 
	}

	if(typeof email !== 'string' || typeof password !== 'string' ) {  
		throw new Error("User.login(«email», «password») email + password arguments should both be strings") 
	}

	return $.ajax({
		method: 'POST',
		type: 'json',
		url: loginUrl,
		data: {
			email: email,
			password: password
		}
	}).then((userData) => {
		localStorage.setItem(app_name + '_user',JSON.stringify(userData))
		return userData
	},(err)=> {
		throw new Error(err.responseText)
	})
}

UserAuthModel.logout = function() {
	return $.getJSON(logoutUrl).then(()=>{
		localStorage.removeItem(app_name + '_user')
	})
}

UserAuthModel.getCurrentUser = function() {
	return JSON.parse(localStorage.getItem(app_name + '_user')) ? new User(JSON.parse(localStorage.getItem(app_name + '_user'))) : null
}

// ..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x..x
// ^^ DO NOT TOUCH ^^

// but, you may extend the UserAuthModel Constructor (which is a Backbone Model)
const User = UserAuthModel.extend({
	initialize: function(){

	}
})

export var UserCollection = Backbone.Collection.extend({
	comparator: function(mod) {
		return mod.get('winRatio') * -1
	},
	model: User,
	url: usersUrl
})

export default User
