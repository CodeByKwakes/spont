import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master, session } from '../../services/passport'
import { create, index, show, update, destroy } from './Venue.controller'
import { schema } from './Venue.model'
export Venue, { schema } from './Venue.model'

const router = new Router()
const { venueType, venueName, address, postTown, postCode, contactNumber, webAddress, emailAddress, musicGenre, events } = schema.tree

/**
 * @api {post} /Venues Create venue
 * @apiName CreateVenue
 * @apiGroup Venue
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam venueType Venue's venueType.
 * @apiParam venueName Venue's venueName.
 * @apiParam address Venue's address.
 * @apiParam postTown Venue's postTown.
 * @apiParam postCode Venue's postCode.
 * @apiParam contactNumber Venue's contactNumber.
 * @apiParam webAddress Venue's webAddress.
 * @apiParam emailAddress Venue's emailAddress.
 * @apiParam musicGenre Venue's musicGenre.
 * @apiParam events Venue's events.
 * @apiSuccess {Object} venue Venue's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Venue not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ venueType, venueName, address, postTown, postCode, contactNumber, webAddress, emailAddress, musicGenre, events }),
  create)

/**
 * @api {get} /Venues Retrieve venues
 * @apiName RetrieveVenues
 * @apiGroup Venue
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiUse listParams
 * @apiSuccess {Object[]} venues List of venues.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 admin access only.
 */
router.get('/',
  session({ required: true, roles: ['admin'] }),
  query(),
  index)

/**
 * @api {get} /Venues/:id Retrieve venue
 * @apiName RetrieveVenue
 * @apiGroup Venue
 * @apiPermission admin
 * @apiParam {String} access_token admin access token.
 * @apiSuccess {Object} venue Venue's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Venue not found.
 * @apiError 401 admin access only.
 */
router.get('/:id',
  session({ required: true, roles: ['admin'] }),
  show)

/**
 * @api {put} /Venues/:id Update venue
 * @apiName UpdateVenue
 * @apiGroup Venue
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam venueType Venue's venueType.
 * @apiParam venueName Venue's venueName.
 * @apiParam address Venue's address.
 * @apiParam postTown Venue's postTown.
 * @apiParam postCode Venue's postCode.
 * @apiParam contactNumber Venue's contactNumber.
 * @apiParam webAddress Venue's webAddress.
 * @apiParam emailAddress Venue's emailAddress.
 * @apiParam musicGenre Venue's musicGenre.
 * @apiParam events Venue's events.
 * @apiSuccess {Object} venue Venue's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Venue not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  master(),
  body({ venueType, venueName, address, postTown, postCode, contactNumber, webAddress, emailAddress, musicGenre, events }),
  update)

/**
 * @api {delete} /Venues/:id Delete venue
 * @apiName DeleteVenue
 * @apiGroup Venue
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Venue not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
