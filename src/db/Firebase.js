//import firebase from 'firebase'
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GithubAuthProvider } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

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

export async function signInWithGitHub() {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
      const name = result.user.displayName;
      const profilePic = result.user.photoURL;
      const accessToken = result.user.accessToken;

      localStorage.setItem('name', name);
      localStorage.setItem('profilePic', profilePic);
      localStorage.setItem('accessToken', accessToken);

      // pressing login creates a user with github uid to allUsers model in db
      setDoc(doc(db, 'allUsers', result.user.uid), {
        accessToken: result.user.accessToken,
      });
      window.location = '/';
    })
    .catch((error) => {
      console.log(error);
    });
}

export const signOut = (e) => {
  e.preventDefault();
  auth.signOut();
  localStorage.clear();
  window.location = '/';
};

// Initialize cloud Firestore
const db = getFirestore();
