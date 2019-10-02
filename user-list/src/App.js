import React, { useState, useEffect } from 'react';
import { getUserList, updateUser, addNewUser, deleteUser } from './services/';

import UserDisplay from './components/UserDisplay';
import AddNewUser from './components/AddNewUser';

const App = () => {
  const [ userList, setUserList ] = useState([]);
  const [ showAddUser, setShowAddUser ] = useState(false);
  
  useEffect( () => {
    getUserList()
      .then( res => {
         res = res.sort( (a,b) => b.id - a.id );
        setUserList(res);
      });
  }, [])

  const refreshUserList = () => {
    getUserList().then( res => {
      res = res.sort( (a,b) => b.id - a.id );
      setUserList(res);
    });
  }

  const submitUpdate = userInfo => {
    updateUser(userInfo).then( res => res && refreshUserList() );
  }

  const toggleShowAddUser = () => {
    setShowAddUser(!showAddUser);
  }

  const submitAddNewUser = userInfo => {
    addNewUser(userInfo).then( res => res && refreshUserList() ).then( toggleShowAddUser() );
  }

  const deleteUserWithId = id => {
    deleteUser(id)
    .then( res => setUserList([
      ...userList.filter( item => item.id !== id )
    ]));
  }

  // console.log('userList', userList);

  if(userList.length === 0) {
    return (
      <div>Loading&hellip;</div>
    );
  };

  return (
    <div className="App">
      <h1>List of Users</h1>
      <div onClick={toggleShowAddUser} className="add-user">+ User</div>
      { showAddUser && (
        <AddNewUser toggleShowAddUser={toggleShowAddUser} submitAddNewUser={submitAddNewUser} />
      )}
      {
        userList.map( (item, i) => {
          return (
            <UserDisplay userInfo={item} submitUpdate={submitUpdate} deleteUserWithId={deleteUserWithId}  key={`user-${i.toString().padStart(2,'0')}`} />
          )
        })
      }
    </div>
  );
}

export default App;
