import changeTheNumber  from "./upDown";
import fetchThings from "./fetchData";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
    changeTheNumber,
    fetchThings
});

export default rootReducer;