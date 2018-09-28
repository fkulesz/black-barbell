var Contact = require('../models/contact');
var Product = require('../models/product');
var Transaction = require('../models/transaction');
var handleError = require('../config/app');


exports.getTransactions = (req, res) => {
  var date = req.query.date;
  var price = req.query.price;
  var uid = req.params.id;
  var prodId =req.params.prod_id;
  var limit = parseInt(req.query.limit);
  var queryString = {};
  queryString.deleted_at = null;
  queryString.deleted = null;
  if (typeof date !== 'undefined') {
    queryString.date = new Date(date);
  }
  if (typeof price !== 'undefined') {
    queryString.price = price;
  }
  if (typeof uid !== 'undefined') {
    queryString.client = uid;
  }
  if (typeof prodId !== 'undefined') {
    queryString.product = prodId;
  }
  limit = (limit === undefined ? 0 : limit);
  Transaction.find(
    queryString
  ).limit(limit).populate('client').exec(function (err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get transactions.");
    } else {
      res.status(200).json(docs);
    }
  });
}

exports.newTransaction = (req, res) => {
  var newTransaction = req.body;
  newTransaction.start_day = new Date();
  if (typeof req.params.id !== 'undefined') {
    newTransaction.client = req.params.id
  }

  Transaction.create(newTransaction, function (err, transaction) {
    if (err) {
      handleError(res, err.message, err.message);
    } else {
      res.status(201).json(transaction);
    }
  });
}

exports.getTransaction = (req, res) => {
  Transaction.findById(req.params.id).populate('contacts').exec(function (err, transaction) {
    if (err) {
      handleError(res, err.message, err.message);
    } else {
      res.status(200).json(transaction);
    }
  })
}

exports.editTransaction = (req, res) => {
  var updateDoc = req.body;
  delete updateDoc._id;
  Transaction.findByIdAndUpdate(req.params.id, { $set: updateDoc }, function (err, transaction) {
    if (err) {
      handleError(res, err.message, err.message);
    } else {
      res.status(200).json(transaction);
    }
  });
}

exports.deleteTransaction = (req, res) => {
  var updateDoc = {
    deleted_at: new Date(),
    deleted: true
  }
  Transaction.findByIdAndUpdate({ _id: req.params.id }, { $set: updateDoc },  function(err) {
    if (err) {
      handleError(res, err.message, err.message);
    } else {
      res.status(200).json({ _id: req.params.id });
    }
  });
}
