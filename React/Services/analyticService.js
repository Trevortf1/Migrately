import axios from "axios"
import {
  onGlobalError,
  onGlobalSuccess,
  API_HOST_PREFIX,
} from "./serviceHelpers";

const endpoint = { analyticUrl: `${API_HOST_PREFIX}/api/analytic` };
const getBasicAnalytics = (payload) => {
  const config = {
    method: "POST",
    url: `${endpoint.analyticUrl}/basic`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
const searchAnalyitcs = (payload) => {
  const config = {
    method: "POST",
    url: `${endpoint.analyticUrl}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const searchPageView = (payload) => {
  const config = {
    method: "POST",
    url: `${endpoint.analyticUrl}/pageview`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const searchUserAction = (payload) => {
  const config = {
    method: "POST",
    url: `${endpoint.analyticUrl}/useraction`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
const analyticService = {
  getBasicAnalytics,
  searchAnalyitcs,
  searchPageView,
  searchUserAction,
};
export default analyticService;
