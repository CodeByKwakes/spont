import mongoose, { Schema } from 'mongoose'

const venueSchema = new Schema({
  venueType: {
    type: String
  },
  venueName: {
    type: String
  },
  address: {
    type: String
  },
  postTown: {
    type: String
  },
  postCode: {
    type: String
  },
  contactNumber: {
    type: String
  },
  webAddress: {
    type: String
  },
  emailAddress: {
    type: String
  },
  musicGenre: {
    type: String
  },
  events: {
    type: String
  }
}, {
  timestamps: true
})

venueSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      venueType: this.venueType,
      venueName: this.venueName,
      address: this.address,
      postTown: this.postTown,
      postCode: this.postCode,
      contactNumber: this.contactNumber,
      webAddress: this.webAddress,
      emailAddress: this.emailAddress,
      musicGenre: this.musicGenre,
      events: this.events,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

export default mongoose.model('Venue', venueSchema)
