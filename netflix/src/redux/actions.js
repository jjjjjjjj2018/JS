export const removeFromList = (id) => {
    return {
        type: 'REMOVE_ITEM',
        id
    }
}
export const moveToMyList = (id) => {
    return {
        type: 'MOVE_TO_LIST',
        id
    }
}