import React, { useState, useEffect } from 'react';

const UserDisplay = props => {
  const [ isEditing, setIsEditing ] = useState(false);
  const [ name, setUserName ] = useState(props.userInfo.name);
  const [ bio, setBio ] = useState(props.userInfo.bio);
 
  useEffect( () => {
    resetForm();
  }, [props])

  const resetForm = () => {
    setUserName(props.userInfo.name);
    setBio(props.userInfo.bio);
  }

  const changeEdit = () => {
    setIsEditing(!isEditing);
    resetForm();
  }

  const updateUsername = event => {
    setUserName(event.target.value);
  }

  const updateBio = event => {
    setBio(event.target.value);
  }

  const submitUpdate = event => {
    event.preventDefault();
    props.submitUpdate({ name, bio, id: props.userInfo.id });
    changeEdit();
  }

  const deleteThisUser = () => {
    changeEdit();
    props.deleteUserWithId(props.userInfo.id);
  }

  // console.log('display users', props);

  return(
    <div className="user-card" key={`user-${props.userInfo.id.toString().padStart(2,'0')}`}>
      <span className="edit" onClick={changeEdit}>{isEditing ? 'cancel' : 'edit' }</span>
      {isEditing ? (
        <form onSubmit={submitUpdate}>
          <h2><input onChange={updateUsername} value={name} placeholder="username" /></h2>
          <textarea onChange={updateBio} value={bio} placeholder="enter user bio here"></textarea>
          <dl>
            <dt>Created:</dt>
            <dd>{props.userInfo.created_at}</dd>
            <dt>Last Updated:</dt>
            <dd>{props.userInfo.updated_at}</dd>
          </dl>
          <button type="submit">save</button>
          <button type="button" onClick={deleteThisUser}>delete</button>
        </form>
      ) : (
        <>
          <h2>{props.userInfo.name}</h2>
          <p>{props.userInfo.bio}</p>
          <dl>
            <dt>Created:</dt>
            <dd>{props.userInfo.created_at}</dd>
            <dt>Last Updated:</dt>
            <dd>{props.userInfo.updated_at}</dd>
          </dl>
        </>
      )
      }
    </div>
  )
}

export default UserDisplay;