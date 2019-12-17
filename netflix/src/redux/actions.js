
//get all list action
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

const removeStart = (id) => {
    return {
        type: 'REMOVE_START',
        id
    }
}

const removeSuccess = (response) => {
    return {
        type: 'REMOVE_SUCCESS',
        data: response.data,
    };
}

const removeFail = (error) => {
    return {
        type: 'REMOVE_FAIL',
        error,
    };
}

const addStart = () => {
    return {
        type: 'ADD_START',
        id
    }
}
const addSuccess = (response) => {
    return {
        type: 'ADD_SUCCESS',
        data: response.data,
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
            .get('http://localhost:8080/lists')
            .then(response => {
                dispatch(getSuccess(response));
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
            .get(`http://localhost:8080/lists/remove/${id}`)
            .then(response => {
                dispatch(removeSuccess(response));
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
            .get(`http://localhost:8080/lists/add/${id}`)
            .then(response => {
                dispatch(addSuccess(response));
            })
            .catch(err => {
                dispatch(addFail(err));
            });
    };
}




