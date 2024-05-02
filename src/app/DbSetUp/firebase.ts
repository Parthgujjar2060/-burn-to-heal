import firebase from 'firebase/compat/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyB6BfT7787CmwGPk2665ZNIuXXgNeA9Wt0",
  authDomain: "unknown-breath-vibes.firebaseapp.com",
  databaseURL: "https://unknown-breath-vibes-default-rtdb.firebaseio.com",
  projectId: "unknown-breath-vibes",
  storageBucket: "unknown-breath-vibes.appspot.com",
  messagingSenderId: "37559162946",
  appId: "1:37559162946:web:715a246ae288ef7058b5db"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const database = getDatabase();

export {database};
