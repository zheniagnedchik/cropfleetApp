const SET_TEXT_HINT = 'SET_TEXT_HINT';

const defaultState = {
  textHint: false,
};

export default function hintsReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_TEXT_HINT:
      return {
        ...state,
        textHint: action.payload,
      };

    default:
      return state;
  }
}

export const setTextHint = (textHint) => ({
  type: SET_TEXT_HINT,
  payload: textHint,
});
