import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_KEY,
    authDomain: "curate-links.firebaseapp.com",
    databaseURL: "https://curate-links.firebaseio.com",
    projectId: "curate-links"
  };

firebase.initializeApp(config);

export default firebase;
