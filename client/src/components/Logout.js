import React, { PureComponent } from "react";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import { withApollo } from "react-apollo";

import utils from "../utils";

class Logout extends PureComponent {
  constructor(props) {
    super(props);

    // TODO Does this do anything?
    props.client.resetStore();
    try {
      utils.removeToken();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error.message);
      // Well, shouldn't have been logged in, either!
    }
  }

  render() {
    return (
      <Redirect
        to="/"
      />
    );
  }
}

export default withRouter(withApollo(Logout));
