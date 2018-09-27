var mongoose = require('mongoose');

const Schema = mongoose.Schema;
const transaction = new Schema({
  date: { type: Date, default: Date.now },
  product: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'products',
    required: true 
  },
  client: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'contacts',
    required: true 
  },
  price: { type: Number, required: true },
  comment: { type: String },
  deleted_at: { type: Date, default: null },
  deleted: { type: Boolean, default: null }
});

module.exports = mongoose.model('transactions', transaction);