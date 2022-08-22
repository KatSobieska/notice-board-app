import shortid from "shortid";
import axios from "axios";
import { API_URL } from "../config";

export const getAllAds = ({ ads }) => ads.data;
export const getRequest = ({ ads }) => ads.request;
// console.log("getAllAds", getAllAds);
export const getAdById = ({ ads }, adId) => ads.find((ad) => ad.id === adId);

const reducerName = "ads";
const createActionName = (name) => `app/${reducerName}/${name}`;

const ADD_AD = createActionName("ADD_AD");
const EDIT_AD = createActionName("EDIT_AD");
const REMOVE_AD = createActionName("REMOVE_AD");

const START_REQUEST = createActionName("START_REQUEST");
const END_REQUEST = createActionName("END_REQUEST");
const ERROR_REQUEST = createActionName("ERROR_REQUEST");

const LOAD_ADS = createActionName("LOAD_ADS");

export const addAd = (payload) => ({ type: ADD_AD, payload });
export const editAd = (payload) => ({ type: EDIT_AD, payload });
export const removeAd = (payload) => ({ type: REMOVE_AD, payload });

export const startRequest = () => ({ type: START_REQUEST });
export const endRequest = () => ({ type: END_REQUEST });
export const errorRequest = (error) => ({ error, type: ERROR_REQUEST });

export const loadAds = (payload) => ({ type: LOAD_ADS, payload });

export const loadAdsRequest = () => {
  return async (dispatch) => {
    dispatch(startRequest());
    try {
      let res = await axios.get(`${API_URL}api/ads`);
      dispatch(loadAds(res.data));
      dispatch(endRequest());
    } catch (e) {
      dispatch(errorRequest(e.message));
    }
  };
};

export const createAd = (ad) => async (dispatch) => {
  dispatch(startRequest());
  try {
    const response = await fetch(`${API_URL}api/ads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ad),
    });
    const newAdvert = await response.json();
    dispatch(loadAds(newAdvert));
  } catch (error) {
    dispatch(errorRequest(error));
  } finally {
    dispatch(endRequest());
  }
};

const initialState = {
  data: [],
  request: {
    pending: false,
    error: null,
    success: null,
  },
};

const adsReducer = (statePart = initialState, action) => {
  switch (action.type) {
    case ADD_AD:
      return [...statePart, { ...action.payload, id: shortid() }];
    case EDIT_AD:
      return statePart.map((ad) =>
        ad.id === action.payload.id ? { ...ad, ...action.payload } : ad
      );
    case REMOVE_AD:
      return statePart.filter((ad) => ad.id !== action.payload);
    default:
      return statePart;
  }
};

export default adsReducer;
