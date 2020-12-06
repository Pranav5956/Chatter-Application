import * as AUTH_TYPES from "../types/auth";
import { firebaseAuth, firebaseAuthInSession } from "../../firebase";

export const setUserLoadingAction = () => {
  return { type: AUTH_TYPES.LOAD_USER };
};

export const loadUserAction = () => (dispatch) => {
  dispatch(setUserLoadingAction());

  const user = firebaseAuth.currentUser;
  if (user)
    dispatch({
      type: AUTH_TYPES.AUTH_SUCCESS,
      payload: { email: user.email },
    });
  else dispatch({ type: AUTH_TYPES.AUTH_FAILURE });
};

// SIGN UP
export const signUpUserWithEmailAction = (email, password) => (dispatch) => {
  dispatch(setUserLoadingAction());

  firebaseAuthInSession
    .then(() => firebaseAuth.createUserWithEmailAndPassword(email, password))
    .then((user) =>
      dispatch({
        type: AUTH_TYPES.SIGNUP_SUCCESS,
        payload: { email: user.email },
      })
    )
    .catch((err) => {
      console.log(err);
      dispatch({ type: AUTH_TYPES.SIGNUP_FAILURE });
    });
};

// SIGN IN
export const signInUserWithEmailAction = (email, password) => (dispatch) => {
  dispatch(setUserLoadingAction());

  firebaseAuthInSession
    .then(() => firebaseAuth.signInWithEmailAndPassword(email, password))
    .then((user) =>
      dispatch({
        type: AUTH_TYPES.SIGNIN_SUCCESS,
        payload: { email: user.email },
      })
    )
    .catch((err) => {
      console.log(err);
      dispatch({ type: AUTH_TYPES.SIGNIN_FAILURE });
    });
};

// SIGN OUT
export const signOutUserAction = () => (dispatch) => {
  dispatch(setUserLoadingAction());

  firebaseAuth
    .signOut()
    .then(() => dispatch({ type: AUTH_TYPES.SIGNOUT_USER }));
};
