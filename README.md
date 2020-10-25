# Just the tip

My take on a non social network where users can exchange tips with their friends. No chat, no commenting, no community, just the tip...
Built with `Vue`, `Vue Router`, `Vuex`, `i18n`, `jest`, `Firebase` and `Algolia`

### Run the project locally

Create a new firebase project. Make sure to enable Email/Password authentication and firestore in this project.

```
VUE_APP_FIREBASE_API_KEY=your_api_key
VUE_APP_FIREBASE_AUTHDOMAIN=your_authdomain
VUE_APP_FIREBASE_DATABASEURL=your_database_url
VUE_APP_FIREBASE_PROJECTID=your_project_id
VUE_APP_FIREBASE_STORAGEBUCKET=your_storagebucket
VUE_APP_FIREBASE_MESSAGINGSENDERID=your_messagingsender_id
VUE_APP_FIREBASE_APPID=your_app_id
VUE_APP_MEASUREMENTID=your_measurement_id
```

Then run the following commands:

```
$ npm install
$ npm run serve
```

### Seed

You can run the `seed` command to generate users and their collections. In your firebase project settings go to the 'Service accounts' tab, and generate a new private key. Store the downloaded json in the project root and rename it to `serviceAccountKey.json`. You are now good to go. To seed run the following command:

```
$ npm run seed
```

### Reset

If you want to delete all users run:

```
$ npm run reset
```
