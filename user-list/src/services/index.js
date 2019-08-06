import axios from 'axios';

const hostURL ="//localhost:8000/api"

export const getUserList = () => {
  return axios.get(`${hostURL}/users`)
    .then( res => {
      // console.log('get user list',res);
      return res.data;
    })
    .catch( err => {
      console.log('get user list error',err);
    })
};

export const updateUser = (userInfo) => {
  return axios.put(`${hostURL}/users/${userInfo.id}`, userInfo)
    .then( res => {
      // console.log('update',res.data);
      return res.data;
    })
    .catch( err => {
      console.log('update error', err);
    })
}

export const addNewUser = (userInfo) => {
  return axios.post(`${hostURL}/users/`, userInfo)
    .then( res => {
      // console.log('add new',res.data);
      return res.data;
    })
    .catch( err => {
      console.log('add error', err.response.data.message);
    })
}

export const deleteUser = (id) => {
  return axios.delete(`${hostURL}/users/${id}`)
    .then( res => {
      // console.log('delete user',res.data);
      return true;
    })
    .catch( err => {
      console.log('delete error', err);
    })
}