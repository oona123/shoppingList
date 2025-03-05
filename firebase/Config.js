import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, deleteDoc, onSnapshot, doc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};

  initializeApp(firebaseConfig)
  
  const firestore = getFirestore()

  const ITEMS = 'items'

  export {
    firestore,
    collection,
    addDoc,
    deleteDoc,
    onSnapshot,
    doc,
    ITEMS
  }