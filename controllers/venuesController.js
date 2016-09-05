var Venue = require('../models/venue');
var Event = require('../models/event');

function venuesIndex (req, res) {
  Venue.find({}).populate(['events']).exec(function(err, venues) {
    if (err) return res.render('error', { message: 'Something went wrong.' });
    res.render('venues/index', { venues: venues });
  });
}

function venuesShow (req, res) {
  Venue.findById({ _id: req.params.id }, function (err, venue) {
    if (err) return res.render('error', { message: 'Something went wrong.' });
    res.render('venues/show', { venue: venue });
  });
}

function venuesCreate (req, res) {
  // var venueParams = req.body.venue;
  // var venue = new Venue(venueParams);
  var venue = new Venue(req.body);

  venue.save(function(err, venue){
    if (err) return res.render('error', { message: err });
    Event.findOne({_id: req.body.user_id},function(err, event){
      event.venue.push(event);
      event.save();
    });
    res.status(201).json({ message: 'A New Venue has been successfully created.', venue: venue});
    return res.redirect('/');
  });
}

function venuesUpdate (req, res) {
  var id = req.params.id;
  var venueParams = req.body.venue;

  Venue.findByIdAndUpdate({ _id: id }, venueParams, function (err, venue) {
    if (err) return res.render('error', { message: 'Something went wrong.' + err });
    res.redirect('/');
  });
}

function venuesDelete (req, res) {
  var id = req.params.id;

  Venue.remove({_id: id}, function (err) {
    if (err) return res.render('error', { message: 'Something went wrong' + err });
    res.redirect('/');
  });
}

function venuesNew (req, res) {
  res.render('venues/new');
}

function venuesEdit (req, res) {
  Venue.findById({ _id: req.params.id }, function (err, venue) {
    if (err) return res.render('error', { message: 'Something went wrong.' });
    res.render('venues/edit', { venue: venue });
  });
}

module.exports = {
  venuesIndex  : venuesIndex,
  venuesShow   : venuesShow,
  venuesCreate : venuesCreate,
  venuesUpdate : venuesUpdate,
  venuesDelete : venuesDelete,
  venuesNew    : venuesNew,
  venuesEdit   : venuesEdit,
};
