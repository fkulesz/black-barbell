var mongoose = require('mongoose');

const Schema = mongoose.Schema;
const product = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true}, 
  transactions: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'transactions'
  }],
  deleted_at: { type: Date, default: null },
  deleted: { type: Boolean, default: null }
});

module.exports = mongoose.model('products', product);