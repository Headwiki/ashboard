import { gql } from "apollo-boost";

const getSongsQuery = gql`
  {
    songs {
      title
      id
      url
      user{
        username
      }
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