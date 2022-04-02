//import firebase from 'firebase'
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GithubAuthProvider } from 'firebase/auth';

import { getFirestore, setDoc, doc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: 'git-status-da9f6.firebaseapp.com',
  projectId: 'git-status-da9f6',
  storageBucket: 'git-status-da9f6.appspot.com',
  messagingSenderId: '353841373758',
  appId: '1:353841373758:web:a8850c4bc0154396eba76f',
  measurementId: 'G-L0MDSRRFR8',
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
};

//Initialize firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GithubAuthProvider();
// adding scope to the authorization.
provider.addScope('repo', 'repo:status');
provider.addScope('delete_repo');
provider.addScope('notifications');
provider.addScope('user');

export async function signInWithGitHub() {
  signInWithPopup(auth, provider)
    .then((result) => {
      console.log(result);
      const accessToken = result.user.accessToken;
      const name = result.user.displayName;
      const profilePic = result.user.photoURL;
      const githubId = result.user.providerData[0].uid;
      const uid = result.user.uid;
      const oAuthAccessToken = result._tokenResponse.oauthAccessToken;
      const screenName = result._tokenResponse.screenName;
      window.localStorage.setItem('name', name);
      window.localStorage.setItem('profilePic', profilePic);
      window.localStorage.setItem('githubId', githubId);
      window.localStorage.setItem('uid', uid);
      window.localStorage.setItem('accessToken', accessToken);
      window.localStorage.setItem('oAuthAccessToken', oAuthAccessToken);
      window.localStorage.setItem('screenName', screenName);

      window.location = '/';
    })
    .catch((error) => {
      console.log(error);
    });
}

export async function setAccessToken() {
  const accessToken = window.localStorage.getItem('accessToken');
  const uid = window.localStorage.getItem('uid');
  await setDoc(doc(db, 'allUsers', uid), {
    accessToken: accessToken,
  });
}

export const signOutGithub = (e) => {
  e.preventDefault();
  auth.signOut();
  window.localStorage.clear();
  window.location = '/';
};

//--------------------------------- Initialize cloud Firestore---------------------------------------------
export const db = getFirestore();
