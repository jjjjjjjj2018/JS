import axios from 'axios';

//get all user action
function getAllStart() {
  return {
    type: 'GET_ALL_START',
  };
}

function getAllSuccess(response) {
  return {
    type: 'GET_ALL_SUCCESS',
    data: response.data,
  };
}

function getAllFail(error) {
  return {
    type: 'GET_ALL_FAIL',
    error,
  };
}

//delete one user action
function deleteOneStart() {
  return {
    type: 'DELETE_ONE_START',
  };
}
function deleteOneSuccess() {
  return {
    type: 'DELETE_ONE_SUCCESS'
  };
}
function deleteOneFail(error) {
  return {
    type: 'DELETE_ONE_FAIL',
    error,
  };
}

//create new user action
function createOneStart() {
  return {
    type: 'CREATE_ONE_START',
  };
}
function createOneSuccess() {
  return {
    type: 'CREATE_ONE_SUCCESS'
  };
}
function createOneFail(error) {
  return {
    type: 'CREATE_ONE_FAIL',
    error,
  };
}

//edit one user action
function editOneStart() {
  return {
    type: 'EDIT_ONE_START',
  };
}
function editOneSuccess() {
  return {
    type: 'EDIT_ONE_SUCCESS'
  };
}
function editOneFail(error) {
  return {
    type: 'EDIT_ONE_FAIL',
    error,
  };
}



export function getAll() {
  return (dispatch) => {
    dispatch(getAllStart());
    axios
      .get('http://localhost:8080/users')
      .then(response => {
        dispatch(getAllSuccess(response));
      })
      .catch(err => {
        dispatch(getAllFail(err));
      });
  };
}

export function deleteUser(id) {
  return (dispatch) => {
    dispatch(deleteOneStart());
    axios
      .delete(`http://localhost:8080/users/delete/${id}`)
      .then(dispatch(deleteOneSuccess()))
      .catch(err => {
        dispatch(deleteOneFail(err));
      });
  };
}

export function createUser(user) {
  return (dispatch) => {
    dispatch(createOneStart());
    axios
      .post('http://localhost:8080/users/create',user)
      .then(dispatch(createOneSuccess()))
      .catch(err => {
        dispatch(createOneFail(err));
      });
  };
}

export function editUser(id,user) {
  return (dispatch) => {
    dispatch(editOneStart());
    axios
      .post(`http://localhost:8080/users/edit/${id}`,user)
      .then(
        dispatch(editOneSuccess()))
      .catch(err => {
        dispatch(editOneFail(err));
      });
  };

}