import React from "react";
import { Image, Header } from "semantic-ui-react";

const Welcome = () => (
  <div>
    <Header as="h1" textAlign="center">
      <Header.Content>
        <Image src="treeant.jpeg" circular />
        Welcome to JAVRater!
      </Header.Content>
    </Header>
  </div>
);

export default Welcome;

