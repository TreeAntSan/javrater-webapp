import React from "react";
import { Image, Header } from "semantic-ui-react";

const Welcome = props => (
  <div>
    <Header as="h1" textAlign="center">
      <Header.Content>
        <Image src="treeant.jpeg" circular />
        Welcome to JAVRater{
          props.user &&
          !props.user.error &&
          !props.user.loading &&
          `, ${props.user.me.name}`
        }!
      </Header.Content>
    </Header>
  </div>
);

export default Welcome;
