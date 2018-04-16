import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { withRouter } from "react-router";
import { Grid } from "semantic-ui-react";

import UserDetail from "./UserDetail";

const User = (props) => {
  const QUERY = props.match.params.id === "me" ? ME_QUERY : USER_QUERY;

  // This is the Apollo Cache update function for the Movies component
  const updateFunction = (proxy, { data: { deleteMovie } }) => {
    const data = proxy.readQuery({ query: QUERY });

    // Depending on whether this is a me or user query the data will be located in different objects
    const dataNamed = data.me || data.user;

    // Remove the movie using the mutation return data.
    dataNamed.movies.splice(dataNamed.movies.findIndex(movie => movie.id === deleteMovie.id), 1);
    proxy.writeQuery({ query: QUERY, data });
  };

  let userDetail = null;
  // TODO check if the userid belongs to user (via UserWrapper) - either force me version or
  // explain "this is your public profile!"
  if (props.match.params.id === "me") {
    userDetail = (
      <Query query={ME_QUERY}>
        {queryProps => (
          <UserDetail
            query={queryProps}
            updateFunction={updateFunction}
          />
        )}
      </Query>
    );
  } else {
    userDetail = (
      <Query query={USER_QUERY} variables={{ id: props.match.params.id }}>
        {queryProps => (
          <UserDetail
            query={queryProps}
            updateFunction={updateFunction}
          />
        )}
      </Query>
    );
  }

  return (
    <Grid padded>
      <Grid.Row>
        <Grid.Column>
          {userDetail}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

const USER_QUERY = gql`
  query UserQuery($id: ID!) {
    user(id: $id) {
      id
      name
      movies {
        id
        title
        prodCode
        genre {
          id
          code
          description
        }
        rating {
          id
          rating
        }
        tags {
          id
          tag
          name
          category
          description
        }
      }
    }
  }
`;

const ME_QUERY = gql`
  query MeQuery {
    me {
      id
      name
      email
      movies {
        id
        title
        prodCode
        genre {
          id
          code
          description
        }
        rating {
          id
          rating
        }
        tags {
          id
          tag
          name
          category
          description
        }
      }
    }
  }
`;

export default withRouter(User);
