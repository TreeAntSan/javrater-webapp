import React, { Component } from "react";
import PropTypes from "prop-types";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import LoadingError from "./components/LoadingError";

// Inspired from https://www.graph.cool/forum/t/react-hoc-to-check-for-authorized-user-protected-routes/478/2
export default (IncomingRoute, options = {}) => {
  class AuthHOC extends Component {
    render() {
      const { meQuery } = this.props;

      // Only show the error (usually the uses is not logged in) if the route is private.
      if (meQuery.loading || (options.private && meQuery.error)) {
        return (
          <LoadingError
            error={meQuery.error}
            errorMessage={(
              <div>
                <p>{meQuery.error && meQuery.error.message}</p>
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
          currentUser={meQuery}
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

  return graphql(ME_QUERY, {
    name: "meQuery",
    options: { fetchPolicy: "network-only" },
  })(withRouter(AuthHOC));
};
