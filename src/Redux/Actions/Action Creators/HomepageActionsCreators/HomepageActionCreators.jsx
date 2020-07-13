import {
  FETCH_BOARD_DATA,
  FETCH_BOARD_DATA_SUCCESS,
  FETCH_BOARD_DATA_FAILURE,
} from "../../Action Constants/Homepage_Action_Constants/Homepage_Action_constants";
import axios from "axios";
let fetch_Board_Data = () => {
  return {
    type: FETCH_BOARD_DATA,
  };
};
let fetch_Board_Data_Success = boardName => {
  return {
    type: FETCH_BOARD_DATA_SUCCESS,
    payload: boardName,
  };
};
let fetch_Board_Data_Failure = err => {
  return {
    type: FETCH_BOARD_DATA_FAILURE,
    payload: err,
  };
};
let fetchData = () => {
  return dispatch => {
    dispatch(fetch_Board_Data);
    axios
      .get(`https://redux-pro-organizer-app.firebaseio.com/BoardData.json`)
      .then(res => {
        let boardData = res.data;
        dispatch(fetch_Board_Data_Success(boardData));
      })
      .catch(err => {
        let errormessage = err.message;
        alert(errormessage);
        dispatch(fetch_Board_Data_Failure(errormessage));
      });
  };
};

export {
  fetch_Board_Data,
  fetch_Board_Data_Success,
  fetch_Board_Data_Failure,
  fetchData,
};
