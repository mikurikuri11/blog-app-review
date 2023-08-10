import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBMV-c0CnicrQM3PehLAuUuVfhQew5oEgc",
  authDomain: "blog-review-5f82c.firebaseapp.com",
  projectId: "blog-review-5f82c",
  storageBucket: "blog-review-5f82c.appspot.com",
  messagingSenderId: "682065164743",
  appId: "1:682065164743:web:4877e40d6e38f2946501e2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };