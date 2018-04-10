/* eslint-disable no-console */
const getGenres = (cb) => {
  return fetch("/api/v1/genre/all", {
    method: "get",
    accept: "application/json",
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb)
    .catch(error => console.log(error.message));
};

const getRatings = (cb) => {
  return fetch("/api/v1/rating/all", {
    method: "get",
    accept: "application/json",
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb)
    .catch(error => console.log(error.message));
};

const getTags = (cb) => {
  return fetch("/api/v1/tag/all", {
    method: "get",
    accept: "application/json",
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb)
    .catch(error => console.log(error.message));
};

const getMovie = (cb) => {
  return fetch("/api/v1/movie/all", {
    method: "get",
    accept: "application/json",
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb)
    .catch(error => console.log(error.message));
};

const postMovie = (payload, cb) => {
  return fetch("/api/v1/movie/add", {
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
    method: "post",
    body: JSON.stringify(payload),
  }).then(checkStatus)
    .then(parseJSON)
    .then(cb)
    .catch(error => console.log(error.message));
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error);
    throw error;
  }
};

const parseJSON = (response) => {
  return response.json();
};

const client = { getGenres, getRatings, getTags, getMovie, postMovie };
export default client;