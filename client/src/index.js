import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { split } from "apollo-client-preset";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "semantic-ui-css/semantic.min.css";

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import utils from "./utils";
import { API_ROOT } from "./api-config";

const grabToken = () => {
  try {
    token = utils.getToken();
    return token;
  } catch (error) {
    console.log(error.message);
  }
  return null;
};

let token = grabToken();

// Idea taken from:
// https://blog.beeaweso.me/refreshing-token-based-authentication-with-apollo-client-2-0-7d45c20dc703
// https://github.com/apollographql/apollo-link/tree/master/packages/apollo-link-http#custom-fetching
const customFetch = (uri, options) => {
  const initialRequest = fetch(uri, options);

  return initialRequest.then(response => (
    response.text()
  )).then((text) => {
    const jsonified = JSON.parse(text);
    // If there was an error we need to attempt to handle it...
    if (jsonified.errors && jsonified.errors.findIndex(error =>
      error.message === "Not authorized") !== -1  // Same error string as found in server-prisma/src/utils.js
    ) {
      // Attempt to re-grab the token from local storage
      this.token = grabToken();

      if (this.token) {
        // Load it into the authorization header
        options.headers.authorization = `Bearer ${this.token}`;

        // Fire off the fetch a second time and hope it works.
        return fetch(uri, options);
      }
    }

    const result = {};
    result.ok = true; // TODO Should this be false in the case of a failure to regrab a token???
    result.text = () => new Promise((resolve, reject) => {
      resolve(text);
    });
    return result;
  });
};

const httpLinkWithAuthToken = createHttpLink({
  uri: `http://${API_ROOT}`,
  fetch: customFetch,
  headers: {
    authorization: token ? `Bearer ${token}` : null,
  },
});

// You’re instantiating a WebSocketLink that knows the subscriptions endpoint. The subscriptions
// endpoint in this case is similar to the HTTP endpoint, except that it uses the ws instead of
// http protocol. Notice that you’re also authenticating the websocket connection with the user’s
// token that you retrieve from localStorage.
const wsLink = new WebSocketLink({
  uri: `ws://${API_ROOT}`,
  options: {
    reconnect: true,
    connectionParams: {
      authToken: token,
    },
  },
});

// split is used to “route” a request to a specific middleware link. It takes three arguments,
// the first one is a test function which returns a boolean.
// The remaining two arguments are again of type ApolloLink.
// If test returns true, the request will be forwarded to the link passed as the second argument.
// If false, to the third one.
const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLinkWithAuthToken,
);
// In this case, the test function is checking whether the requested operation is a subscription.
// If this is the case, it will be forwarded to the wsLink, otherwise (if it’s a query or mutation),
// the httpLinkWithAuthToken will take care of it

// Instantiate ApolloClient by passing in the httpLink and a new instance of an InMemoryCache.
const client = new ApolloClient({
  // https://github.com/apollographql/react-docs/blob/master/source/cache-updates.md
  dataIdFromObject: o => o.id,
  link,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>
  , document.getElementById("root"),
);
registerServiceWorker();
