var Venue = require('../models/venue');
var Event = require('../models/event');

// INDEX
function venuesIndex(req, res){
  Venue
    .find({})
    .populate(['events'])
    .exec(function(err, venues){
      if (err) return res.status(404).json({message: 'Something went wrong!!'});
      res.render('venues/index', { venues: venues });
    });
}

// CREATE
function venuesCreate(req, res){
  var venue = new Venue(req.body);

  venue.save(function(err, venue){
    if (err) return res.status(500).json({ message: 'Something went wrong!!'});

    Event
      .findOne({ _id: req.body.venue_id}, function(err, venue){
        event.venue.push(venue);
        event.save();
      });

    return res.redirect('/');
  });
}

// SHOW
function venuesShow(req, res){
  var id = req.params.id;

  Venue
    .findById(id)
    .populate(['events'])
    .exec(function(err, venue){
      if (err) return res.status(404).json({ message: 'Something went wrong!!'});
      res.render('venues/show', { venue: venue });
    });
}

// NEW
function venuesNew(req, res){
  res.render('venues/new');
}
// EDIT
function venuesEdit(req, res){
  var id = req.params.id;

  Venue.findById({ _id: id }, function (err, venue) {
    if (err) return res.render('error', { message: 'Something went wrong.' });
    res.render('venues/edit', { venue: venue });
  });
}

// UPDATE
function venuesUpdate(req, res){
  var id = req.params.id;
  var venueParams = req.body.venue;

  Venue
    .findByIdAndUpdate({ _id: id }, venueParams, function(err, venue){
      if (err) return res.render('error', { message: 'Something went wrong.' + err });
    res.redirect('/events/' +id);
  });

/*  Venue
    .findByIdAndUpdate({ _id: id}, venueParams, function(err, venue){
      if (err) return res.status(500).json({ message: 'Something went wrong!!'});
      if (!venue) return res.status(404).json({ message: 'No venue found???'});

      venue.save(function(err){
        if (err) return res.status(500).json({ message: 'Something went wrong!!'});
        res.status(201).json({ message: 'Venue Updated.', venue: venue});
      });

      res.redirect('/');
    });*/
}
// DELETE
function venuesDelete(req, res){
  var id = req.params.id;
  Venue
    .findByIdAndRemove({_id: id}, function(err){
      if (err) return res.status(404).json({ message: 'Something went wrong!!'});
      res.redirect('/');
    });
}

module.exports = {
  venuesIndex  : venuesIndex,
  venuesShow   : venuesShow,
  venuesCreate : venuesCreate,
  venuesUpdate : venuesUpdate,
  venuesDelete : venuesDelete,
  venuesNew    : venuesNew,
  venuesEdit   : venuesEdit
};