var Event = require('../models/event');
var Venue = require('../models/venue');

// INDEX
function eventsIndex(req, res){
  Event
    .find({})
    .populate('venue')
    .exec(function(err, events){
      if (err) return res.status(404).json({message: 'Something went wrong!!'});
      res.render('events/index', { events: events });
    });
}

// CREATE
function eventsCreate(req, res){
  var event = new Event(req.body);

  event.save(function(err, event){
    if (err) return res.status(500).json({ message: 'Something went wrong!!'});

    Venue
      .findOne({ _id: req.body.event_id}, function(err, event){
        venue.events.push(event);
        venue.save();
      });

    return res.redirect('/');
  });
}

// SHOW
function eventsShow(req, res){
  var id = req.params.id;

  Event
    .findById(id)
    .populate('venue')
    .exec(function(err, event){
      if (err) return res.status(404).json({ message: 'Something went wrong!!'});
      res.render('events/show', { event: event });
    });
}

// NEW
function eventsNew(req, res){
  res.render('events/new');
}

// EDIT
function eventsEdit(req, res){
  res.render('events/edit');
}

// UPDATE
function eventsUpdate(req, res){
  var id = req.params.id;
  var eventParams = req.body.event;
  Event
    .findByIdAndUpdate({ _id: id}, eventParams, function(err, event){
      if (err) return res.status(500).json({ message: 'Something went wrong!!'});
      if (!event) return res.status(404).json({ message: 'No event found???'});

      event.save(function(err){
        if (err) return res.status(500).json({ message: 'Something went wrong!!'});
        res.status(201).json({ message: 'Event Updated.', event: event});
      });

      res.redirect('/events/'+ id);
    });
}

// DELETE
function eventsDelete(req, res){
  var id = req.params.id;
  Event
    .findByIdAndRemove({_id: id}, function(err){
      if (err) return res.status(404).json({ message: 'Something went wrong!!'});
      res.redirect('/');
    });
}

module.exports = {
  eventsIndex  : eventsIndex,
  eventsShow   : eventsShow,
  eventsCreate : eventsCreate,
  eventsUpdate : eventsUpdate,
  eventsDelete : eventsDelete,
  eventsNew    : eventsNew,
  eventsEdit   : eventsEdit
};