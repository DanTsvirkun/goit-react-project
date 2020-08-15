import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC4-3lgknRDKUcJPKxemE0m4nMrC94KNXU",
  authDomain: "goit-react-project.firebaseapp.com",
  databaseURL: "https://goit-react-project.firebaseio.com",
  projectId: "goit-react-project",
  storageBucket: "goit-react-project.appspot.com",
  messagingSenderId: "665112245664",
  appId: "1:665112245664:web:9d8b3109f8ed175f6820c5",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db };
