import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCi0LB1W_Q_yFHMJWjYcLGipbKByMvZv9k",
  authDomain: "data-collection-sgta.firebaseapp.com",
  databaseURL: "https://data-collection-sgta-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "data-collection-sgta",
  storageBucket: "data-collection-sgta.appspot.com",
  messagingSenderId: "439758075612",
  appId: "1:439758075612:web:8d673697fa91d7f9552619",
  measurementId: "G-HVGRPT3LHF"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const firebaseDatabase = getDatabase(app)
export const firebaseAuth = getAuth(app)