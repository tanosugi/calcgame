import gql from "graphql-tag";
export const GET_MY_USERNAME = gql`
  query {
    me {
      username
    }
  }
`;

export const CREATE_USER = gql`
  mutation($username: String!, $password: String!) {
    createUser(input: { username: $username, password: $password }) {
      user {
        id
        username
      }
    }
  }
`;

export const GET_TOKEN = gql`
  mutation($username: String!, $password: String!) {
    tokenAuth(username: $username, password: $password) {
      token
    }
  }
`;
