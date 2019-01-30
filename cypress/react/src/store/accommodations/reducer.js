import {
  RECEIVED_ACCOMMODATIONS,
  REQUEST_ACCOMMODATIONS,
  CREATED_ACCOMMODATION,
  ERROR_ACCOMMODATION,
  CREATING_ACCOMMODATION,
} from "./actions";

export const accommodationsReducer = (state = [], action = {}) => {
  switch (action.type) {
    case REQUEST_ACCOMMODATIONS:
      return state;
    case RECEIVED_ACCOMMODATIONS:
      return [...action.payload];
    case CREATING_ACCOMMODATION:
      return state;
    case CREATED_ACCOMMODATION:
      return [...state, action.payload];
    case ERROR_ACCOMMODATION:
      return state;
    default:
      return state;
  }
};
