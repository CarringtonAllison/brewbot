import { combineReducers, createStore } from 'redux';
import modal from "./modals/reducer";


const rootReducer = combineReducers({
    modal
});

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default store; 