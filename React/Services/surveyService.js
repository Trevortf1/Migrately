import axios from "axios";
import {
  onGlobalSuccess,
  onGlobalError,
  API_HOST_PREFIX,
} from "./serviceHelpers";

const endpoint = { surveyUrl: `${API_HOST_PREFIX}/api/surveys` };

const getSurveyPaginated = (pageIndex, pageSize) => {
  const config = {
    method: "GET",
    url: `${endpoint.surveyUrl}/paginate?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
const getSurveyById = (id) => {
  const config = {
    method: "GET",
    url: `${endpoint.surveyUrl}/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
const addSurvey = (payload) => {
  const config = {
    method: "POST",
    url: `${endpoint.surveyUrl}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
const updateSurvey = (payload, id) => {
  const config = {
    method: "PUT",
    url: `${endpoint.surveyUrl}/${id}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
const deleteSurvey = (id) => {
  const config = {
    method: "DELETE",
    url: `${endpoint.surveyUrl}/delete/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
const getAllSurveyRequirments = () => {
  const config = {
    method: "GET",
    url: `${endpoint.surveyUrl}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
const addSurveyRequirement = (payload) => {
  const config = {
    method: "POST",
    url: `${endpoint.surveyUrl}/addrequirement`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
const updateSurveyRequirement = (payload, id) => {
  const config = {
    method: "PUT",
    url: `${endpoint.surveyUrl}/requirement/${id}`,
    data: payload,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
const deleteSurveyRequirement = (id) => {
  const config = {
    method: "DELETE",
    url: `${endpoint.surveyUrl}/requirement/${id}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" },
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};
const surveyService = {
  getSurveyPaginated,
  getSurveyById,
  addSurvey,
  updateSurvey,
  deleteSurvey,
  getAllSurveyRequirments,
  addSurveyRequirement,
  updateSurveyRequirement,
  deleteSurveyRequirement,
};
export default surveyService;
