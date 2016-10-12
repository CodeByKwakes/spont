import test from 'ava'
import Promise from 'bluebird'
import request from 'supertest-as-promised'
import mockgoose from 'mockgoose'
import { masterKey } from '../../config'
import { signSync } from '../../services/jwt'
import express from '../../config/express'
import mongoose from '../../config/mongoose'
import { User } from '../user'
import routes, { Venue } from '.'

const app = () => express(routes)

test.before(async (t) => {
  await mockgoose(mongoose)
  await mongoose.connect('')
})

test.beforeEach(async (t) => {
  const [ user, anotherUser, admin ] = await User.create([
    { email: 'a@a.com', password: '123456' },
    { email: 'b@b.com', password: '123456' },
    { email: 'c@c.com', password: '123456', role: 'admin' }
  ])
  const [ userSession, anotherSession, adminSession ] = [
    signSync(user.id), signSync(anotherUser.id), signSync(admin.id)
  ]
  const venue = await Venue.create({})
  t.context = { ...t.context, masterKey, userSession, anotherSession, adminSession, venue }
})

test.afterEach.always(async (t) => {
  await Promise.all([User.remove(), Venue.remove()])
})

test.serial('POST /Venues 201 (master)', async (t) => {
  const { masterKey } = t.context
  const { status, body } = await request(app())
    .post('/')
    .send({ access_token: masterKey, venueType: 'test', venueName: 'test', address: 'test', postTown: 'test', postCode: 'test', contactNumber: 'test', webAddress: 'test', emailAddress: 'test', musicGenre: 'test', events: 'test' })
  t.true(status === 201)
  t.true(typeof body === 'object')
  t.true(body.venueType === 'test')
  t.true(body.venueName === 'test')
  t.true(body.address === 'test')
  t.true(body.postTown === 'test')
  t.true(body.postCode === 'test')
  t.true(body.contactNumber === 'test')
  t.true(body.webAddress === 'test')
  t.true(body.emailAddress === 'test')
  t.true(body.musicGenre === 'test')
  t.true(body.events === 'test')
})

test.serial('POST /Venues 401 (admin)', async (t) => {
  const { adminSession } = t.context
  const { status } = await request(app())
    .post('/')
    .send({ access_token: adminSession })
  t.true(status === 401)
})

test.serial('POST /Venues 401 (user)', async (t) => {
  const { userSession } = t.context
  const { status } = await request(app())
    .post('/')
    .send({ access_token: userSession })
  t.true(status === 401)
})

test.serial('POST /Venues 401', async (t) => {
  const { status } = await request(app())
    .post('/')
  t.true(status === 401)
})

test.serial('GET /Venues 200 (admin)', async (t) => {
  const { adminSession } = t.context
  const { status, body } = await request(app())
    .get('/')
    .query({ access_token: adminSession })
  t.true(status === 200)
  t.true(Array.isArray(body))
})

test.serial('GET /Venues 401 (user)', async (t) => {
  const { userSession } = t.context
  const { status } = await request(app())
    .get('/')
    .query({ access_token: userSession })
  t.true(status === 401)
})

test.serial('GET /Venues 401', async (t) => {
  const { status } = await request(app())
    .get('/')
  t.true(status === 401)
})

test.serial('GET /Venues/:id 200 (admin)', async (t) => {
  const { adminSession, venue } = t.context
  const { status, body } = await request(app())
    .get(`/${venue.id}`)
    .query({ access_token: adminSession })
  t.true(status === 200)
  t.true(typeof body === 'object')
  t.true(body.id === venue.id)
})

test.serial('GET /Venues/:id 401 (user)', async (t) => {
  const { userSession, venue } = t.context
  const { status } = await request(app())
    .get(`/${venue.id}`)
    .query({ access_token: userSession })
  t.true(status === 401)
})

test.serial('GET /Venues/:id 401', async (t) => {
  const { venue } = t.context
  const { status } = await request(app())
    .get(`/${venue.id}`)
  t.true(status === 401)
})

test.serial('GET /Venues/:id 404 (admin)', async (t) => {
  const { adminSession } = t.context
  const { status } = await request(app())
    .get('/123456789098765432123456')
    .query({ access_token: adminSession })
  t.true(status === 404)
})

test.serial('PUT /Venues/:id 200 (master)', async (t) => {
  const { masterKey, venue } = t.context
  const { status, body } = await request(app())
    .put(`/${venue.id}`)
    .send({ access_token: masterKey, venueType: 'test', venueName: 'test', address: 'test', postTown: 'test', postCode: 'test', contactNumber: 'test', webAddress: 'test', emailAddress: 'test', musicGenre: 'test', events: 'test' })
  t.true(status === 200)
  t.true(typeof body === 'object')
  t.true(body.id === venue.id)
  t.true(body.venueType === 'test')
  t.true(body.venueName === 'test')
  t.true(body.address === 'test')
  t.true(body.postTown === 'test')
  t.true(body.postCode === 'test')
  t.true(body.contactNumber === 'test')
  t.true(body.webAddress === 'test')
  t.true(body.emailAddress === 'test')
  t.true(body.musicGenre === 'test')
  t.true(body.events === 'test')
})

test.serial('PUT /Venues/:id 401 (admin)', async (t) => {
  const { adminSession, venue } = t.context
  const { status } = await request(app())
    .put(`/${venue.id}`)
    .send({ access_token: adminSession })
  t.true(status === 401)
})

test.serial('PUT /Venues/:id 401 (user)', async (t) => {
  const { userSession, venue } = t.context
  const { status } = await request(app())
    .put(`/${venue.id}`)
    .send({ access_token: userSession })
  t.true(status === 401)
})

test.serial('PUT /Venues/:id 401', async (t) => {
  const { venue } = t.context
  const { status } = await request(app())
    .put(`/${venue.id}`)
  t.true(status === 401)
})

test.serial('PUT /Venues/:id 404 (master)', async (t) => {
  const { masterKey } = t.context
  const { status } = await request(app())
    .put('/123456789098765432123456')
    .send({ access_token: masterKey, venueType: 'test', venueName: 'test', address: 'test', postTown: 'test', postCode: 'test', contactNumber: 'test', webAddress: 'test', emailAddress: 'test', musicGenre: 'test', events: 'test' })
  t.true(status === 404)
})

test.serial('DELETE /Venues/:id 204 (master)', async (t) => {
  const { masterKey, venue } = t.context
  const { status } = await request(app())
    .delete(`/${venue.id}`)
    .query({ access_token: masterKey })
  t.true(status === 204)
})

test.serial('DELETE /Venues/:id 401 (admin)', async (t) => {
  const { adminSession, venue } = t.context
  const { status } = await request(app())
    .delete(`/${venue.id}`)
    .query({ access_token: adminSession })
  t.true(status === 401)
})

test.serial('DELETE /Venues/:id 401 (user)', async (t) => {
  const { userSession, venue } = t.context
  const { status } = await request(app())
    .delete(`/${venue.id}`)
    .query({ access_token: userSession })
  t.true(status === 401)
})

test.serial('DELETE /Venues/:id 401', async (t) => {
  const { venue } = t.context
  const { status } = await request(app())
    .delete(`/${venue.id}`)
  t.true(status === 401)
})

test.serial('DELETE /Venues/:id 404 (master)', async (t) => {
  const { masterKey } = t.context
  const { status } = await request(app())
    .delete('/123456789098765432123456')
    .query({ access_token: masterKey })
  t.true(status === 404)
})
