import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import hintsReducer from './hintsReducer';
import pointReducer from './PointsReducer';
import userReducer from './userReducer';
import showScreenAddField from './showScreenAddField';
import sliceReducer from './slice';

const rootReducer = combineReducers({
  user: userReducer,
  hints: hintsReducer,
  points: pointReducer,
  showScreenAddField: showScreenAddField,
  slice: sliceReducer,
});

export const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
