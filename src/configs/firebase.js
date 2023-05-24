import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA1oKgACCooMo8mIZSNO1QGMrNaTEN9jaI",
  authDomain: "perpus-7410e.firebaseapp.com",
  projectId: "perpus-7410e",
  storageBucket: "perpus-7410e.appspot.com",
  messagingSenderId: "232088394094",
  appId: "1:232088394094:web:350c1fda3c00c37e42097f",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app)
