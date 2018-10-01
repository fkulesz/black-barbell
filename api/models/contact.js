var mongoose = require('mongoose');

const Schema = mongoose.Schema;
const contact = new Schema({
  name: { type: String, required: true },
  forname: { type: String, required: true },
  active: { type: Boolean, default: true},
  comment: { type: String },
  // TODO: email uniqueness validation doesnt work on database
  email: { 
    type: String, 
    required: [
      function() { return (this.role === 'worker' || this.role === 'admin') },
      'Email dla danej roli jest wymagany'
    ], 
    trim: true, 
    index: {
      unique: true,
      partialFilterExpression: {
        role: {
          $in: ['worker', 'admin']
        }
      }
    }
  },
  address: { type: String },
  role: { type: String, default: 'client' },
  phone: { type: String },
  // TODO: doesn't work, dunno why - returns empty arrays
  tickets: [{ type: Schema.Types.ObjectId, ref: 'tickets' }],
  visits: [{ type: Schema.Types.ObjectId, ref: 'visits'}],
  createDate: { type: Date, default: new Date() },
  deleted: { type: Boolean, default: null },
  deleted_at: { type: Date, default: null },
  password: { 
    type: String, 
    min: [8, 'Hasło za krótkie'], 
    required: [
      function() { return (this.role === 'worker' || this.role === 'admin') },
      'Hasło dla danej roli jest wymagane'
    ] 
  }
});

module.exports = mongoose.model('contacts', contact);