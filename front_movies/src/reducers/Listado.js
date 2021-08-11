const initialState = {
    listado: []
}
const Listado = (state = initialState, action) => {
    switch (action.type) {
        case "GET_LISTADO":
            return {
                ...state,
                listado: action.value
            }
        default:
            return state
    }
}
export default Listado