import {
    getFirestore,
    collection,
    addDoc,
    getDoc,
    getDocs,
    setDoc,
    doc,
    where,
    query,
    updateDoc,
    onSnapshot,
    deleteDoc,
    collectionGroup,
  } from 'firebase/firestore';
  

export const db = getFirestore();

// Create a user
export async function createAda() {
  try {
    const docRef = await addDoc(collection(db, 'users'), {
      first: 'Ada',
      last: 'Lovelace',
      born: 1815,
    });
    console.log('Document written with ID: ', docRef);
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

// Get all users
export async function getUsers() {
  const querySnapshot = await getDocs(collection(db, 'users'));
  querySnapshot.forEach((doc) => {
    console.log(doc.id, ' => ', doc.data());
  });
}

// Get all goals
// export async function getGoals() {
//   const allGoals = await getDocs(collectionGroup(db, "goals"));
//   allGoals.forEach((doc) => {
//     console.log(doc.id, " => ", doc.data());
//   });
// }

// Get single user
const docRef = doc(db, 'users', 'hfzkYMJiaRIMSoEXu9sp');

export async function getSingleUser() {
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    console.log('Document data:', docSnap);
  } else {
    // doc.data() will be undefined in this case
    console.log('No such document!');
  }
}

// Update a single user
const userToUpdate = doc(db, 'users', 'wwqKb3aoNbYrkTCjSRS0');

export async function makeDiana() {
  console.log('userToUpdate >>>>>', userToUpdate);
  await updateDoc(userToUpdate, {
    first: 'Diana',
  });
  console.log('userToUpdate >>>>>', userToUpdate);
}

// Delete a single user
export async function deleteUser() {
  await deleteDoc(doc(db, "allUsers", window.localStorage.getItem('uid'),'userGoals', 
  'I3brJvjKYNQTdEugAlUJ'));
  console.log('User was deleted!');
}

export async function getGoals() {
  const col = collection(
    db,
    'allUsers',
    'Dcriq62dNaWGkoCgtrqcLcfyb2q2',
    'userGoals'
  );
  const userGoals = await getDocs(col);
  console.log(userGoals.docs.map((d) => ({ id: d.id, ...d.data() })));
}

// const q = query(collection(db, "allUsers"), where(
//   "userId", "==" , window.localStorage.getItem('userId')
// ));

// const unsub = onSnapshot(q, (querySnapshot) => {
//   let goalsArray = [];
//   querySnapshot.forEach((doc) => {
//     goalsArray.push({ ...doc.data(), id: doc.id });
//   });

