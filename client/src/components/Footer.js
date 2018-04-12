import React from "react";
import { Container } from "semantic-ui-react";

const date = new Date();

const Footer = () => (
  <div>
    <Container textAlign="center">
      © {date.getFullYear()} - All rights reserved.
    </Container>
  </div>
);

export default Footer;
