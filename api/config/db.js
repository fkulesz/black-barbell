var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || "mongodb://admin:admin123@ds143242.mlab.com:43242/gym");
mongoose.Promise = global.Promise;
module.exports = mongoose.connection;