import { initializeApp, applicationDefault, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import admin from 'firebase-admin';
import { getSecretValue } from './Secrets';

async function initializeFirebase() {
    try {
        const credentials = await getSecretValue("GoogleServiceAccount");

        admin.initializeApp({
            credential: admin.credential.cert(credentials as any),
        });

        console.log("Firebase initialized successfully");
    } catch (error) {
        console.error("Failed to initialize Firebase:", error);
    }
}

initializeFirebase();

export { admin, getAuth };
