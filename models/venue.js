var mongoose = require('mongoose');
var Event    = require('./event');

var Schema = mongoose.Schema;
var venueSchema = new Schema({
  venueName: String,
  description: String,
  location: {
    region: String,
    fullAddress: {
      address1: String,
      address2: String,
      address3: String,
    },
    area: String,
  },
  events: [{
    type: Schema.ObjectId, 
    ref: 'Event'
  }],
  createdAt: Date,
  updatedAt: Date
});

var Venue = mongoose.model('Venue', venueSchema);
module.exports = Venue;

