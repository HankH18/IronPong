import Backbone from 'backbone'
import {GameCollection} from './models/gameModel'
import {UserCollection} from './models/userModel'
import {QueueCollection} from './models/gameModel'



const STORE = Object.assign({}, Backbone.Events, {

	data: {

		items: new GameCollection,
		userCollection: new UserCollection,
		queueCollection: new QueueCollection,
		userLoginStatus: 'Log In'

	},

	get: function(prop){
			if(this.data.items === undefined) {
				throw new Error ('the store does not have a property called: ', + prop)
		}
			return this.data[prop]
	},

	set: function(attrs){
		this.data = Object.assign(this.data,attrs)
		this.trigger('dataUpdated')
	},

})

export default STORE