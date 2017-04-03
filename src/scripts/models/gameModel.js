import Backbone from 'backbone'

var theUrl = 'https://iron-pong.herokuapp.com/api/games'
//var theUrl = '/api/games'

export const GameModel = Backbone.Model.extend({
	urlRoot: theUrl,
	idAttribute: '_id'
})

export const GameCollection = Backbone.Collection.extend({
	comparator: function(mod){
		return new Date(mod.get('createdAt')).getTime()*-1
	},
	model: GameModel,
	url: theUrl,
	urlRoot: theUrl,
	idAttribute: '_id'

})

export const QueueCollection = Backbone.Collection.extend({
	idAttribute: '_id',
	url:'https://iron-pong.herokuapp.com/api/queue',
	parse: function(apiResponse){
		console.log(apiResponse)
		return apiResponse[0].queueMembers
	}
})