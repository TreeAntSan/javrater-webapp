import React from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Image, Header } from "semantic-ui-react";
import utils from "../utils";

const Welcome = props => (
  <div>
    <Header as="h1" textAlign="center">
      <Header.Content>
        <Image src="/treeant.jpeg" circular />
        Welcome to Rater
        {utils.grabName(props.meData, ", %s")}!
      </Header.Content>
    </Header>
  </div>
);

Welcome.propTypes = {
  currentUser: PropTypes.object,
};

export default withRouter(Welcome);
