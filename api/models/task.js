
// Dependencies
var restful = require('node-restful');
var mongoose = restful.mongoose;

// Schema
var taskSchema = new mongoose.Schema({
    createdAt: { type: Date, default: Date.now },
    body: String,
    completed: Boolean,
    archived: Boolean
});

// Return model
module.exports = restful.model('Task', taskSchema);
