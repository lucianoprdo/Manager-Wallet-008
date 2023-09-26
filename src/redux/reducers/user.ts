import { AnyAction } from 'redux';
import { SAVE_USER_EMAIL } from '../actions/userActions';

const INITIAL_STATE = {
  email: '',
  password: '',
};

const user = (
  state = INITIAL_STATE,
  userActions: AnyAction,
) => {
  switch (userActions.type) {
    case SAVE_USER_EMAIL:
      return {
        ...state,
        email: userActions.payload.email,
      };
    default:
      return state;
  }
};

export default user;
