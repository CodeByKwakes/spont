var express          = require('express');
var router           = express.Router();

var usersController  = require('../controllers/usersController');
var eventsController = require('../controllers/eventsController');
var venuesController = require('../controllers/venuesController');


/*router.get('/', function (req, res) {
  res.redirect('/users');
});*/

// User Routes
router.route('/users')
  .get(usersController.usersIndex)
  .post(usersController.usersCreate);

router.route('/users/new')
  .get(usersController.usersNew);

router.route('/users/:id')
  .get(usersController.usersShow)
  .patch(usersController.usersUpdate)
  .delete(usersController.usersDelete);

router.route('/users/:id/edit')
  .get(usersController.usersEdit);

// Event Routes
router.route('/events')
  .get(eventsController.eventsIndex)
  .post(eventsController.eventsCreate);

router.route('/events/new')
  .get(eventsController.eventsNew);

router.route('/events/:id')
  .get(eventsController.eventsShow)
  .patch(eventsController.eventsUpdate)
  .delete(eventsController.eventsDelete);

router.route('/events/:id/edit')
  .get(eventsController.eventsEdit);

// Venue Routes
router.route('/venues')
  .get(venuesController.venuesIndex)
  .post(venuesController.venuesCreate);

router.route('/venues/new')
  .get(venuesController.venuesNew);

router.route('/venues/:id')
  .get(venuesController.venuesShow)
  .patch(venuesController.venuesUpdate)
  .delete(venuesController.venuesDelete);

router.route('/venues/:id/edit')
  .get(venuesController.venuesEdit);

module.exports = router;