import gql from "graphql-tag";
export const GET_MY_USERNAME = gql`
  query {
    me {
      username
    }
  }
`;
