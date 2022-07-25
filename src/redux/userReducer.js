export const SERVER_REQ_SEND = 'SERVER_REQ_SEND';
export const SERVER_REQ_GET = 'SERVER_REQ_GET';
const defaultState = {
  isLogin: false,
  info: null,
  req: false,
};

export default function userReducer(state = defaultState, action) {
  switch (action.type) {
    case 'USER_LOGIN':
      return {
        ...state,
        isLogin: true,
        info: action.payload,
      };
    case 'USER_LOGOUT':
      return { ...state, isLogin: false };
    case SERVER_REQ_SEND:
      return { ...state, req: false };
    case SERVER_REQ_GET:
      return { ...state, req: true };
    default:
      return state;
  }
}
