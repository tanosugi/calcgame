import { useLazyQuery, useMutation } from "@apollo/client";
import React, {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  CREATE_GAME,
  GET_MYPROFILE,
  JOIN_GAME,
  SET_AND_GET_GAME_PROGRESS,
} from "../queries";

const BattleContext = createContext(
  {} as {
    queryAndSetUserProfId: () => void;
    createGameAndSetToProfile: (idToJoinGame: number) => void;
    joinGameAndSetToProfile: (idToJoinGame: number) => void;
  }
);
const BattleContextProvider: React.FC = ({ children }): ReactElement => {
  const [userProfId, setUserProfId] = useState("");
  const [myGameProgress, setMyGameProgress] = useState(0);
  const [opponentGameProgress, setOpponentGameProgress] = useState(0);
  const [isGameOwner, setIsGameOwner] = useState(true);
  const [lastGameSeconds, setLastGameSeconds] = useState(0);
  const [lastGameMistake, setlastGameMistake] = useState(0);
  const [lastGamePoint, setLastGamePoint] = useState(0);
  const [
    getUserProfId,
    {
      loading: loadingGetMyUsername,
      data: dataGetMyUsername,
      error: errorGetMyUsername,
      called: calledGetMyUsername,
    },
  ] = useLazyQuery(GET_MYPROFILE, {
    fetchPolicy: "cache-and-network",
  });
  const [
    createGame,
    {
      data: dataCreateGame,
      loading: loadingCreateGame,
      called: calledCreateGame,
      error: errorCreateGame,
    },
  ] = useMutation(CREATE_GAME);
  const [
    joinGame,
    {
      data: dataJoinGame,
      loading: loadingJoinGame,
      called: calledJoinGame,
      error: errorJoinGame,
    },
  ] = useMutation(JOIN_GAME);
  const [
    setAndGetGameProgress,
    {
      data: dataSetAndGetGameProgress,
      loading: loadingSetAndGetGameProgress,
      called: calledSetAndGetGameProgress,
      error: errorSetAndGetGameProgress,
    },
  ] = useMutation(SET_AND_GET_GAME_PROGRESS);
  const queryAndSetUserProfId = () => {
    try {
      getUserProfId();
    } catch (err) {
      alert(err.message);
    }
  };
  const createGameAndSetToProfile = (idToJoinGame: number) => {
    try {
      createGame({
        variables: {
          id: userProfId,
          idToJoinGame: idToJoinGame,
        },
      });
    } catch (err) {
      alert(err.message);
    }
    return;
  };
  const joinGameAndSetToProfile = (idToJoinGame: number) => {
    try {
      // joinGame({
      //   variables: {
      //     id: userProfId,
      //     idToJoinGame: idToJoinGame,
      //   },
      // });
    } catch (err) {
      alert(err.message);
    }
    return;
  };
  const setAndGetGameProgressAndSetToProfile = (myProgress: number) => {
    try {
      setAndGetGameProgress({
        variables: {
          id: userProfId,
          idToJoinGame: myProgress,
        },
      });
    } catch (err) {
      alert(err.message);
    }
    return;
  };
  useEffect(() => {
    setUserProfId(dataGetMyUsername?.profile?.id);
    const a = 1;
  }, [dataGetMyUsername]);
  // useEffect(() => {
  //   console.log(dataCreateGame?.profile?.gamePlaying.edges.node.idToStartGame);
  // }, [dataCreateGame]);
  // useEffect(() => {
  //   console.log(dataJoinGame?.profile?.gamePlaying.edges.node.idToStartGame);
  // }, [dataJoinGame]);
  // useEffect(() => {
  //   console.log(
  //     dataSetAndGetGameProgress?.profile?.gamePlaying.edges.node.idToStartGame
  //   );
  // }, [dataSetAndGetGameProgress]);
  return (
    <BattleContext.Provider
      value={{
        queryAndSetUserProfId,
        createGameAndSetToProfile,
        joinGameAndSetToProfile,
      }}
    >
      {children}
    </BattleContext.Provider>
  );
};
export default BattleContextProvider;
export const useBattleContext = () => useContext(BattleContext);
