const SET_SLICE = 'SET_SLICE';
const SET_SLICE_POLYGONS = 'SET_SLICE_POLYGONS';

const defaultState = {
  slice: false,
  slicePolygons: false,
};

export default function sliceReducer(state = defaultState, action) {
  switch (action.type) {
    case SET_SLICE:
      return {
        ...state,
        slice: action.payload,
      };
    case SET_SLICE_POLYGONS:
      return {
        ...state,
        slicePolygons: action.payload,
      };

    default:
      return state;
  }
}

export const setSlice = (slice) => ({
  type: SET_SLICE,
  payload: slice,
});
export const setSlicePolygons = (slicePolygons) => ({
  type: SET_SLICE_POLYGONS,
  payload: slicePolygons,
});
