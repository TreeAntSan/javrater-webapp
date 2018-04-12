import React from "react";
import { Segment, Header } from "semantic-ui-react";

const UserDetail = (props) => {
  if (props.loading) {
    return (<p>Loading!</p>);
  }
  if (props.error) {
    return (<p>Error! {props.error.message}</p>);
  }

  let userData = props.self ? props.data.me : props.data.user;

  return (
    <Segment>
      <Header as="h1" textAlign="center">
        <Header.Content>
          {props.self ? "Your Details" : "User Details"}
        </Header.Content>
      </Header>
      <p>ID: {userData && userData.id}</p>
      <p>Name: {userData && userData.name}</p>
      {userData && userData.email && <p>Email: {userData.email}</p>}
    </Segment>
  );
};

export default UserDetail;
