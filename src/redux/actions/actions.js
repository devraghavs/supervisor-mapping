import * as types from "./actionTypes";
export const loadSupervisorsStart = () => ({
  type: types.LOAD_SUPERVISORS_START,
});
export const loadSupervisorsSuccess = (supervisor) => ({
  type: types.LOAD_SUPERVISORS_SUCCESS,
  payload: supervisor,
});
export const loadSupervisorsError = (error) => ({
  type: types.LOAD_SUPERVISORS_ERROR,
  payload: error,
});
export const selectedSupervisees = (selectedSupervisee) => {
  return {
  type: types.SELECTED_SUPERVISEES,
  payload: selectedSupervisee,
}};

export const reciverArrayAction = (reciverArray) => {
  return {
  type: types.RECIVER_ARRAY,
  payload: reciverArray,
}};

export const transferArrayAction=(transferArray)=>{
  return {
    type:types.TRANSFER_ARRAY,
    payload: transferArray

  }
}

export const senderAction=(senderData)=>{
  return{
    type:types.SENDER_DETAIL,
    payload: senderData
  }
}
