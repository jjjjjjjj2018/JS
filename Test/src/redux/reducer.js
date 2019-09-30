const initState = { num: 10 }
const number = (state = initState, action) => {
    switch (action.type) {
        case 'ADD_ONE':
            return {
                ...state,
                num: state.num + 1
            };
        case 'MIN_ONE':
            return {
                ...state,
                num: state.num - 1
            };
        default:
            return state;
    }
}
export default number;