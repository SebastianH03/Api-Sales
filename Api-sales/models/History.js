const mongoose = require('mongoose');

const HistorySchema = new mongoose.Schema({
    action: String,
    collection: String,
    date: { type: Date, default: Date.now }
});

const History = mongoose.model('History', HistorySchema, 'history');

module.exports = History;
