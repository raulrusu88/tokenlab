import admin from "firebase-admin";
import privateService from "../../private/tokenlab-firebaseAdminPrivateKey.json";

try {
  if (!admin.app.length) {
    admin.initializeApp({
      credential: admin.credential.cert(
        privateService as Partial<admin.ServiceAccount>
      ),
    });
    console.log("Firebase initialized");
  }
} catch (error) {
  if (!/already exits/u.test(error.message)) {
    console.error("Firebase admin initialization error", error);
  }
}

const firestore = admin.firestore();
const auth = admin.auth();

export { firestore, auth };
