const admin = require("firebase-admin");

admin.initializeApp();

exports.users = require("./users");
exports.tips = require("./tips");
