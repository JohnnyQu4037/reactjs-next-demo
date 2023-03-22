import { message } from "antd";
import axios from "axios";

const baseURL = "http://cms.chtoma.com/api/";
var successRegEx = /^[1-2][0-9][0-9]$/;

const getToken = () => {
  return localStorage?.getItem("cms_token")
    ? JSON.parse(localStorage.getItem("cms_token")).token
    : null;
};

const errorHandler = (error) => {
  message.error("unknown error");
};

const deleteRequest = (path) => {
  return axios
    .delete(baseURL + path, {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch(errorHandler);
};

const putRequest = (path, data) => {
  return axios
    .put(
      baseURL + path,
      { ...data },
      {
        headers: {
          Authorization: "Bearer " + getToken(),
        },
      }
    )
    .then((res) => {
      return res.data;
    })
    .catch(errorHandler);
};

const postRequest = (path, data) => {
  return axios
    .post(
      baseURL + path,
      data,
      getToken()
        ? {
            headers: {
              Authorization: "Bearer " + getToken(),
            },
          }
        : null
    )
    .then((res) => {
      return res.data;
    })
    .catch(errorHandler);
};

const getRequest = (path) => {
  return axios
    .get(baseURL + path, {
      headers: {
        Authorization: "Bearer " + getToken(),
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch(errorHandler);
};

