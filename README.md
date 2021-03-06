# Just the tip

My take on a non social network where users can exchange tips with their friends. No chat, no commenting, no community, just the tip...
Built with:

- `Vue`, `Vue Router` and `Vuex`
- `Firebase` for hosting, NOSQL database and Cloud functions
- `i18n` for internationalization
- `Algolia` for searching
- `Jest` for testing
- `Figma` for design

### Run the project locally

1. run `$ npm run setup` in the root folder. This will install all needed dependencies in root and `./functions` folder.

2. Create a new Firebase project. Make sure to enable the following:

- Email/Password authentication
- Firestore
- Functions
- Hosting

Enabling functions requires a Firebase Spark plan, but don't worry. You won't be billed for running locally due to low amount of read/writes etc. Once the project is set up add the firebase config keys to your `.env` file

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

3. After adding your ENV vars go to your Firebase project settings go to the 'Service accounts' tab, click the 'generate new private key'. Store the downloaded json in the project root and rename it to `serviceAccountKey.json`. We need this in order to use the Firebase Admin SDK to seed our users and collections.

4. Create a new `.firebaserc` file in the root directory, and add the following JSON (replacing YOUR_FIREBASE_PROJECT_ID with your own projects id)

```
{
  "projects": {
    "default": "YOUR_FIREBASE_PROJECT_ID"
  }
}
```

5. Create a Algolia account and create a new index named `users`. Click on 'API Keys' and replace `YOUR_ALGOLIA_API_KEY`, `YOUR_ALGOLIA_SEARCH_KEY` and `YOUR_ALGOLIA_APP_ID` in the command below with your own API keys. After doing so run the command.

```
$ firebase functions:config:set algolia.init_index="users" algolia.api_key="YOUR_ALGOLIA_API_KEY" algolia.search_key="YOUR_ALGOLIA_SEARCH_KEY" algolia.app_id="YOUR_ALGOLIA_APP_ID"
```

After running the command add the following to your `.env` file:

```
VUE_APP_ALGOLIA_APPLICATIONID=your_algolia_application_id
VUE_APP_ALGOLIA_APIKEY=your_algolia_api_key
VUE_APP_ALGOLIA_USERINDEX=users
```

6. You are almost good to go! First we build, then deploy, then seed.

```
$ npm run build:dev
$ firebase deploy
$ npm run seed
```

You will be notified if the deployment was succesfull! Create your own account by going to the registration page or log in as one of the seeded users, their password is set to `superSecret`.

### Reset - WIP

Deleting users manually is a chore in Firebase, if you want to delete **all** users run:

```
$ npm run reset
```

Todo: Have `reset` also delete all collections and subcollections
