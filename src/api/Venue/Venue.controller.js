import _ from 'lodash'
import { success, notFound } from '../../services/response/'
import { Venue } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Venue.create(body)
    .then((venue) => venue.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>
  Venue.find(query, select, cursor)
    .then((venues) => venues.map((venue) => venue.view()))
    .then(success(res))
    .catch(next)

export const show = ({ params }, res, next) =>
  Venue.findById(params.id)
    .then(notFound(res))
    .then((venue) => venue ? venue.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Venue.findById(params.id)
    .then(notFound(res))
    .then((venue) => venue ? _.merge(venue, body).save() : null)
    .then((venue) => venue ? venue.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Venue.findById(params.id)
    .then(notFound(res))
    .then((venue) => venue ? venue.remove() : null)
    .then(success(res, 204))
    .catch(next)
