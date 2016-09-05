var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, required: true },
  email: String,
  postcode: String
});

module.exports = mongoose.model('User', userSchema);
