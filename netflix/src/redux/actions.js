import axios from 'axios';
//get all list items action
const getStart = () => {
    return {
        type: 'GET_START',
    };
}

const getSuccess = (response) => {
    return {
        type: 'GET_SUCCESS',
        data: response.data,
    };
}

const getFail = (error) => {
    return {
        type: 'GET_FAIL',
        error,
    };
}

//remove from mylist to recommendations actions
const removeStart = (id) => {
    return {
        type: 'REMOVE_START'
    }
}

const removeSuccess = (response) => {
    return {
        type: 'REMOVE_SUCCESS'
    };
}

const removeFail = (error) => {
    return {
        type: 'REMOVE_FAIL',
        error,
    };
}

//add recommendations to mylist actions
const addStart = () => {
    return {
        type: 'ADD_START'
    }
}
const addSuccess = (response) => {
    return {
        type: 'ADD_SUCCESS'
    };
}

const addFail = (error) => {
    return {
        type: 'ADD_FAIL',
        error,
    };
}

export const getAll = () => {
    return (dispatch) => {
        dispatch(getStart());
        axios
            .get(`http://localhost:8080/lists`)
            .then(response => {
                dispatch(getSuccess(response));
                console.log(response.data)
            })
            .catch(err => {
                dispatch(getFail(err));
            });
    };
}

export const removeFromList = (id) => {
    return (dispatch) => {
        dispatch(removeStart());
        axios
            .put(`http://localhost:8080/lists/remove/${id}`)
            .then(() => {
                dispatch(removeSuccess());
                dispatch(getAll());
            })
            .catch(err => {
                dispatch(removeFail(err));
            });
    };
}

export const moveToMyList = (id) => {
    return (dispatch) => {
        dispatch(addStart());
        axios
            .put(`http://localhost:8080/lists/add/${id}`)
            .then(() => {
                dispatch(addSuccess());
                dispatch(getAll());
            })
            .catch(err => {
                dispatch(addFail(err));
            });
    };
}




