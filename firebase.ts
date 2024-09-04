// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: "linkin-clone-661a9",
  storageBucket: "linkin-clone-661a9.appspot.com",
  messagingSenderId: "396397162686",
  appId: "1:396397162686:web:0c22c705640b220a3deeef",
  measurementId: "G-MXWSGB3PBT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };
