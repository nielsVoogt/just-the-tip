const functions = require("firebase-functions");
const algoliaSearch = require("algoliasearch");

// Initialize Algolia, App ID and API Key are stored in functions config variables
const ALGOLIA_ID = functions.config().algolia.app_id;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.api_key;

const algoliaClient = algoliaSearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);
const algoliaIndex = algoliaClient.initIndex(
  functions.config().algolia.init_index
);

exports.onUserCreated = functions.auth.user().onCreate((user) => {
  const userName = user.displayName;
  const algoliaObjectId = user.uid;
  return algoliaIndex.saveObject({
    userName,
    objectID: algoliaObjectId,
  });
});

exports.onUserDelete = functions.auth.user().onDelete((user) => {
  return algoliaIndex.deleteObject(user.uid);
});
