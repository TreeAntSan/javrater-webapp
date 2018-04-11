import { ApolloProvider } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink, split } from "apollo-client-preset";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";

import React from "react";
import ReactDOM from "react-dom";
import "semantic-ui-css/semantic.min.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { AUTH_TOKEN } from "./constants";
import { BrowserRouter } from "react-router-dom";

const httpLink = new HttpLink({ uri: "http://localhost:4000" });

// ApolloLink for authentication
// "This middleware will be invoked every time ApolloClient sends a request to the server. You can
// imagine the process of sending a request as a chain of functions that are called. Each function
// gets passed the GraphQL operation and another function called forward. forward needs to be called
// at the end of the middleware function to pass the operation to the next middleware function in
// the chain."
const middlewareAuthLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  const authorizationHeader = token ? `Bearer ${token}` : null;
  operation.setContext({
    headers: {
      authorization: authorizationHeader,
    },
  });
  return forward(operation);
});

const httpLinkWithAuthToken = middlewareAuthLink.concat(httpLink);

// You’re instantiating a WebSocketLink that knows the subscriptions endpoint. The subscriptions
// endpoint in this case is similar to the HTTP endpoint, except that it uses the ws instead of
// http protocol. Notice that you’re also authenticating the websocket connection with the user’s
// token that you retrieve from localStorage.
const wsLink = new WebSocketLink({
  uri: "ws://localhost:4000",
  options: {
    reconnect: true,
    connectionParams: {
      authToken: localStorage.getItem(AUTH_TOKEN),
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
