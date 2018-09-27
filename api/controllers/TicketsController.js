var Contact = require('../models/contact');
var Ticket = require('../models/ticket');
var handleError = require('../config/app');


exports.getTickets = (req, res) => {
  var start = req.query.start;
  var end = req.query.end;
  var price = req.query.price;
  var limit = parseInt(req.query.limit);
  var queryString = {};
  queryString.deleted_at = null;
  queryString.deleted = null;
  if (typeof start !== 'undefined') {
    queryString.start_day = new Date(start);
  }
  if (typeof end !== 'undefined') {
    queryString.end_day = new Date(end);
  }
  if (typeof price !== 'undefined') {
    queryString.price = price;
  }
  limit = (limit === undefined ? 0 : limit);
  Ticket.find(
    queryString
  ).limit(limit).populate('client').exec(function (err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get tickets.");
    } else {
      res.status(200).json(docs);
    }
  });
}

exports.newTicket = (req, res) => {
  var newTicket = req.body;
  newTicket.start_day = new Date();
  if (typeof req.params.id !== 'undefined') {
    newTicket.client = req.params.id
  }

  Ticket.create(newTicket, function (err, ticket) {
    if (err) {
      handleError(res, err.message, err.message);
    } else {
      res.status(201).json(ticket);
    }
  });
}

exports.getTicket = (req, res) => {
  Ticket.findById(req.params.id).populate('contacts').exec(function (err, ticket) {
    if (err) {
      handleError(res, err.message, err.message);
    } else {
      res.status(200).json(ticket);
    }
  })
}

exports.editTicket = (req, res) => {
  var updateDoc = req.body;
  delete updateDoc._id;
  Ticket.findByIdAndUpdate(req.params.id, { $set: updateDoc }, function (err, ticket) {
    if (err) {
      handleError(res, err.message, err.message);
    } else {
      res.status(200).json(ticket);
    }
  });
}

exports.deleteTicket = (req, res) => {
  var updateDoc = {
    deleted_at: new Date(),
    deleted: true
  }
  Ticket.findByIdAndUpdate({ _id: req.params.id }, { $set: updateDoc },  function(err) {
    if (err) {
      handleError(res, err.message, err.message);
    } else {
      res.status(200).json({ _id: req.params.id });
    }
  });
}
