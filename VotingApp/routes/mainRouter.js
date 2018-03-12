var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var router=express.Router();
var poll = require("../models/createModel")
var mongoose = require('mongoose')

router.get('/',(req,res)=>{
    res.render('/index.html')
})

router.post('/insert',(req, res)=>{
    var question = req.body.question
    var answers = req.body.answers
    //var tempanswer = req.body.answer.split(,)
    // for(var i=0; i<answers.length; i++){
    //     answers[i] = {"answer":answers[i],"total":0}
    // }
    console.log(question)
    console.log(answers)
    var Poll = new poll({
        "question" : question, 
        "answers" : answers
    })
    poll.insertPoll(Poll,(err,callback)=>{
        if(err) throw err;
        console.log(callback+ " from service")
         res.status(201).json({
        // "pollurl": process.env.APP_URL +":3000/"+ "poll/" + callback.question
        "pollurl": callback.question
            })
    })          
})

router.get('/getallpolls',(req,res)=>{
    poll.getallpolls((err,callback)=>{
        if (err) throw err;
        res.json(callback)    
})
})

router.get('/getonepoll/:id',(req,res)=>{
    var pollid = req.params.id
    poll.getonepoll(pollid,(err,callback)=>{
        res.json(callback)
    })
})

router.put('/:title',(req,res)=>{
    var title = req.params.title
    var option = req.body.option
    var pollCount = {
        title : title,
        option : option
    }
    console.log(option)
    poll.updatePoll(title, option, (err,updatedpoll)=>{
        if(err) throw err;
        res.json(updatedpoll)
    })  
})

router.get('/user/:title',(req,res)=>{
    var query = req.params.title;
    console.log(query)
    poll.getPollByTitle(query,(err,callback)=>{
        if(err) throw err;
        console.log(callback)
        res.json(callback)
    })
})

router.put('/user/increment/',(req,res)=>{
    var question = req.body.question;
    var id = req.body.answerId
    var incQuestion = {
        question: question,
        id : id
    }
    console.log("from main router " + question +"  " + id)
    poll.incrementByQuestion(incQuestion,(err,callback)=>{
        if(err) throw err;
        console.log("Value Incremented")
        res.status(201).json({"success":"false", "message":"true"})
    }) 
})

router.delete('/deletepoll/:id',(req,res)=>{
    var pollid = req.params.id
    poll.deletepoll(pollid,(err,callback)=>{
        res.json(callback)
    })
})

module.exports = router;
