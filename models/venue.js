var mongoose = require('mongoose');
// var Event    = require('../models/event');

var Schema = mongoose.Schema;
var venueSchema = new Schema({
  // admin: { type: Schema.ObjectId, ref: 'User' },
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
  events: [{type: Schema.ObjectId, ref: 'Event'}],
/*  info: {
    typeOfNight: [String],
    typeOfVenue: [String],
    doorChange: String,
    budget: String,
    minimumAge: Number,
    dressCode: String,
    music: [String],
  },
  hours: {
    day: String,
    openingTime: String,
    closingTime: String,
    notes: String,
  },*/
  /*menus: {
    menu: [String],
    food: {
      name: String,
      price: Number,
    },
    drinks: {
      name: String,
      price: Number,
    },
  },*/
  // rating: String,
  createdAt: Date,
  updatedAt: Date
});

var Venue = mongoose.model('Venue', venueSchema);
module.exports = Venue;

