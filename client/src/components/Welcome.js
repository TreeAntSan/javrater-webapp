import React from "react";
import { withRouter } from "react-router";
import { Image, Header } from "semantic-ui-react";
import utils from "../utils";

const Welcome = props => (
  <div>
    <Header as="h1" textAlign="center">
      <Header.Content>
        <Image src="/treeant.jpeg" circular />
        Welcome to Rater{utils.grabName(props.user, ", %s")}!
      </Header.Content>
    </Header>
  </div>
);

export default withRouter(Welcome);
