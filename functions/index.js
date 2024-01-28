import * as functions from 'firebase-functions';
import admin from 'firebase-admin';

admin.initializeApp();
// Create and Deploy Your First Cloud Functions

import daraja from './daraja.js';

export const besha = functions.https.onRequest(daraja); 

export const helloWorld = functions.https.onRequest((request, response) => { 
  response.send("Hello worldsss!");
});
