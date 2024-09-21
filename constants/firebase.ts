import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// SAMPLE LOGIN:
// email: testuser1@example.com
// password: testuser1

const firebaseConfig = {
  apiKey: "AIzaSyAkg2lkqsEC5P8g0vvSF08FtbgTRmybna0",
  authDomain: "supplystream-tc2007b.firebaseapp.com",
  projectId: "supplystream-tc2007b",
  storageBucket: "supplystream-tc2007b.appspot.com",
  messagingSenderId: "151227805195",
  appId: "1:151227805195:web:ef7af937318c2be6e0610e"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
