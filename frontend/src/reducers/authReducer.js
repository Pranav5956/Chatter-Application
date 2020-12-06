import * as AUTH_TYPES from "../actions/types/auth";

const initialState = {
  user: null,
  isLoading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_TYPES.LOAD_USER:
      return {
        ...state,
        isLoading: true,
      };

    case AUTH_TYPES.AUTH_SUCCESS:
    case AUTH_TYPES.SIGNIN_SUCCESS:
    case AUTH_TYPES.SIGNUP_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      };

    case AUTH_TYPES.AUTH_FAILURE:
    case AUTH_TYPES.SIGNIN_FAILURE:
    case AUTH_TYPES.SIGNUP_FAILURE:
    case AUTH_TYPES.SIGNOUT_USER:
      return {
        ...state,
        user: null,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default reducer;
