import React from 'react'
import ACTIONS from '../actions.js'
import STORE from '../store.js'
import Header from './components/header.js'
import NavBar from './components/navBar'

var RulesPage = React.createClass({
	render: function() {
		return (
			<div className='faq-page'>
				<Header />
				<NavBar />
				<Etiquette />
				<Rules />
			</div>
		)
	}
})

var Etiquette = React.createClass({
	render: function() {
		return (
				<div className='etiquette'>
					<h1>THE IRON YARD ETIQUETTE</h1>
					<h2>Ping Pong is a gentleman's game. Play accordingly.</h2>
				</div>
			)
	}
})

var Rules = React.createClass({
	render: function() {
		return (
			<div className='rules'>
				<h1>THE IRON YARD RULES</h1>
				<h3>Scoring</h3>
				<h4>One match, one winner. For each match, the first player to reach 21 points
				wins that game; however, a game must be won by a two-point margin. A point
				is scored after each ball is put into play (not just when the server wins the 
				point as in volleyball).</h4>
				<h3>Flow of the Match</h3>
				<h4>Each player serves fives points in a row and then switches servers. 
				However, if a score of 20-20 is reached in any game, then each server 
				serves only one point and then the server is switched.</h4>
				<h3>Legal Serve</h3>
				<h4>Serve however you'd like, as long as the ball is hit behind the edge
				of the table nearest the server. If the serve touches the net and remains on
				the server's side of the table, it is a point for the returning player. If the 
				serve touches the net and hits the opposing side of the table, it is a 'let'.
				Three consecutive 'lets' are an instant point for the returning player.</h4>
			</div>
		)
	}
})

export default RulesPage