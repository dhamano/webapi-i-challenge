import React, { useState } from 'react';


const UserDisplay = props => {
  const [ name, setUserName ] = useState('');
  const [ bio, setBio ] = useState('');

  const addUsername = event => {
    setUserName(event.target.value);
  }

  const addBio = event => {
    setBio(event.target.value);
  }

  const submitAddNewUser = event => {
    event.preventDefault();
    props.submitAddNewUser({ name, bio });
  }

  return(
    <div className="user-card new show">
        <form onSubmit={submitAddNewUser}>
          <h2>Add New User</h2>
          <input onChange={addUsername} value={name} placeholder="username" required />
          <textarea onChange={addBio} value={bio} placeholder="enter user bio here" required></textarea>
          <button type="submit">save</button>
          <button type="button" onClick={() => props.toggleShowAddUser()}>cancel</button>
        </form>
    </div>
  )
}

export default UserDisplay;