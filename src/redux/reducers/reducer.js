import * as types from "../actions/actionTypes";
const INIT_STATE = {
  supervisor: [],
  loading: false,
  error: null,
};

const supervisorReducer = (state = INIT_STATE, action) => {
  console.log(action.type);
  switch (action.type) {
    case types.LOAD_SUPERVISORS_START:
      return {
        ...state,
        loading: true,
      };
    case types.LOAD_SUPERVISORS_SUCCESS:
      return {
        ...state,
        loading: false,
        supervisor: action.payload,
      };
    case types.LOAD_SUPERVISORS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default supervisorReducer;

const intialState = {
  showSelected: [],
};

export const selectedSupervisesReducer = (state = intialState, action) => {
  switch (action.type) {
    case types.SELECTED_SUPERVISEES:
      return {
        showSelected: action.payload,
      };
    default:
      return state;
  }
};

const reciverIntialState = {
  reciverArray: [],
};

export const selectedReciverReducer = (state = reciverIntialState,{ type, payload }) => {
  switch (type) {
    case types.RECIVER_ARRAY:
      return {
        reciverArray: payload,
      };
    default:
      return state;
  }
};

const transferIntialState={
  transferArray:[],
}
export const transferArrayReducer = (state = transferIntialState,{ type, payload }) => {
  switch (type) {
    case types.TRANSFER_ARRAY:
      return {
        transferArray: payload,
      };
    default:
      return state;
  }
};

const senderIntialState={
  
}

export const senderReducer=(state=senderIntialState,{type,payload})=>{
  switch (type) {
    case types.SENDER_DETAIL:
      return payload
    default:
      return state;
  }
}