import test from 'ava'
import mockgoose from 'mockgoose'
import mongoose from '../../config/mongoose'
import { schema } from '.'

test.beforeEach(async (t) => {
  const mongo = new mongoose.Mongoose()
  await mockgoose(mongo)
  await mongo.connect('')
  const Venue = mongo.model('Venue', schema)
  const venue = await Venue.create({ venueType: 'test', venueName: 'test', address: 'test', postTown: 'test', postCode: 'test', contactNumber: 'test', webAddress: 'test', emailAddress: 'test', musicGenre: 'test', events: 'test' })

  t.context = { ...t.context, Venue, venue }
})

test.cb.after.always((t) => {
  mockgoose.reset(t.end)
})

test('view', (t) => {
  const { venue } = t.context
  const view = venue.view()
  t.true(typeof view === 'object')
  t.true(view.id === venue.id)
  t.true(view.venueType === venue.venueType)
  t.true(view.venueName === venue.venueName)
  t.true(view.address === venue.address)
  t.true(view.postTown === venue.postTown)
  t.true(view.postCode === venue.postCode)
  t.true(view.contactNumber === venue.contactNumber)
  t.true(view.webAddress === venue.webAddress)
  t.true(view.emailAddress === venue.emailAddress)
  t.true(view.musicGenre === venue.musicGenre)
  t.true(view.events === venue.events)
  t.truthy(view.createdAt)
  t.truthy(view.updatedAt)
})

test('full view', (t) => {
  const { venue } = t.context
  const view = venue.view(true)
  t.true(typeof view === 'object')
  t.true(view.id === venue.id)
  t.true(view.venueType === venue.venueType)
  t.true(view.venueName === venue.venueName)
  t.true(view.address === venue.address)
  t.true(view.postTown === venue.postTown)
  t.true(view.postCode === venue.postCode)
  t.true(view.contactNumber === venue.contactNumber)
  t.true(view.webAddress === venue.webAddress)
  t.true(view.emailAddress === venue.emailAddress)
  t.true(view.musicGenre === venue.musicGenre)
  t.true(view.events === venue.events)
  t.truthy(view.createdAt)
  t.truthy(view.updatedAt)
})
