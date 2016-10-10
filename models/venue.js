var mongoose = require('mongoose');
var Event = require('./event');

var Schema = mongoose.Schema;
var venueSchema = new Schema({
  "venueType": String,
  "venueName": String,
  "address": String,
  "postTown": String,
  "postCode": String,
  "contactNumber": String,
  "webAddress": String,
  "emailAddress": String,
  "musicGenre": String,
  events: [{
    type: Schema.ObjectId,
    ref: 'Event'
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

var Venue = mongoose.model('Venue', venueSchema);
module.exports = Venue;

