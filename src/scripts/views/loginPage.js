import React from 'react'
import ACTIONS from '../actions.js'
import STORE from '../store.js'
import Header from './components/header.js'
import NavBar from './components/navBar'

var LoginView = React.createClass({
	render: function() {
		return (
			<div className='login-page-wrapper'>
				<Header />
				<NavBar />
				<div className='register-login-wrapper'>
					<RegisterForm />
					<LoginForm />
					<ReclaimButton />
				</div>
			</div>
		)
	}
})

var LoginForm = React.createClass({

	_handleSubmit: function(evtObj) {
		evtObj.preventDefault()
		var formEl = evtObj.target
		var formData = {
			email: formEl.email.value.toString(),
			password: formEl.password.value.toString()
		}
		console.log(formEl)
		ACTIONS.loginUser(formEl.email.value, formEl.password.value)
		formEl.reset()
	},

	render: function() {
		return (
			<div className='form-wrapper login-form'>
				<form onSubmit={this._handleSubmit}>
					<div className = "form-title"><h3>Login</h3></div>
					<input type='text' name='email' placeholder='enter your email' /><br /><br />
					<input type='password' name='password' placeholder='enter password' />
					<button type='submit'>Login</button>
					<span className='loginEmailRejection emailRejection'></span>
				</form>
			</div>

		)
	}
})

var RegisterForm = React.createClass({

	_handleSubmit: function(evtObj) {
		evtObj.preventDefault()
		var formEl = evtObj.target
		var formData = {
			nickName: formEl.userName.value,
			email: formEl.email.value,
			password: formEl.password.value
		}
		ACTIONS.registerUser(formData)
		console.log('logging in')
		formEl.reset()
	},

	render: function() {
		return (
			<div className='form-wrapper register-form'>
			<form onSubmit={this._handleSubmit}>
				<h3>Register Form</h3>
				<input type='text' name='userName' placeholder='enter username' /><br /><br />
				<input type='text' name='email' placeholder='enter your email' /><br /><br />
				<input type='password' name='password' placeholder='create a password' />
				<button type='submit'>Register</button>
				<span className='registerEmailRejection emailRejection'></span><br />
			</form>
			</div>
		)
	}
})

var ReclaimButton = React.createClass({
	render: function() {
		return (
			<a href='#reclaim'><button className='reclaim-button'>Reclaim Old Account</button></a>
		)
	}
})

export default LoginView