import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const config = {
    apiKey: "AIzaSyCiKuSouOr19IIR-GgRQyKo-HDzAQzVQ_E",
    authDomain: "curate-links.firebaseapp.com",
    databaseURL: "https://curate-links.firebaseio.com",
    projectId: "curate-links",
    storageBucket: "curate-links.appspot.com",
    messagingSenderId: "400804820502"
  };

firebase.initializeApp(config);

export default firebase;
