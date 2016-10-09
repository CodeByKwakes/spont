var mongoose = require('mongoose');
var Venue    = require('./venue');

var Schema = mongoose.Schema;
var eventSchema = new Schema({
  venue: {type: Schema.ObjectId, ref: 'Venue'},
  eventName: String,
  eventDate: Date,
  startTime: String,
  endTime: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

var Event = mongoose.model('Event', eventSchema);
module.exports = Event;