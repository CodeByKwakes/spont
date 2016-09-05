var Event = require('../models/event');
var Venue = require('../models/venue');

function eventsIndex (req, res) {
  Event.find({}).populate(['events']).exec(function (err, events) {
    if (err) return res.render('error', { message: 'Something went wrong.' });
    res.render('events/index', { events: events });
  });
}

function eventsShow (req, res) {
  Event.findById({ _id: req.params.id }, function (err, event) {
    if (err) return res.render('error', { message: 'Something went wrong.' });
    res.render('events/show', { event: event });
  });
}

function eventsCreate (req, res) {
  // var eventParams = req.body.event;
  // var event = new Event(eventParams);
  var event = new Event(req.body);

  event.save (function(err, event) {
    if (err) return res.render('error', { message: err });
    Venue.findOne({_id: req.body.events}, function(err, venue){
      venue.events.push(event);
      venue.save();
    });
    return res.redirect('/');
  });
}

function eventsUpdate (req, res) {
  var id = req.params.id;
  var eventParams = req.body.event;

  Event.findByIdAndUpdate({ _id: id }, eventParams, function (err, event) {
    if (err) return res.render('error', { message: 'Something went wrong.' + err });
    res.redirect('/');
  });
}

function eventsDelete (req, res) {
  var id = req.params.id;

  Event.remove({_id: id}, function (err) {
    if (err) return res.render('error', { message: 'Something went wrong' + err });
    res.redirect('/');
  });
}

function eventsNew (req, res) {
  res.render('events/new');
}


function eventsEdit (req, res) {
  Event.findById({ _id: req.params.id }, function (err, event) {
    if (err) return res.render('error', { message: 'Something went wrong.' });
    res.render('events/edit', { event: event });
  });
}


module.exports = {
  eventsIndex  : eventsIndex,
  eventsShow   : eventsShow,
  eventsCreate : eventsCreate,
  eventsUpdate : eventsUpdate,
  eventsDelete : eventsDelete,
  eventsNew    : eventsNew,
  eventsEdit   : eventsEdit,
};
