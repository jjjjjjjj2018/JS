const initState = {
    isLoading: false,
    list: [],
    error: null
};
const userList = (state = initState, action) => {
    switch (action.type) {
        case "GET_ALL_START":
            return {
                ...state,
                isLoading: true
            };
        case "GET_ALL_SUCCESS":
            return {
                ...state,
                isLoading: false,
                list: action.data,
                error: null
            };
        case "GET_ALL_FAIL":
            return {
                ...state,
                isLoading: false,
                error: action.err
            };
        case "GET_ONE_START":
            return {
                ...state,
                isLoading: true
            };
        case "GET_ONE_SUCCESS":
            return {
                ...state,
                isLoading: false,
                list: action.data,
                error: null
            };
        case "GET_ONE_FAIL":
            return {
                ...state,
                isLoading: false,
                error: action.err
            };
        case "DELETE_ONE_START":
            return {
                ...state,
                isLoading: true,
            };
        case "DELETE_ONE_SUCCESS":
            return {
                ...state,
                isLoading: false,
                error: null
            };
        case "DELETE_ONE_FAIL":
            return {
                ...state,
                isLoading: false,
                error: action.err
            };
        case "CREATE_ONE_START":
            return {
                ...state,
                isLoading: true
            };
        case "CREATE_ONE_SUCCESS":
            return {
                ...state,
                isLoading: false,
                error: null
            };
        case "CREATE_ONE_FAIL":
            return {
                ...state,
                isLoading: false,
                error: action.err
            };
        case "EDIT_ONE_START":
            return {
                ...state,
                isLoading: true
            };
        case "EDIT_ONE_SUCCESS":
            return {
                ...state,
                isLoading: false,
                error: null
            };
        case "EDIT_ONE_FAIL":
            return {
                ...state,
                isLoading: false,
                error: action.err
            };
        default:
            return state;
    }
};

export default userList;
