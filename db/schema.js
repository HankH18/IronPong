const mongoose = require('mongoose');

// ----------------------
// USERS
// ----------------------
const usersSchema = new mongoose.Schema({
  email:     { type: String, required: true },
  password:  { type: String, required: true },
  nickName: {type: String, required:true },
  createdAt: { type: Date, default: Date.now },
  wins: {type: Number,default:0},
  losses: {type: Number,default:0},
  winStreak: {type: Number, default:0},
  winRatio: {type: Number,default:0},
  totalGames: {type: Number,default:0},
  avatarURL: {type: String},
  catchPhrase: {type: String},
  paddleGripStyle: {type: String},
  signatureMove: {type: String},
  homeTown: {type: String},
  claimed: {type:Boolean, default: true}
})

const gameSchema = new mongoose.Schema({
  playerOne: {type: String, required: true},
  playerTwo: {type: String, required: true},
  winner: {type: String, required: true},
  loser: {type: String, required: true},
  playerOneScore: {type: Number, required: true},
  playerTwoScore: {type: Number, required: true}

})

const queueSchema = new mongoose.Schema({
  queueMembers: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  }]
})

module.exports = {
  User: mongoose.model('User', usersSchema),
  Game: mongoose.model('Game', gameSchema),
  Queue: mongoose.model('Queue', queueSchema),
}