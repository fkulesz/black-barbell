var mongoose = require('mongoose');

const Schema = mongoose.Schema;
const contact = new Schema({
  name: { type: String, required: true },
  forname: { type: String, required: true },
  active: { type: Boolean, default: true},
  comment: { type: String },
  email: { type: String, required: true },
  address: { type: String },
  role: { type: String, default: 'client' },
  tickets: { type: Schema.Types.ObjectId, ref: 'tickets' },
  createDate: { type: Date, default: new Date() },
  deleted: { type: Boolean, default: null },
  deletet_at: { type: Date, default: null }
});

module.exports = mongoose.model('contacts', contact);