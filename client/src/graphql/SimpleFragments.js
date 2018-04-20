import gql from "graphql-tag";

// These fragments are limited to a single-layer. Higher-order fragments (such as a fragment
// responsible for grabbing a Movie's many details or a user's movies in addition to their name)
// should be in separate and intelligently labeled Fragments file.
export const MovieDetails = gql`
  fragment MovieDetails on Movie {
    id
    title
    prodCode
  }
`;

export const GenreDetails = gql`
  fragment GenreDetails on Genre {
    id
    code
    description
  }
`;

export const RatingDetails = gql`
  fragment RatingDetails on Rating {
    id
    rating
    description
  }
`;

export const TagDetails = gql`
  fragment TagDetails on Tag {
    id
    tag
    name
    category
    description
  }
`;

export const UserDetails = gql`
  fragment UserDetails on User {
    id
    name
  }
`;

export const PrivateUserDetails = gql`
  fragment PrivateUserDetails on PrivateUser {
    id
    name
    email
  }
`;
