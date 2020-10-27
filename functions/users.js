const functions = require("firebase-functions");
const admin = require("firebase-admin");

const algoliaSearch = require("algoliasearch");

// Initialize Algolia, App ID and API Key are stored in functions config variables
const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;
// const ALGOLIA_SEARCH_KEY = functions.config().algolia.search_key;

const algoliaClient = algoliaSearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);

const algoliaIndex = algoliaClient.initIndex(
  functions.config().algolia.init_index
);

exports.onUserCreated = functions.auth.user().onCreate((user) => {
  const userName = user.data.displayName;
  const algoliaObjectId = snapshot.id;
  return algoliaIndex.saveObject({
    userName,
    objectID: algoliaObjectId,
  });
});

exports.onUserDelete = functions.auth.user().onDelete((user) => {
  return algoliaIndex.deleteObject(user.uid);
});
