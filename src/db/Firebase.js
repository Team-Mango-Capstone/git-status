//import firebase from 'firebase'
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GithubAuthProvider } from 'firebase/auth';
import {
  getFirestore,
  setDoc,
  doc,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: 'git-status-da9f6.firebaseapp.com',
  projectId: 'git-status-da9f6',
  storageBucket: 'git-status-da9f6.appspot.com',
  messagingSenderId: '353841373758',
  appId: '1:353841373758:web:a8850c4bc0154396eba76f',
  measurementId: 'G-L0MDSRRFR8',
};

//Initialize firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GithubAuthProvider();

export const signInWithGitHub = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
      const accessToken = result.user.accessToken;
      const name = result.user.displayName;
      const profilePic = result.user.photoURL;
      const githubId = result.user.providerData[0].uid;
      const uid = result.user.uid;
      window.localStorage.setItem('name', name);
      window.localStorage.setItem('profilePic', profilePic);
      window.localStorage.setItem('githubId', githubId);
      window.localStorage.setItem('uid', uid)
      window.localStorage.setItem('accessToken', accessToken)

      setDoc(doc(db, 'allUsers', uid), {
        accessToken: accessToken,
      })
    })
    .catch((error) => {
      console.log(error);
    });
};

export const signOutGithub = (e) => {
  e.preventDefault();
  auth.signOut();
  window.localStorage.clear();
  console.log('logged out');
};


//--------------------------------- Initialize cloud Firestore---------------------------------------------
export const db = getFirestore();