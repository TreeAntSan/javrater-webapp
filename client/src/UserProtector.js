import React, { Component } from "react";
import PropTypes from "prop-types";
import { graphql, compose, withApollo } from "react-apollo";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import LoadingError from "./components/LoadingError";

import { ME_QUERY_SIMPLE } from "./graphql/Queries";

// Inspired from https://www.graph.cool/forum/t/react-hoc-to-check-for-authorized-user-protected-routes/478/2
export default (IncomingRoute, options = {}) => {
  class AuthHOC extends Component {
    render() {
      const { meData } = this.props;

      // Only show the error (usually the user is not logged in) if the route is private.
      if (meData.loading || (options.private && (meData.error || meData.me === undefined))) {
        return (
          <LoadingError
            error={meData.error || (options.private && meData.me === undefined)}
            errorMessage={(
              <div>
                <p>{(meData.error && meData.error.message) || "There was a problem..."}</p>
                {meData.error && meData.error.message === "GraphQL error: Not authorized" &&
                  <p>
                    Please <Link to={{
                      pathname: "/login",
                      state: { from: this.props.location },
                    }}>Login</Link> {" "}
                    or <Link to={{
                      pathname: "/signup",
                      state: { from: this.props.location },
                    }}>Sign-up</Link>!
                  </p>
                }
              </div>
            )}
            loadingMessage={options.private ? "Checking if you're logged in..." : "Loading..."}
          />
        );
      }

      // Pass the received "props" and created functions to the IncomingRoute component
      return (
        <IncomingRoute
          {...this.props}
          {...options.props}
          meQuery={ME_QUERY_SIMPLE}
        />
      );
    }
  }

  AuthHOC.contextTypes = {
    router: PropTypes.object.isRequired,
  };

  return compose(
    withRouter,
    withApollo,
    graphql(ME_QUERY_SIMPLE, {
      name: "meData",
      options: { fetchPolicy: "cache-first" },
    }),
  )(AuthHOC);
};
