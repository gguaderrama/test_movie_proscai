import { combineReducers } from 'redux'
import Listado from './Listado'
const allReducers = combineReducers({
    listado: Listado,
});
export default allReducers;