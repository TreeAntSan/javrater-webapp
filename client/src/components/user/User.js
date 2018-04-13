import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { withRouter } from "react-router";
import { Grid } from "semantic-ui-react";

import UserDetail from "./UserDetail";

const User = (props) => {
  let userDetail = null;
  // TODO check if the userid belongs to user (via UserWrapper) - either force me version or
  // explain "this is your public profile!"
  if (props.match.params.id === "me") {
    userDetail = (
      <Query query={ME_QUERY}>
        {queryProps => (
          <UserDetail {...queryProps} />
        )}
      </Query>
    );
  } else {
    userDetail = (
      <Query query={USER_QUERY} variables={{ id: props.match.params.id }}>
        {queryProps => (
          <UserDetail {...queryProps} />
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
          code
          description
        }
        rating {
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
          code
          description
        }
        rating {
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
