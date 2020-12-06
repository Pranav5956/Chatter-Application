import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import { firebaseConfig } from "./config";

firebase.initializeApp(firebaseConfig);

// Database
const firebaseFirestore = firebase.firestore();
export default firebaseFirestore;

// User Authorization
export const firebaseAuth = firebase.auth();
export const firebaseAuthInSession = firebaseAuth.setPersistence(
  firebase.auth.Auth.Persistence.SESSION
);

// Providers
export const googleProvider = new firebase.auth.GoogleAuthProvider();
