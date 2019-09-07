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

//sort all soldiers
function sortAllStart() {
  return {
    type: 'SORT_ALL_START',
  };
}
function sortAllSuccess(response) {
  return {
    type: 'SORT_ALL_SUCCESS',
    data: response.data,
  };
}
function sortAllFail(error) {
  return {
    type: 'SORT_ALL_FAIL',
    error,
  };
}

//search term in all soldiers
function searchAllStart() {
  return {
    type: 'SEARCH_ALL_START',
  };
}
function searchAllSuccess(response) {
  return {
    type: 'SEARCH_ALL_SUCCESS',
    data: response.data,
  };
}
function searchAllFail(error) {
  return {
    type: 'SEARCH_ALL_FAIL',
    error,
  };
}


//get one soldier action
function getOneStart() {
  return {
    type: 'GET_ONE_START',
  };
}

function getOneSuccess(response) {
  return {
    type: 'GET_ONE_SUCCESS',
    data: response.data,
  };
}

function getOneFail(error) {
  return {
    type: 'GET_ONE_FAIL',
    error,
  };
}

//get possible parent of one soldier
function getAvailableParentStart() {
  return {
    type: 'GET_AVAILABLEPARENT_START',
  };
}

function getAvailableParentSuccess(response) {
  return {
    type: 'GET_AVAILABLEPARENT_SUCCESS',
    data: response.data,
  };
}

function getAvailableParentFail(error) {
  return {
    type: 'GET_AVAILABLEPARENT_FAIL',
    error,
  };
}

//get one soldier's direct children
function getDirectChildrenStart() {
  return {
    type: 'GET_DIRECT_CHILDREN_START',
  };
}

function getDirectChildrenSuccess(response) {
  return {
    type: 'GET_DIRECT_CHILDREN_SUCCESS',
    data: response.data,
  };
}

function getDirectChildrenFail(error) {
  return {
    type: 'GET_DIRECT_CHILDREN_FAIL',
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



export function getAll(page) {
  return (dispatch) => {
    dispatch(getAllStart());
    axios
      .get(`http://localhost:8080/soldiers/${page}`)
      .then(response => {
        dispatch(getAllSuccess(response));
      })
      .catch(err => {
        dispatch(getAllFail(err));
      });
  };
}


export function searchAll(search) {
  return (dispatch) => {
    dispatch(searchAllStart());
    axios
      .get(`http://localhost:8080/soldiers/search/${search}`)
      .then(response => {
        dispatch(searchAllSuccess(response));
      })
      .catch(err => {
        dispatch(searchAllFail(err));
      });
  };
}

export function sortAll(order, orderBy) {
  return (dispatch) => {
    let sort = '';
    dispatch(sortAllStart());
    sort = orderBy + order;
    axios
      .get(`http://localhost:8080/soldiers/sort/${sort}`)
      .then(response => {
        dispatch(sortAllSuccess(response));
      })
      .catch(err => {
        dispatch(sortAllFail(err));
      });
  };
}

export function getOne(id) {
  return (dispatch) => {
    dispatch(getOneStart());
    axios
      .get(`http://localhost:8080/soldiers/${id}`)
      .then(response => {
        dispatch(getOneSuccess(response));
      })
      .catch(err => {
        dispatch(getOneFail(err));
      });
  };
}

export function getAvailableParent(id) {
  return (dispatch) => {
    dispatch(getAvailableParentStart());
    axios
      .get(`http://localhost:8080/soldiers/${id}/availableParent`)
      .then(response => {
        dispatch(getAvailableParentSuccess(response));
      })
      .catch(err => {
        dispatch(getAvailableParentFail(err));
      });
  };
}

export function getDirectChildren(id) {
  return (dispatch) => {
    dispatch(getDirectChildrenStart());
    axios
      .get(`http://localhost:8080/soldiers/${id}/dirchildren`)
      .then(response => {
        dispatch(getDirectChildrenSuccess(response));
      })
      .catch(err => {
        dispatch(getDirectChildrenFail(err));
      });
  };
}

export function deleteSoldier(id) {
  return (dispatch) => {
    dispatch(deleteOneStart());
    axios
      .delete(`http://localhost:8080/soldiers/delete/${id}`)

      .then(dispatch(deleteOneSuccess()), dispatch(getAll(0)))

      .catch(err => {
        dispatch(deleteOneFail(err));
      });
  };
}

export function createSoldier(soldier, history) {
  return (dispatch) => {
    dispatch(createOneStart());
    axios
      .post('http://localhost:8080/soliers/create', soldier)
      .then(dispatch(createOneSuccess()))
      .then(history.push('/'))
      .catch(err => {
        dispatch(createOneFail(err));
      });
  };
}

export function editSoldier(id, soldier, history) {
  return (dispatch) => {
    dispatch(editOneStart());
    axios
      .post(`http://localhost:8080/soldiers/edit/${id}`, soldier)
      .then(dispatch(editOneSuccess()))
      .then(history.push('/'))
      .catch(err => {
        dispatch(editOneFail(err));
      });
  };

}