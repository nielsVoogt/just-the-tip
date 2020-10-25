const functions = require("firebase-functions");
const algoliaSearch = require("algoliasearch");
const admin = require("firebase-admin");

// Initialize Algolia, App ID and API Key are stored in functions config variables
const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;
const ALGOLIA_SEARCH_KEY = functions.config().algolia.search_key;

const algoliaClient = algoliaSearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
const algoliaIndex = algoliaClient.initIndex("users");

// The Firebase Admin SDK to access Cloud Firestore.
admin.initializeApp();

exports.onUserCreated = functions.firestore
  .document("/users/{uid}")
  .onCreate((snapshot, _context) => {
    const userName = snapshot.data().username;
    const algoliaObjectId = snapshot.id;
    return algoliaIndex.saveObject({
      userName,
      objectID: algoliaObjectId,
    });
  });
