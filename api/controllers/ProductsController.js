var handleError = require('../config/app');
var Product = require('../models/product');

exports.getProducts = (req, res) => {
  var name = req.query.name;
  var price = req.query.price;
  var queryString = {};
  var limit = parseInt(req.query.limit);
  queryString.deleted_at = null;
  queryString.deleted = null;
  if(typeof name !== 'undefined') {
    queryString.name = new RegExp(name, 'i');
  }
  if(typeof price !== 'undefined') {
    queryString.price = price;
  }
  limit = (limit === undefined ? 0 : limit);
  Product.find(
    queryString
  ).limit(limit)
  .exec(function (err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get products.");
    } else {
      res.status(200).json(docs);
    }
  });
}

exports.newProduct = (req, res) => {
  var newProduct = req.body;
  newProduct.start_day = new Date();

  Product.create(newProduct, function (err, product) {
    if (err) {
      handleError(res, err.message, err.message);
    } else {
      res.status(201).json(product);
    }
  });
}

exports.getProduct = (req, res) => {
  Product.findById(req.params.id).populate('tickets').exec(function (err, product) {
    if (err) {
      handleError(res, err.message, err.message);
    } else {
      res.status(200).json(product);
    }
  })
}

exports.editProduct = (req, res) => {
  var updateDoc = req.body;
  delete updateDoc._id;
  Product.findByIdAndUpdate(req.params.id, { $set: updateDoc }, function (err, product) {
    if (err) {
      handleError(res, err.message, err.message);
    } else {
      res.status(200).json(product);
    }
  });
}

exports.deleteProduct = (req, res) => {
  var updateDoc = {
    deleted_at: new Date(),
    deleted: true
  }
  Product.findByIdAndUpdate({ _id: req.params.id }, { $set: updateDoc },  function(err) {
    if (err) {
      handleError(res, err.message, err.message);
    } else {
      res.status(200).json({ _id: req.params.id });
    }
  });
}
