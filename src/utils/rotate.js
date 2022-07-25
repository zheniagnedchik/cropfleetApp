import { setRoutes } from '../redux/PointsReducer';
import { createLine } from './createRoutes';

export const dataMission = async (markerPoints, rotate, dispatch) => {
  const polylines = await createLine(markerPoints, rotate);
  await dispatch(setRoutes(polylines));
};
