import { fetch } from "../../common/fetch";

export const REQUEST_ACCOMMODATIONS = "REQUEST_ACCOMMODATIONS";
export const RECEIVED_ACCOMMODATIONS = "RECEIVED_ACCOMMODATIONS";
export const CREATING_ACCOMMODATION = "CREATING_ACCOMMODATION";
export const CREATED_ACCOMMODATION = "CREATED_ACCOMMODATION";
export const ERROR_ACCOMMODATION = "ERROR_ACCOMMODATION";

export const getAllAccommodations = () => {
  return async dispatch => {
    dispatch({ type: REQUEST_ACCOMMODATIONS });

    const result = await fetch("accommodations");

    if (!result) {
      dispatch({ type: ERROR_ACCOMMODATION });
    } else {
      dispatch({ type: RECEIVED_ACCOMMODATIONS, payload: result });
    }
  };
};

export const createAccommodation = accommodation => {
  return async dispatch => {
    dispatch({ type: CREATING_ACCOMMODATION });

    const result = await fetch("accommodations", { method: "POST", body: accommodation });

    if (!result) {
      dispatch({ type: ERROR_ACCOMMODATION });
    } else {
      dispatch({ type: CREATED_ACCOMMODATION, payload: result });
    }
  };
};
