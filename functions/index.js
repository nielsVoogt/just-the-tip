// const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

exports.users = require("./users");
exports.tips = require("./tips");
