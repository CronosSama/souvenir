import { combineReducers } from "redux";
import donations from "./donations_reducer"
import user from "./user_reducer"

export default combineReducers({
  donations,
  user
})



