var mongoose = require("mongoose")
var Schema = mongoose.Schema

// var PollSchema = new Schema({
//     question : {type : String},
//     answers: {type:[{
//         answer : {type: String,required:true},
//          total : {type:Number,default:0}
//         }]}             
// })
var options = new Schema({
    answer: { type: String, required: true },
    total: { type: Number, default: 0 }
})

var PollSchema = new Schema({
    question: { type: String },
    answers: [options]
})

var option = module.exports = mongoose.model('option', options)
var poll = module.exports = mongoose.model('poll', PollSchema)

module.exports.insertPoll = (obj, callback) => {
    console.log("inserting")
    obj.save(callback)
}

module.exports.getallpolls = function (callback) {
    poll.find({}, callback)
}

module.exports.getonepoll = function (pollid, callback) {
    poll.findById(pollid, callback)
}

module.exports.updatePoll = (title, updateoption, callback) => {
    var options = updateoption;
    poll.findOneAndUpdate({ 'title': title }, { $inc: { 'option.value': 1 } }, { new: true, upsert: true }, callback)
}

module.exports.deletepoll = function (pollid, callback) {
    poll.findByIdAndRemove(pollid, callback)
}

module.exports.getPollByTitle = function (query, callback) {
    var Query = { question: query }
    poll.findOne(Query, callback)
}

module.exports.incrementByQuestion = function (incQuestion, callback) {
    var Question = incQuestion.question
    var id = incQuestion.id
    console.log("from createModel " + id)
    poll.update({ question: Question, 'answers._id': id }, { $inc: { 'answers.$.total': 1 } }, { new: true, upsert: true }, callback)
}