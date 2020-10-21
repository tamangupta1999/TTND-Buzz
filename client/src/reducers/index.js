import { combineReducers } from 'redux';
import LoginReducer from './login';
import BuzzReducer from './buzz';
import ComplaintReducer from './complaint';
import AdminComplaintReducer from './adminComplaint';



const rootReducer = combineReducers({
    login: LoginReducer,
    buzz: BuzzReducer,
    complaint: ComplaintReducer,
    adminComplaint: AdminComplaintReducer
})

export default rootReducer;