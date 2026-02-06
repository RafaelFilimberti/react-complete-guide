//import { useState } from 'react';
import classes from './NewPost.module.css';
//em JavaScript
//document.querySelector('textarea').addEventListener('change', function () {});

function NewPost({ onBodyChange, onAuthorChange, onCancel }) {
  // const [ enteredBody, setEnteredBody ] = useState('');
  // //stateData[0] //current value
  // //stateData[1] //state update function

  // function changeBodyHandler(event) {
  //   setEnteredBody(event.target.value);  
  // }


  return (
    <form className={classes.form}>
      <p>
        <label htmlFor="body">Text</label>
        <textarea id="body" required rows={3} onChange={onBodyChange} />
      </p>
      <p>
        <label htmlFor="name">Your name</label>
        <input type="text" id="name" required onChange={onAuthorChange} />
      </p>
      <p className={classes.actions}>
        <button type='button' onClick={onCancel}>Cancel</button>
        <button>Submit</button>
      </p>
    </form>
  );
}

export default NewPost;