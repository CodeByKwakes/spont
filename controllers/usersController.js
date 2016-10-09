var User = require('../models/user');

function usersIndex (req, res) {

  User
    .find({}, function(err, users){
      /*if (err) return res.render('error', { message: 'Something went wrong.' });
      res.render('users/index', { users: users });*/
      if (err) return res.status(404).json({message: 'Something went wrong!!'});
    res.status(200).json({ users: users });
  });
}

function usersShow (req, res) {
  var id = req.params.id;

  User.findById({ _id: id }, function (err, user) {
    // if (err) return res.render('error', { message: 'Something went wrong.' });
     if (err) return res.status(404).json({ message: 'Something went wrong!!'});
    console.log(user);
    // res.render('users/show', { user: user });
    res.status(200).json({ user: user});
  });
}

function usersCreate (req, res) {
  // var userParams = req.body;
  var user = new User(req.body);

  user.save (function(err, user) {
    // if (err) return res.render('error', { message: err });
    if (err) return res.status(500).json({ message: 'Something went wrong!!'});
    // return res.redirect('/');
    res.status(201).json({ message: 'A New User has been successfully created.', user: user});
  });
}

function usersUpdate (req, res) {
  var id = req.params.id;
  var userParams = req.body.user;

  User.findByIdAndUpdate({ _id: id }, userParams, function(err, user){
    /*if (err) return res.render('error', { message: 'Something went wrong.' + err });
    res.redirect('/');*/
    if (err) return res.status(500).json({ message: 'Something went wrong!!'});
    if (!user) return res.status(404).json({ message: 'No User found???'});

    user.save(function(err){
      if (err) return res.status(500).json({ message: 'Something went wrong!!'});
      res.status(201).json({ message: 'User Profile Updated.', user: user})
    });    
  });
}

function usersDelete (req, res) {
  var id = req.params.id;

  User.findByIdAndRemove({_id: id}, function (err) {
    /*if (err) return res.render('error', { message: 'Something went wrong' + err });
    res.redirect('/');*/
    if (err) return res.status(404).json({ message: 'Something went wrong!!'});
    res.status(200).json({ message: 'User has been successfully deleted'});
  });
}

function usersNew (req, res) {
  res.render('users/new');
}

function usersEdit (req, res) {
  var id = req.params.id;

  User.findById({ _id: id }, function (err, user) {
    if (err) return res.render('error', { message: 'Something went wrong.' });
    res.render('users/edit', { user: user });
  });
}



module.exports = {
  usersIndex  : usersIndex,
  usersShow   : usersShow,
  usersCreate : usersCreate,
  usersUpdate : usersUpdate,
  usersDelete : usersDelete,
  usersNew    : usersNew,
  usersEdit   : usersEdit
};