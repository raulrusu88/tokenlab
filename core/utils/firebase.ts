import { getApp, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

try {
  if (!getApp.length) {
    initializeApp({
      apiKey: process.env.firebase_api_key,
      authDomain: process.env.firebase_auth_domain,
      projectId: process.env.firebase_project_id,
      storageBucket: process.env.firebase_storage_bucket,
      messagingSenderId: process.env.firebase_messaging_sender_id,
      appId: process.env.firebase_app_id,
    });
    console.log("Firebase initialized");
  }
} catch (error) {
  if (!/already exits/u.test(error.message)) {
    console.error("Firebase admin initialization error", error);
  }
}

const firestore = getFirestore();
const auth = getAuth();

export { firestore, auth };
