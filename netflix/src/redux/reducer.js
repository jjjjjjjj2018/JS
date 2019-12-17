const initState = {
    list: {},
    error: null,
    isLoading: false
}

const lists = (state = initState, action) => {
    switch (action.type) {
        case 'GET_START':
            return {
                ...state,
                isLoading: true
            };
        case 'GET_SUCCESS':
            return {
                ...state,
                list: action.data,
                isLoading: false
            };
        case 'GET_FAIL':
            return {
                ...state,
                error: action.error,
                isLoading: false
            };
        case 'REMOVE_START':
            return {
                ...state,
                isLoading: true
            };
        case 'REMOVE_SUCCESS':
            return {
                ...state,
                isLoading: false
            };
        case 'REMOVE_FAIL':
            return {
                ...state,
                error: action.error,
                isLoading: false
            };
        case 'ADD_START':
            return {
                ...state,
                isLoading: true
            };
        case 'ADD_SUCCESS':
            return {
                ...state,
                isLoading: false
            };
        case 'ADD_FAIL':
            return {
                ...state,
                error: action.error,
                isLoading: false
            };
        default:
            return state;
    }
}
export default lists;