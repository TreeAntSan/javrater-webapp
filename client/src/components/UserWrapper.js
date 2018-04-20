import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { graphql, compose } from "react-apollo";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import LoadingError from "./LoadingError";

import { ME_QUERY_SIMPLE } from "../graphql/Queries";

// TODO there is a significant problem with this style that will require research:
// Every page load it hits the server with a me() query when you're logged out.
// This definitely shouldn't be done if the page isn't private. And it also shouldn't be done
// if it's pretty easy to detect that you're logged out (no AUTH_TOKEN found).
// At the moment I don't know how to like... NOT send the query when using the graphql
// function call at the bottom of this file. Probably just need to fire off manual queries?
// Yeah... probably that...
// TODO is PureComponent correct here? It wraps everything, it doesn't affect its children, right?
class UserWrapper extends PureComponent {
  render() {

    const { children, meData, ...rest } = this.props;

    // This route is private and requires that you be a user
    if (this.props.private) {
      if (meData.loading || meData.error) {
        return (
          <LoadingError
            error={meData.error}
            errorMessage={(
              <div>
                <p>{meData.error && meData.error.message}</p>
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
            loadingMessage="Checking if you're a recognized user..."
          />
        );
      }
    }

    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, { ...rest }));

    return (
      <div>{childrenWithProps}</div>
    );
  }
}

UserWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  meData: PropTypes.object.isRequired,
  private: PropTypes.bool,
};

// A note to myself: withRouter passes Route props (history, location, match) to this component.
// All my components that are children of this component should also have this withRouter call.
export default compose(
  withRouter,
  graphql(ME_QUERY_SIMPLE, { name: "meData" }),
)(UserWrapper);
