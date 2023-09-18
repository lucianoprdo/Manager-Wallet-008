import { AnyAction } from 'redux';
import { SAVE_USER_EMAIL } from '../actions/userActions';

const INITIAL_STATE = {
  email: 'alguem@email.com',
  password: '',
};

const userReducer = (
  state = INITIAL_STATE,
  { type, payload }: AnyAction,
) => {
  switch (type) {
    case SAVE_USER_EMAIL:
      return {
        ...state,
        ...payload.email,
      };
    default:
      return state;
  }
};

export default userReducer;
