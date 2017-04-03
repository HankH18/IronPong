import Backbone from 'backbone'

//var theUrl = 'https://iron-pong.herokuapp.com/api/games'
var theUrl = '/api/games'

export const GameModel = Backbone.Model.extend({
	urlRoot: theUrl,
	idAttribute: '_id'
})

export const GameCollection = Backbone.Collection.extend({
	comparator: function(mod){
		return new Date(mod.get('createdAt')).getTime()*-1
	},
	model: GameModel,
<<<<<<< HEAD
	url: theUrl
=======
	urlRoot: 'api/games',
	idAttribute: '_id'
>>>>>>> a7ba3c63350cc032d3d9a88cdca9494ad278eadc
})

export const QueueCollection = Backbone.Collection.extend({
	idAttribute: '_id',
	url:'/api/queue',
	parse: function(apiResponse){
		console.log(apiResponse)
		return apiResponse[0].queueMembers
	}
})