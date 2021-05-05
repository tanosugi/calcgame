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

export const GET_MYPROFILE = gql`
  query {
    profile {
      id
      userProf {
        username
      }
    }
  }
`;

export const CREATE_GAME = gql`
  mutation($id: ID!, $idToJoinGame: Int!) {
    createGame(input: { id: $id, idToJoinGame: $idToJoinGame }) {
      profile {
        id
        gamePlaying {
          edges {
            node {
              id
              idToStartGame
              ownerId
              ownerProgress
              joinerId
              joinerProgress
            }
          }
        }
      }
    }
  }
`;

export const JOIN_GAME = gql`
  mutation($id: ID!, $idToJoinGame: Int!) {
    joinGame(input: { id: $id, idToJoinGame: $idToJoinGame }) {
      profile {
        id
        gamePlaying {
          edges {
            node {
              id
              idToStartGame
              ownerId
              ownerProgress
              joinerId
              joinerProgress
            }
          }
        }
      }
    }
  }
`;

export const SET_AND_GET_GAME_PROGRESS = gql`
  mutation($id: ID!, $progress: Int!) {
    setAndGetGameProgress(input: { id: $id, progress: $progress }) {
      profile {
        gameProgress
        opponentGameProgress
      }
    }
  }
`;
