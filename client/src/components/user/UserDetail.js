import React from "react";
import PropTypes from "prop-types";
import { Loader, Container, Message, Segment, Header } from "semantic-ui-react";

import FloatingCenterGrid from "../FloatingCenterGrid";
import MovieTable from "../movies/MovieTable";

const UserDetail = (props) => {
  // TODO Stretch: put these loading + error components into a wrap component for reuse?
  if (props.loading) {
    return (
      <FloatingCenterGrid>
        <Segment>
          <br/>
          <Loader active>Loading user information...</Loader>
          <br/>
        </Segment>
      </FloatingCenterGrid>
    );
  }

  if (props.error) {
    return (
      <FloatingCenterGrid>
        <Message negative>
          <Message.Header>Error</Message.Header>
          {props.error.message}
        </Message>
      </FloatingCenterGrid>
    );
  }

  const userData = props.data.me || props.data.user;
  const self = !!props.data.me;

  if (userData === null) {
    return (
      <FloatingCenterGrid>
        <Message negative>
          <Message.Header>User not found</Message.Header>
          No user was found with the ID "{props.userId}".
        </Message>
      </FloatingCenterGrid>
    );
  }

  return (
    <Container>
      <FloatingCenterGrid>
        <Header as="h1" textAlign="center">
          <Header.Content>
            {self ? "Your" : "User"} Details
          </Header.Content>
        </Header>
        <Segment>
          <p>Name: {userData.name}</p>
          {userData.email && <p>Email: {userData.email}</p>}
          <p>ID: {userData.id}</p>
        </Segment>
      </FloatingCenterGrid>
      <Container>
        {userData.movies.length ?
          <div>
            <Header as="h2" textAlign="center">
              <Header.Content>
                {self ? "Your" : `${userData.name}'s`} Movies
              </Header.Content>
            </Header>
            <MovieTable
              movies={userData.movies}
              hideCreatedBy
            />
          </div>
          :
          <div>
            <Header as="h3" textAlign="center">
              <Header.Content>
                {self ? "You" : `${userData.name} has`} no movies yet!
              </Header.Content>
            </Header>
          </div>
        }
      </Container>
    </Container>
  );
};

UserDetail.propTypes = {
  userId: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  data: PropTypes.object,
};

export default UserDetail;
