import { FirebaseOptions, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, initializeFirestore, setLogLevel } from "firebase/firestore";

// SAMPLE LOGIN:
// email: testuser1@example.com
// password: testuser1

const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyAkg2lkqsEC5P8g0vvSF08FtbgTRmybna0",
  databaseURL: "https://supplystream-tc2007b-default-rtdb.firebaseio.com/",
  authDomain: "supplystream-tc2007b.firebaseapp.com",
  projectId: "supplystream-tc2007b",
  storageBucket: "supplystream-tc2007b.appspot.com",
  messagingSenderId: "151227805195",
  appId: "1:151227805195:web:ef7af937318c2be6e0610e"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = initializeFirestore(app, {
  // De lo q investigué, esto pudo ser uno de los problemas con Firebase
  // al final era sólo por que no había prendido Firebase en la consola
  // pero vale la pena dejarlo prendido por si las dudas
  experimentalAutoDetectLongPolling: true
});

export default app;
