//import firebase from 'firebase'
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GithubAuthProvider, signOut } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  getDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  collectionGroup,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "git-status-da9f6.firebaseapp.com",
  projectId: "git-status-da9f6",
  storageBucket: "git-status-da9f6.appspot.com",
  messagingSenderId: "353841373758",
  appId: "1:353841373758:web:a8850c4bc0154396eba76f",
  measurementId: "G-L0MDSRRFR8",
};

//Initialize firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GithubAuthProvider();

export const signInWithGitHub = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
      const name = result.user.displayName;
      const profilePic = result.user.photoURL;
      const userId = result.user.providerData[0].uid;
      console.log(userId);

      window.localStorage.setItem("name", name);
      window.localStorage.setItem("profilePic", profilePic);
      window.localStorage.setItem("userId", userId);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const signOutGithub = (e) => {
  e.preventDefault();
  auth.signOut();
  window.localStorage.clear();
  console.log("logged out");
};

// Initialize cloud Firestore
export const db = getFirestore();

// Create a user
export async function createAda() {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      first: "Ada",
      last: "Lovelace",
      born: 1815,
    });
    console.log("Document written with ID: ", docRef);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

// Get all users
export async function getUsers() {
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
}

// Get all goals
export async function getGoals() {
  const allGoals = await getDocs(collectionGroup(db, "goals"));
  allGoals.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
  });
}

// Get single user
const docRef = doc(db, "users", "hfzkYMJiaRIMSoEXu9sp");

export async function getSingleUser() {
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log("Document data:", docSnap);
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}

// Update a single user
const userToUpdate = doc(db, "users", "wwqKb3aoNbYrkTCjSRS0");

export async function makeDiana() {
  console.log("userToUpdate >>>>>", userToUpdate);
  await updateDoc(userToUpdate, {
    first: "Diana",
  });
  console.log("userToUpdate >>>>>", userToUpdate);
}

// Delete a single user
export async function deleteUser() {
  await deleteDoc(doc(db, "users", "wwqKb3aoNbYrkTCjSRS0"));
  console.log("User was deleted!");
}
