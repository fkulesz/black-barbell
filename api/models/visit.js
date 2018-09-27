var mongoose = require('mongoose');

const Schema = mongoose.Schema;
const visit = new Schema({
  date: { type: Date, default: Date.now() },
  client: { type: Schema.Types.ObjectId, ref: 'contacts', required: true }
});

module.exports = mongoose.model('visits', visit);