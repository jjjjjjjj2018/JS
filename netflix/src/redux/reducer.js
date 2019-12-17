const initState = {
    mylist: [],
    recommendations: []
}

const list = (state = initState, action) => {
    switch (action.type) {
        case 'REMOVE_ITEM':
            return {
                ...state,
                recommendations: [...state.recommendations, state.mylist.find(({ id }) => id === action.id)],
                mylist: state.mylist.filter(item => item.id !== action.id)
            };
        case 'MOVE_TO_LIST':
            return {
                ...state,
                mylist: [...state.mylist, state.recommendations.find(({ id }) => id === action.id)],
                recommendations: state.recommendations.filter(item => item.id !== action.id)
            };
        default:
            return state;
    }
}
export default list;