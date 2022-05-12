import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDtG6Qid0JHViooHXfYeVosupg7CPcZ_NI",
  authDomain: "gameodoro-fa3ab.firebaseapp.com",
  databaseURL: "https://gameodoro-fa3ab-default-rtdb.firebaseio.com",
  projectId: "gameodoro-fa3ab",
  storageBucket: "gameodoro-fa3ab.appspot.com",
  messagingSenderId: "96904439497",
  appId: "1:96904439497:web:edc40cd728d6b556334f18"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
