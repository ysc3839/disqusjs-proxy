const functions = require('firebase-functions');
const api = require('disqusjs-proxy');
const config = require('./config.json');

exports.disqus = functions.https.onRequest(api(config));
