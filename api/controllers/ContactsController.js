var Contact = require('../models/contact');
var handleError = require('../config/app');

exports.getContacts = (req, res) => {
  var name = req.query.name;
  var lastname = req.query.forname;
  var email = req.query.email;
  var role = req.query.role;
  var phone = req.query.phone;
  var limit = parseInt(req.query.limit);
  var queryString = {};
  queryString.deleted_at = null;
  queryString.deleted = null;
  if(typeof name !== 'undefined') {
    queryString.name = new RegExp(name, 'i');
  }
  if(typeof lastname !== 'undefined') {
    queryString.forname = new RegExp(lastname, 'i');
  }
  if(typeof email !== 'undefined') {
    queryString.email = new RegExp(email, 'i');
  }
  if(typeof role !== 'undefined') {
    queryString.role = new RegExp(role, 'i');
  }
  if(typeof phone !== 'undefined') {
    queryString.phone = new RegExp(phone, 'i');
  }
  limit = (limit === undefined ? 0 : limit);
  Contact.find(
    queryString
  ).limit(limit).populate('tickets').populate('visits')
  .exec(function (err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get contacts.");
    } else {
      res.status(200).json(docs);
    }
  });
}

exports.newContact = (req, res) => {
  var newContact = req.body;
  newContact.start_day = new Date();

  Contact.create(newContact, function (err, contact) {
    if (err) {
      handleError(res, err.message, err.message);
    } else {
      res.status(201).json(contact);
    }
  });
}

exports.getContact = (req, res) => {
  Contact.findById(req.params.id).populate('tickets').exec(function (err, contact) {
    if (err) {
      handleError(res, err.message, err.message);
    } else {
      res.status(200).json(contact);
    }
  })
}

exports.editContact = (req, res) => {
  var updateDoc = req.body;
  delete updateDoc._id;
  Contact.findByIdAndUpdate(req.params.id, { $set: updateDoc }, function (err, contact) {
    if (err) {
      handleError(res, err.message, err.message);
    } else {
      res.status(200).json(contact);
    }
  });
}

exports.deleteContact = (req, res) => {
  var updateDoc = {
    deleted_at: new Date(),
    deleted: true
  }
  Contact.findByIdAndUpdate({ _id: req.params.id }, { $set: updateDoc },  function(err) {
    if (err) {
      handleError(res, err.message, err.message);
    } else {
      res.status(200).json({ _id: req.params.id });
    }
  });
}
