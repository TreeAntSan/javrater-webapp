import React, { PureComponent } from 'react';
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { withRouter } from "react-router";

import utils from "../utils";

class Logout extends PureComponent {
  constructor(props) {
    super(props);

    try {
      utils.removeToken();
    } catch (error) {
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

export default withRouter(Logout);
