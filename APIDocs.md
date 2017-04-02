# IronPong API Documentation
___


Current end point for testing https://iron-pong.herokuapp.com/

Basic useful feature list:

 * Register Users
 * Log Users in/out
 * Add/Remove users to a queue 
 * Create games	

 ___
### Register a New User:

POST to this location: `/auth/register`

Required fields for registering a user.
```
{
  "email": {type: String},
  "password": {type: String},
  "nickName": {type: String}
}
```

Returns a registration confirmation or an error.
___
### Login a User:

POST to this location `/auth/login`
  - Set the content type to JSON

Example: https://iron-pong.herokuapp.com/auth/login

Required fields for logging in.
```
{
  "email": {type: String},
  "password": {type: String}
}
```

Returns a login confirmation or an error.
___
### Logout a User:
GET request to `/auth/logout`

Example: https://iron-pong.herokuapp.com/auth/logout

Returns a logout confirmation or an error.

---
### Get All User Information: 

GET to this this location: `/api/users`


Example: https://iron-pong.herokuapp.com/api/users

Returns an array of user objects.

---
### Get a Specific User:
GET to this location: `/api/users/_id`

Example: https://iron-pong.herokuapp.com/api/users/58defaa3cf7ff2001169ac78

Returns a single user object.

---
### Update User Information:

PUT to this location: `/api/users/_id`
  - Set the content type to JSON

Where the PUT might end up looking like this: https://iron-pong.herokuapp.com/api/users/58defaa3cf7ff2001169ac78

Accepted fields that you can pick and choose to be modified
```
{
  //User Information
  "email":     { type: String},
  "password":  { type: String},
  "nickName": {type: String},
  "claimed": {type: Boolean},
  
  //Game Statistics
  "wins": {type: Number},
  "losses": {type: Number},
  "winStreak": {type: Number},
  "winRatio": {type: Number},
  "totalGames": {type: Number},
  
  //Extra Information
  "avatarURL": {type: String},
  "catchPhrase": {type: String},
  "paddleGripStyle": {type: String},
  "signatureMove": {type: String},
  "homeTown": {type: String}
}
```
___
### Get the Queue:
GET to this location: `/api/queue/`

Returns an array of user objects. 

The queue works in a first in - first out system.
___
### Add a User to Queue:
PUT to this location: `/api/queue/add/_id`
  - Set the content type to JSON

Where the request will look something like this: https://iron-pong.herokuapp.com/api/queue/add/58defaa3cf7ff2001169ac78

All it needs is the _id and no json in the body.

Users will be added to the end of the queue array.

Users can not add themselves twice to the queue.

The server will return some JSON but you shouldn't work with whatever it spits out. If you ever want to work with the Queue, you should do a get request. 
___
### Delete a User from the Queue:

PUT to this location: `/api/queue/delete/_id`
  - Set the content type to JSON

Where the request will look something like this: https://iron-pong.herokuapp.com/api/queue/delete/58defaa3cf7ff2001169ac78

User with the _id will be removed from the queue. Doesn't matter where they are.

Returns a response showing an array of id's, you shouldn't work with this.

___

### Create a Game:
POST to this location: `api/games`
  - Set the content type to JSON

Example: https://iron-pong.herokuapp.com/api/games

Required fields
```
{
	//You can get these IDs from the Queue
	playerOne: {type: String}, //Note: this is the _id  for playerOne, don't enter a name
  playerTwo: {type: String}, //Note: this is the _id  for playerOne, don't enter a name
    
	winnerID: {type: String, required: true},
	loserID: {type: String, required: true},

	playerOneScore: {type: Number, required: true},
	playerTwoScore: {type: Number, required: true},
}

```
Note: You should only give the first two people the capability of creating a game.

!!!!!!!

Important Note: The loser will automatically be removed from the queue, no need to do that yourselves. Winner still remains on the top queue.

!!!!!!!
