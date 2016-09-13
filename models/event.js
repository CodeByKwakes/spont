var mongoose = require('mongoose');
var Venue    = require('./venue');

var Schema = mongoose.Schema;
var eventSchema = new Schema({
  venue: {type: Schema.ObjectId, ref: 'Venue'},
  eventName: String,
  eventDate: Date,
  startTime: Number,
  endTime: Number,
  createdAt: Date,
  updatedAt: Date
});

var Event = mongoose.model('Event', eventSchema);
module.exports = Event;