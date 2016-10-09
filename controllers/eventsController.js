var Event = require('../models/event');

// INDEX
function eventsIndex(req, res) {
  Event.find({}, function(err, events){
    if (err) return res.status(404).json({message: 'Something went wrong!!'});
    res.status(200).json({ events: events });
  })
}

// CREATE
function eventsCreate(req, res) {
  var event = new Event(req.body);

  event.save(function(err, event){
    if (err) return res.status(500).json({ message: 'Something went wrong!!'});
    res.status(201).json({ message: 'Event has been created', event: event});
  })
}

// SHOW
function eventsShow(req, res) {
  var id = req.params.id;

  Event.findById({_id: id }, function(err, event){
    if (err) return res.status(404).json({ message: 'Something went wrong!!'});
    res.status(200).json({ event: event});
  })
}

// UPDATE
function eventsUpdate(req, res) {
  var id = req.params.id;
  var eventBody = req.body;

  Event.findByIdAndUpdate({_id: id }, eventBody, function(err, event){
    if (err) return res.status(500).json({ message: 'Something went wrong!!'});
    if (!event) return res.status(404).json({ message: 'No Event Found???'});

    event.save(function(err){
      if (err) return res.status(500).json({ message: 'Something went wrong!!!'});
      res.status(201).json({ message: 'Event Updated', event: event})
    });
  });
}

// DELETE
function eventsDelete(req, res) {
  var id = req.params.id;

  Event.findByIdAndRemove({_id: id}, function(err){
    if (err) return res.status(404).json({ message: 'Something went wrong!!'});
    res.status(200).json({ message: ' Event has been deleted'});
  })
}

module.exports = {
  eventsIndex:  eventsIndex,
  eventsShow:   eventsShow,
  eventsCreate: eventsCreate,
  eventsUpdate: eventsUpdate,
  eventsDelete: eventsDelete
};