import gql from "graphql-tag";

import {
  MovieDetails,
  GenreDetails,
  RatingDetails,
  TagDetails,
  UserDetails,
} from "./SimpleFragments";

// General, pretty comprehensive fragment
export const MovieFragment = gql`
  fragment MovieFragment on Movie {
    ...MovieDetails
    genre {
      ...GenreDetails
    }
    rating {
      ...RatingDetails
    }
    tags {
      ...TagDetails
    }
    createdBy {
      ...UserDetails
    }
  }
  ${MovieDetails}
  ${GenreDetails}
  ${RatingDetails}
  ${TagDetails}
  ${UserDetails}
`;

// Slightly simplified fragment. Example use when editing a movie, this is the only data necessary.
export const MovieFragmentSimple = gql`
  fragment MovieFragmentSimple on Movie {
    ...MovieDetails
    genre {
      id
      code
    }
    rating {
      ...RatingDetails
    }
    tags {
      id
      tag
    }
  }
  ${MovieDetails}
  ${RatingDetails}
`;
