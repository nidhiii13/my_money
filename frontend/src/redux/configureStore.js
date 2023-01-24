import {createStore,combineReducers} from 'redux';
import userReducer from './ducks/user';

const rootReducer = combineReducers({
    //reducers
    userReducer,
});

const store = createStore(rootReducer);

export default store;