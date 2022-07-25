const SET_SHOW_SCREEN = 'SET_SHOW_SCREEN';

const defaultState = {
  showScreen: false,
};

export default function showScreenAddField(state = defaultState, action) {
  switch (action.type) {
    case SET_SHOW_SCREEN:
      return {
        ...state,
        showScreen: action.payload,
      };

    default:
      return state;
  }
}

export const setShowScreen = (showScreen, navigator) => {
  if (navigator != null) {
    navigator(`?page=${showScreen}`);
  }
  return {
    type: SET_SHOW_SCREEN,
    payload: showScreen,
  };
};
