import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { graphql } from "react-apollo";
import gql from "graphql-tag";
import { withRouter } from "react-router";

class UserWrapper extends PureComponent {
  render() {
    const { children } = this.props;

    const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, { user: this.props.meQuery }));

    return (
      <div>{childrenWithProps}</div>
    );
  }
}

UserWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
  ]),
  meQuery: PropTypes.object.isRequired,
};

const ME_QUERY = gql`
  query MeQuery {
    me {
      id
      name
      email
    }
  }
`;

// A note to myself: withRouter passes Route props (history, location, match) to this component.
// All my components that are children of this component should also have this withRouter call.
export default withRouter(graphql(ME_QUERY, { name: "meQuery" })(UserWrapper));
