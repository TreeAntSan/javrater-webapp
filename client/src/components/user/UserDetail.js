import React from "react";
import PropTypes from "prop-types";
import { Container, Segment, Header } from "semantic-ui-react";

import FloatingCenterGrid from "../FloatingCenterGrid";
import MovieTable from "../movies/MovieTable";
import LoadingError from "../LoadingError";

const UserDetail = (props) => {
  if (props.loading || props.error) {
    return (<LoadingError error={props.error}/>);
  }

  const userData = props.data.me || props.data.user;
  const self = !!props.data.me;

  if (userData === null) {
    return (
      <LoadingError
        error={true}
        errorHeader="User not found"
        errorMessage={(<p>No user was found with the ID "{props.userId}".</p>)}
      />
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
