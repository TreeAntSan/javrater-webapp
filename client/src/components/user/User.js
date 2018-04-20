import React from "react";
import { Query } from "react-apollo";
import { withRouter } from "react-router";
import { Grid } from "semantic-ui-react";
import UserDetail from "./UserDetail";

import { ME_QUERY, USER_QUERY } from "../../graphql/Queries";

const User = (props) => {
  // This is the Apollo Cache update function for the Movies component
  const _deleteMovieUpdate = (proxy, { data: { deleteMovie } }) => {
    if (props.match.params.id === "me") {
      const data = proxy.readQuery({ query: ME_QUERY });

      // Remove the movie using the mutation return data.
      data.me.movies.splice(data.me.movies.findIndex(movie => movie.id === deleteMovie.id), 1);
      proxy.writeQuery({ query: ME_QUERY, data });
    } else {
      const data = proxy.readQuery({ query: USER_QUERY, variables: { id: props.match.params.id } });

      // Remove the movie using the mutation return data.
      data.user.movies.splice(data.user.movies.findIndex(movie => movie.id === deleteMovie.id), 1);
      proxy.writeQuery({ query: USER_QUERY, data });
    }
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
            deleteMovieUpdate={_deleteMovieUpdate}
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
            deleteMovieUpdate={_deleteMovieUpdate}
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

export default withRouter(User);
