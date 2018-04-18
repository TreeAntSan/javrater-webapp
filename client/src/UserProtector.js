import React, { Component } from "react";
import PropTypes from "prop-types";
import { graphql, compose, withApollo } from "react-apollo";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import LoadingError from "./components/LoadingError";

// Inspired from https://www.graph.cool/forum/t/react-hoc-to-check-for-authorized-user-protected-routes/478/2
export default (IncomingRoute, options = {}) => {
  class AuthHOC extends Component {
    render() {
      const { meData } = this.props;

      // Only show the error (usually the user is not logged in) if the route is private.
      if (meData.loading || (options.private && (meData.error || meData.me === undefined))) {
        return (
          <LoadingError
            error={meData.error || meData.me === undefined}
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
          meQuery={ME_QUERY}
        />
      );
    }
  }

  const ME_QUERY = gql`
    query MeQuery {
      me {
        id
        name
        email
      }
    }
  `;

  AuthHOC.contextTypes = {
    router: PropTypes.object.isRequired,
  };

  return compose(
    withRouter,
    withApollo,
    graphql(ME_QUERY, {
      name: "meData",
      options: { fetchPolicy: "cache-first" },
    }),
  )(AuthHOC);
};
