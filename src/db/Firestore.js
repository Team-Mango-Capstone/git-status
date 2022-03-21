import { db } from './Firebase';
import {
  query,
  collection,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

export const handleEditDesc = async (goal, description) => {
  await updateDoc(
    doc(
      db,
      'allUsers',
      window.localStorage.getItem('uid'),
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
      window.localStorage.getItem('uid'),
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
      window.localStorage.getItem('uid'),
      'userGoals',
      goal.id
    ),
    { completed: !goal.completed }
  );
};
export const handleDelete = async (id) => {
  await deleteDoc(
    doc(db, 'allUsers', window.localStorage.getItem('uid'), 'userGoals', id)
  );
};

//queries and fetches goals from user currently logged in 
export const q = query(collection(db,"allUsers", window.localStorage.getItem('uid'), 'userGoals')
);


