var mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ticket = new Schema({
  start_day: { type: Date, default: Date.now },
  end_day: { type: Date, required: true },
  client: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'contacts',
    required: true 
  },
  price: { type: Number, required: true },
  deleted_at: { type: Date, default: null },
  deleted: { type: Boolean, default: null }
});

module.exports = mongoose.model('tickets', ticket);