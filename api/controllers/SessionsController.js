var handleError = require('../config/app');
var Contact = require('../models/contact');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

exports.loginUser = (req, res) => {
  if (req.body.password !== undefined && req.body.password !== "") {
    Contact.findOne({
      email: req.body.email, 
      role: {
        $in: ['worker', 'admin']
      }
    },  function (err, contact) {
      if (err) {
        handleError(res, err.message, "Autoryzacja nie powiodła się.", "401");
      } else if (contact === undefined) {
        handleError(res, 'no user found', "Autoryzacja nie powiodła się.", "401");
      } else {
        bcrypt.compare(req.body.password, contact.password, function(err, result) {
          if (err) {
            handleError(res, err.message, "Autoryzacja nie powiodła się.", "401");
          } 
          if (result) {
            const token = jwt.sign({
              email: contact.email,
              userId: contact._id
            }, process.env.JWT_KEY, {
              expiresIn: "2h"
            })
            res.status(200).json({
              message: "Zalogowano pomyślnie",
              token: token
            })
          } else{
            handleError(res, "auth failed", "Autoryzacja nie powiodła się.", "401");
          }

        });
      }
    });
  } else {
    handleError(res, "no password provided", "Autoryzacja nie powiodła się.", "401");
  }

};