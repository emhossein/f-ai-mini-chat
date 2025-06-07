import admin from "firebase-admin";

// TODO: BACKEND_INTEGRATION - This file initializes the Firebase Admin SDK.
// If you switch to a different backend service provider for server-side operations
// (e.g., a different database for chat messages, or a different system for server-side AI logic)
// not reliant on Firebase Admin, this file's content or its usage would change or be removed.
// The service account key (FIREBASE_ADMIN_SERVICE_ACCOUNT_BASE64) is crucial for this setup.

const serviceAccountBase64 = process.env.FIREBASE_ADMIN_SERVICE_ACCOUNT_BASE64;

if (!admin.apps.length) {
  if (!serviceAccountBase64) {
    console.error(
      "Firebase Admin SDK: Service account credentials are not defined. FIREBASE_ADMIN_SERVICE_ACCOUNT_BASE64 environment variable is missing.",
    );
    // You might want to throw an error here or handle it differently depending on your app's needs
    // For now, we'll let the app try to continue, but Firebase Admin features will fail.
  } else {
    try {
      const serviceAccountJson = Buffer.from(
        serviceAccountBase64,
        "base64",
      ).toString("utf-8");
      const serviceAccount = JSON.parse(serviceAccountJson);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      console.log("Firebase Admin SDK initialized successfully.");
    } catch (error) {
      console.error("Error initializing Firebase Admin SDK:", error);
      // Log the first few chars of the base64 string to help debug if it's malformed without exposing the whole key
      console.error(
        "Service account (first 20 chars):",
        serviceAccountBase64.substring(0, 20),
      );
    }
  }
}

// TODO: BACKEND_INTEGRATION - These exports provide Firebase Admin functionalities.
// If your backend services (like database or server-side utilities) move away from Firebase,
// these would be replaced by clients or SDKs for those new services.
export const firestoreAdmin = admin.firestore();
export const authAdmin = admin.auth(); // Used for ID token verification in the API route.
export default admin;
