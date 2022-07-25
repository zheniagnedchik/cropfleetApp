const SET_POINT = 'SET_POINT';
const MOVING_POINT = 'MOVING_POINT';
const SET_MY_FIELD_POINTS = 'SET_MY_FIELD_POINTS';
const SET_SMALL_MAP = 'SET_SMALL_MAP';
const SET_ROUTES = 'SET_ROUTES';
const SET_ROTATE = 'SET_ROTATE';
const SET_NEW_ROUTES = 'SET_NEW_ROUTES';

const defaultState = {
  point: [],
  myField: false,
  smallMap: false,
  routes: [],
  rotate: '1',
  newRoutes: [],
};

export default function pointReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_POINT:
      return {
        ...state,
        point: [...state.point, action.payload],
      };
    case MOVING_POINT:
      return {
        ...state,
        point: action.payload,
      };
    case SET_MY_FIELD_POINTS:
      return {
        ...state,
        myField: action.payload,
      };
    case SET_SMALL_MAP:
      return {
        ...state,
        smallMap: action.payload,
      };
    case SET_ROUTES:
      return {
        ...state,
        routes: action.payload,
      };
    case SET_ROTATE:
      return {
        ...state,
        rotate: action.payload,
      };
    case SET_NEW_ROUTES:
      return {
        ...state,
        newRoutes: action.payload,
      };

    default:
      return state;
  }
}

export const setPoint = (point) => ({
  type: SET_POINT,
  payload: point,
});
export const movingPoint = (point) => ({
  type: MOVING_POINT,
  payload: point,
});
export const setMyFieldPoints = (points) => ({
  type: SET_MY_FIELD_POINTS,
  payload: points,
});
export const setSmallMap = (map) => ({
  type: SET_SMALL_MAP,
  payload: map,
});
export const setRoutes = (routes) => ({
  type: SET_ROUTES,
  payload: routes,
});
export const setRotate = (rotate) => ({
  type: SET_ROTATE,
  payload: rotate,
});
export const setNewRoutes = (newroutes) => ({
  type: SET_NEW_ROUTES,
  payload: newroutes,
});
