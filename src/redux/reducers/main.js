import { combineReducers } from "redux";
import supervisorReducer, {
  selectedSupervisesReducer,
  selectedReciverReducer,
  transferArrayReducer,
  senderReducer,
} from "./reducer";

const rootreducer = combineReducers({
  data: supervisorReducer,
  selectedSupervisees: selectedSupervisesReducer,
  selectedReciver: selectedReciverReducer,
  transferArray: transferArrayReducer,
  senderObject:senderReducer
});

export default rootreducer;
