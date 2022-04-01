import { db } from './Firebase';
import {
  doc,
  updateDoc,
  deleteDoc,
  setDoc,
} from 'firebase/firestore';

const uid =  window.localStorage.getItem('uid');

export const handleEditDesc = async (collection, item, description) => {
  await updateDoc(
    doc(
      db,
      'allUsers',
      uid,
      collection,
      item.id
    ),
     { description }
  ); 
};

export const handleEditDeadline = async (collection, item, deadline) => {
  await updateDoc(
    doc(
      db,
      'allUsers',
      uid,
      collection,
      item.id
    ),
    { deadline }
  );
};

export const handleEditTitle = async (collection, item, title) => {
  await updateDoc(
    doc(
      db,
      'allUsers',
      uid,
      collection,
      item.id
    ),
    { title }
  );
};

export const handleEditProgress = async (collection, item, goalProgress) => {
  await updateDoc(
    doc(
      db,
      'allUsers',
      uid,
      collection,
      item.id
    ),
    { goalProgress: goalProgress }
  ); 
};


export const toggleComplete = async (collection, item) => {
  await updateDoc(
    doc(
      db,
      'allUsers',
      uid,
      collection,
      item.id
    ),
    { completed: !item.completed }
  );
};


export const handlePseudoDelete = async (id) => {
  await updateDoc(
    doc(db, 'allUsers', uid, 'userGoals', id),
    { deleted: true }
  );
};


export const handleDelete = async (collection, id) => {
  await deleteDoc(
    doc(db, 'allUsers', uid, collection, id)
  );
};

export const markFirstLoginFalse = async () => {
  await updateDoc(
    doc(db, 'allUsers', uid), {
      isFirstLogin: false,
      canIAddNewThing: true
    }
  );
  console.log('markFirstLoginFalse ran...')
};

export const addIsFirstLoginField = async () => {
  await updateDoc(
    doc(db, 'allUsers', uid), 
    { isFirstLogin: true }
  );
  console.log('DOES THIS KEEP RUNNING WTF')
};

export const hasLoggedInBefore = async () => {
  await updateDoc(
    doc(db, 'allUsers', uid), {
      hasLoggedInBefore: true,
    }
  );
  console.log('hasLoggedInBefore ran...')
};
