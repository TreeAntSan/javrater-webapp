import gql from "graphql-tag";

import {
  UserDetails,
  PrivateUserDetails,
} from "./SimpleFragments";

import {
  MovieFragment,
} from "./MovieFragments";

export const UserFragment = gql`
  fragment UserFragment on User {
    ...UserDetails
    movies {
      ...MovieFragment
    }
  }
  ${UserDetails}
  ${MovieFragment}
`;

// TODO Why is this broken? Spits out error:
// "GraphQL error: Cannot return null for non-nullable field PrivateUser.id."
// Whenever PrivateUserDetails is used. There seems to be a disconnect between User and PrivateUser?
export const PrivateUserFragment = gql`
  fragment PrivateUserFragment on PrivateUser {
    ...PrivateUserDetails
    movies {
      ...MovieFragment
    }
  }
  ${PrivateUserDetails}
  ${MovieFragment}
`;
