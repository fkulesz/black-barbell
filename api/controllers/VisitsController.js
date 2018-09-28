var Contact = require('../models/contact');
var handleError = require('../config/app');
var Visit = require('../models/visit');

exports.getVisits = (req, res) => {
  var date = req.query.date;
  var uid = req.params.id;
  var limit = parseInt(req.query.limit);
  var queryString = {};
  if (typeof date !== 'undefined') {
    queryString.date = new Date(date);
  }
  if (typeof uid !== 'undefined') {
    queryString.client = uid;
  }
  limit = (limit === undefined ? 0 : limit);
  Visit.find(
    queryString
  ).limit(limit).populate('client').exec(function (err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get visits.");
    } else {
      res.status(200).json(docs);
    }
  });
}

exports.newVisit = (req, res) => {
  var newVisit = req.body;
  newVisit.start_day = new Date();
  if (typeof req.params.id !== 'undefined') {
    newVisit.client = req.params.id
  }

  Visit.create(newVisit, function (err, visit) {
    if (err) {
      handleError(res, err.message, err.message);
    } else {
      res.status(201).json(visit);
    }
  });
}

exports.getVisit = (req, res) => {
  Visit.findById(req.params.id).populate('contacts').exec(function (err, visit) {
    if (err) {
      handleError(res, err.message, err.message);
    } else {
      res.status(200).json(visit);
    }
  })
}

exports.editVisit = (req, res) => {
  var updateDoc = req.body;
  delete updateDoc._id;
  Visit.findByIdAndUpdate(req.params.id, { $set: updateDoc }, function (err, visit) {
    if (err) {
      handleError(res, err.message, err.message);
    } else {
      res.status(200).json(visit);
    }
  });
}

exports.deleteVisit = (req, res) => {
  Visit.deleteOne({ _id: req.params.id },  function(err) {
    if (err) {
      handleError(res, err.message, err.message);
    } else {
      res.status(200).json({ _id: req.params.id });
    }
  });
}
