// Inspired by https://daveceddia.com/multiple-environments-with-react/

let backendHost;
const hostname = window && window.location && window.location.hostname;
const port = process.env.JAVRATER_SERVER_BACKEND_PORT || "4000";

if (process.env.JAVRATER_SERVER_BACKEND_HOST) {
  backendHost = `${process.env.JAVRATER_SERVER_BACKEND_HOST}:${port}`;
} else if(/amazonaws.com$/.test(hostname)) {
  backendHost = `${hostname}:${port}`;
} else {
  backendHost = `localhost:${port}`;
}

export const API_ROOT = backendHost;
