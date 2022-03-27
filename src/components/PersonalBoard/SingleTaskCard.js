import React, {useState} from 'react'

function SingleTaskCard({ task, toggleComplete, handleDelete, handleEditDesc, handleEditDeadline }) {
    const [newTitle, setNewTitle] = useState(task.title);

    // const handleChangeDesc = (e) => {
    //     e.preventDefault();
    //     if (task.completed === true) {
    //       setNewDescription(goal.description);
    //     } else {
    //       goal.description = '';
    //       setNewDescription(e.target.value);
    //     }
    //   };
    
 
  return (
        <div className='single-goal-card'>
          <input className='goal-input'
            style={{ textDecoration: task.completed && 'line-through' }}
            type='text'
            value={task.title === '' ? newTitle : task.title}
            // onChange={(e) => {
            //   handleChangeDesc(e)
            // }}
          />

          <button className='button-complete' onClick={() => toggleComplete(task)}>
           complete
          </button>
    
          <button
            className='button-edit'
            // onClick={() => {
            //   handleEditDesc(goal, newDescription)
            // }}
          >
           edit
          </button>
    
          <button className='button-delete' onClick={() =>handleDelete(task.id)}>
             delete
          </button>
        </div>
  )
}

export default SingleTaskCard