export function removeFromList(id) {
    return {
        type: 'REMOVE_ITEM',
        id: id
    }
}
export function moveToMyList(id) {
    return {
        type: 'MOVE_TO_LIST',
        id: id
    }
}