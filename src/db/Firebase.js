//import firebase from 'firebase'
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";
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
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
};

//Initialize firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GithubAuthProvider();
// adding scope to the authorization. 
provider.addScope('repo');

export const signInWithGitHub = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
      const name = result.user.displayName;
      const profilePic = result.user.photoURL;
      const oAuthAccessToken = result._tokenResponse.oauthAccessToken;
      const screenName = result._tokenResponse.screenName;

      // Picking up UID and screenName 
      const uid = result.user.uid;
      const screenName = result._tokenResponse.screenName;

      // Authenticate with Firebase using the GitHub provider object. this gives you a github access token you can use to access the github API . 
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;

      localStorage.setItem("name", name);
      localStorage.setItem("profilePic", profilePic);
      localStorage.setItem("accessToken", oAuthAccessToken);
      localStorage.setItem("screenName", screenName);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const signOut = (e) => {
  e.preventDefault();
  auth.signOut();
  localStorage.clear();
  console.log("logged out");
};

// Initialize cloud Firestore
const db = getFirestore();

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
