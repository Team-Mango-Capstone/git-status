import { db } from './Firebase';
import {
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

const uid =  window.localStorage.getItem('uid');

export const handleEditDesc = async (goal, description) => {
  await updateDoc(
    doc(
      db,
      'allUsers',
      uid,
      'userGoals',
      goal.id
    ),
    { description: description }
  ); 
};

export const handleEditDeadline = async (goal, deadline) => {
  await updateDoc(
    doc(
      db,
      'allUsers',
      uid,
      'userGoals',
      goal.id
    ),
    { deadline: deadline }
  );
};
export const toggleComplete = async (goal) => {
  await updateDoc(
    doc(
      db,
      'allUsers',
      uid,
      'userGoals',
      goal.id
    ),
    { completed: !goal.completed }
  );
};
export const handleDelete = async (id) => {
  await deleteDoc(
    doc(db, 'allUsers', uid, 'userGoals', id)
  );
};

