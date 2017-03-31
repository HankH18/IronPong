import React from 'react'
import ACTIONS from '../actions.js'
import STORE from '../store.js'

var ProfilePage = React.createClass({

	componentWillMount: function(){

		//fetch the user info collection
		this.setState(STORE.data)

	},

	getInitialState: function(){

		return STORE.data

	},

	render: function(){

		return(

			<div className = 'profile-page-wrapper'>

				<StatsComponent stats = {this.state.statsCollection}/>	

			</div>

		)

	}

})

var StatsComponent = React.createClass({

	_makeStats: function(stats){

		var statsArray = []

		for(var i = 0; i < stats.length; i++){

			var theStat = stats[i]

			statsArray.push(<SingleStatComponent stat = {theStat} />)
		}

		return(statsArray)

	},

	render: function(){

		return(

			<div className = 'stats-wrapper'>

				{this._makeStats(this.props.stats)}

			</div>

		)

	}

})

var SingleStatComponent = React.createClass({

	render: function(){

		var stat = this.props.stat

		return(

			<div className = "single-stat-wrapper">

				<h3>wins</h3>
				<h4>{stat.wins}</h4>

			</div>

		)

	}

})

export default ProfilePage