import Homepage_Initial_State from "../Initial State/Homepage_Initial_State";
import {
  FETCH_BOARD_DATA,
  FETCH_BOARD_DATA_SUCCESS,
  FETCH_BOARD_DATA_FAILURE,
} from "../../Actions/Action Constants/Homepage_Action_Constants/Homepage_Action_constants";
let HomepageReducer = (state = Homepage_Initial_State, action) => {
  switch (action.type) {
    case FETCH_BOARD_DATA:
      return {
        ...state,
        loading: true,
      };
    case FETCH_BOARD_DATA_SUCCESS:
      return {
        loading: false,
        boardData: action.payload,
        error: "",
      };
    case FETCH_BOARD_DATA_FAILURE:
      return {
        loading: false,
        boardData: [],
        error: action.payload,
      };
    default:
      return state;
  }
};
export default HomepageReducer;
