let Router = require('express').Router;
const apiRouter = Router()
let helpers = require('../config/helpers.js')

let User = require('../db/schema.js').User
let Game = require('../db/schema').Game
let Queue = require('../db/schema').Queue

  
  apiRouter
    .get('/users', function(req, res){
      User.find(req.query , "-password", function(err, results){
        if(err) return res.json(err) 
        res.json(results)
      })
    })

  apiRouter
    .get('/users/:_id', function(req, res){
      User.findById(req.params._id, "-password", function(err, record){
        if(err || !record ) return res.json(err) 
        res.json(record)
      })
    })
    .put('/users/:_id', function(req, res){

      User.findByIdAndUpdate(req.params._id, req.body, function(err, record){
          if (err) {
            res.status(500).send(err)
          }
          else if (!record) {
            res.status(400).send('no record found with that id')
          }
          else {
            res.json(Object.assign({},req.body,record))
          }
      })
    })

    .delete('/users/:_id', function(req, res){
      User.remove({ _id: req.params._id}, (err) => {
        if(err) return res.json(err)
        res.json({
          msg: `record ${req.params._id} successfully deleted`,
          _id: req.params._id
        })
      })  
    })

//---------------------------------------------------------
//                   ROUTES FOR GAME
//---------------------------------------------------------

apiRouter.post('/games', function(req, res) {
  let newGame = new Game(req.body)
  newGame.save((err, gameRecord) => {
    if(err) return res.status(500).json(`Problem saving game to database`)

    Queue.find((err,queueRecords) => {
      if (err) return res.status(500).json(`Problem getting the queue from database`)
      let ironQueue = queueRecords[0],
      userIndex     = ironQueue.queueMembers.indexOf(req.body.loser)
      ironQueue.queueMembers.splice(userIndex,1)
      ironQueue.save((err, record) => {
        if(err) return res.status(500).json(`Problem deleting user from database`)
      })
    })

    User.findById(req.body.winner, (err, winnerRecord) => {
      if (err) return res.status(500).json(`Problem getting the winner from database`)
      winnerRecord.wins = ++winnerRecord.wins
      winnerRecord.winStreak = ++winnerRecord.winStreak,
      winnerRecord.totalGames = ++winnerRecord.totalGames
      winnerRecord.winRatio =  (winnerRecord.wins / winnerRecord.totalGames) * 100
      winnerRecord.save((err) => {
        if (err) return res.status(500).json(`Problem saving updated winner to database`)
      })
    })

    User.findById(req.body.loser, (err, loserRecord) => {
      if (err) return res.status(500).json(`Problem getting the winner from database`)
      loserRecord.losses = ++ loserRecord.losses
      loserRecord.winStreak = 0,
      loserRecord.totalGames = ++loserRecord.totalGames
      loserRecord.winRatio =  (loserRecord.wins / loserRecord.totalGames) * 100
      loserRecord.save((err) => {
        if (err) return res.status(500).json(`Problem saving updated winner to database`)
      })
    })
     res.json(gameRecord)
  })
})

apiRouter.get('/games', function(req, res){
  Game.find(req.query, function(err, results){
    if(err) return res.status(400).json(`Problem getting games from database`) 
    res.json(results)
  })
})

//--------------------------------------------------------
//                ROUTE FOR QUEUE
//--------------------------------------------------------

apiRouter.get('/queue', function(req, res) {
  Queue.find(req.query, function(err, record){
    if(err) return res.status(400).json(`Problem getting queue from database`)
    res.json(record)
  }).populate('queueMembers', "-password")
})

apiRouter.put('/queue/delete/:_id', function(req, res) {
  Queue.find((err,records) => {
    if (err) return res.status(500).json(`Problem getting the queue from database`)
    
    let ironQueue = records[0],
    userIndex     = ironQueue.queueMembers.indexOf(req.params._id)
    if(userIndex !== -1 ){
      ironQueue.queueMembers.splice(userIndex, 1)
      ironQueue.save((err, record) => {
          if(err) return res.status(500).json(`Problem deleting user from database`)
          res.json(record)
      })
    }
    else{
      return res.status(400).json(`Invalid user id`)
    }
  })
})

apiRouter.put('/queue/add/:_id', function(req, res) {
  Queue.find((err, records) => {
    if (err) return res.status(500).json(`Problem getting the queue from database`)
    let ironQueue   = records[0],
    isUserAlreadyIn = ironQueue.queueMembers.indexOf(req.params._id)
    
    if (isUserAlreadyIn !== -1 && ironQueue.queueMembers.length ) return res.status(400).json(`User already in the queue`)

    User.findById(req.params._id, (err,userID) => {
        if(err || userID === null) return res.status(500).json('Problem getting user from database')
        ironQueue.queueMembers.push(userID)
        ironQueue.save((err, record) => {
            if(err) return res.status(500).json(`Problem adding user from database`)
            res.json(record) 
        })
    })
  })
})



module.exports = apiRouter