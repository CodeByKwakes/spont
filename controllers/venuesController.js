var Venue = require('../models/venue');

// INDEX
function venuesIndex(req, res) {
  Venue.find({}, function(err, venues){
    if (err) return res.status(404).json({message: 'Something went wrong!!'});
    res.status(200).json({ venues: venues });
  })
}

// CREATE
function venuesCreate(req, res) {
  var venue = new Venue(req.body);

  venue.save(function(err, venue){
    if (err) return res.status(500).json({ message: 'Something went wrong!!'});
    res.status(201).json({ message: 'Venue has been created', venue: venue});
  })
}

// SHOW
function venuesShow(req, res) {
  var id = req.params.id;

  Venue.findById({_id: id }, function(err, venue){
    if (err) return res.status(404).json({ message: 'Something went wrong!!'});
    res.status(200).json({ venue: venue});
  })
}

// UPDATE
function venuesUpdate(req, res) {
  var id = req.params.id;
  var venueBody = req.body;

  Venue.findByIdAndUpdate({_id: id }, venueBody, function(err, venue){
    if (err) return res.status(500).json({ message: 'Something went wrong!!'});
    if (!venue) return res.status(404).json({ message: 'No Venue Found???'});

    venue.save(function(err){
      if (err) return res.status(500).json({ message: 'Something went wrong!!!'});
      res.status(201).json({ message: 'Venue Updated', venue: venue})
    });
  });
}

// DELETE
function venuesDelete(req, res) {
  var id = req.params.id;

  Venue.findByIdAndRemove({_id: id}, function(err){
    if (err) return res.status(404).json({ message: 'Something went wrong!!'});
    res.status(200).json({ message: ' Venue has been deleted'});
  })
}

module.exports = {
  venuesIndex:  venuesIndex,
  venuesShow:   venuesShow,
  venuesCreate: venuesCreate,
  venuesUpdate: venuesUpdate,
  venuesDelete: venuesDelete
};