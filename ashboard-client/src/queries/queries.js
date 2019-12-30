import { gql } from "apollo-boost";

const getSongsQuery = gql`
  {
    songs {
      title
      id
    }
  }
`;

const getUsersQuery = gql`
  {
    users {
      username
      id
    }
  }
`;

export { getSongsQuery, getUsersQuery };