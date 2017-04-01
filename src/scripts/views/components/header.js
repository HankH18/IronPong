import React from 'react'
import ACTIONS from '../../actions'
import STORE from '../../store.js'

var Header = React.createClass({

	componentWillMount: function(){

		STORE.on('dataUpdated', () => {

			this.setState(STORE.data)

		})

	},

	getInitialState: function(){

		return STORE.data

	},

	render: function() {
		console.log(this.state.userLoginStatus)
		return(

			<div className='header-wrapper'>

				<img src='/images/ironPongLogoWhiteV2.png' />
				

			</div>

		)
	}
})

export default Header