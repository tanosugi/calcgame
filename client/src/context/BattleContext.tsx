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
    setAndGetGameProgressAndSetToProfile: (myProgress: number) => void;
    opponentGameProgress: number;
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
      console.log("createGameAndSetToProfile");
      console.log(userProfId);
      createGame({
        variables: {
          id: userProfId,
          idToJoinGame: idToJoinGame,
        },
      });
      setAndGetGameProgress({
        variables: {
          id: userProfId,
          progress: 0,
        },
      });
      setOpponentGameProgress(0);
    } catch (err) {
      alert(err.message);
    }
    return;
  };
  const joinGameAndSetToProfile = (idToJoinGame: number) => {
    try {
      console.log("joinGameAndSetToProfile");
      console.log(userProfId);
      joinGame({
        variables: {
          id: userProfId,
          idToJoinGame: idToJoinGame,
        },
      });
      setAndGetGameProgress({
        variables: {
          id: userProfId,
          progress: 0,
        },
      });
    } catch (err) {
      alert(err.message);
    }
    return;
  };
  const setAndGetGameProgressAndSetToProfile = (myProgress: number) => {
    try {
      console.log("setAndGetGameProgressAndSetToProfile");
      console.log(userProfId);
      console.log(myProgress);
      setAndGetGameProgress({
        variables: {
          id: userProfId,
          progress: myProgress,
        },
      });
    } catch (err) {
      alert(err.message);
    }
    return;
  };
  useEffect(() => {
    try {
      setUserProfId(dataGetMyUsername?.profile?.id);
      console.log(dataGetMyUsername?.profile?.id);
    } catch (err) {
      alert(err.message);
    }
    const a = 1;
  }, [dataGetMyUsername]);
  useEffect(() => {
    if (dataCreateGame) {
      try {
        // console.log(dataCreateGame?.profile?.gamePlaying.edges[0].idToStartGame);
        // console.log(
        //   dataCreateGame?.profile?.gamePlaying.edges[0].node.idToStartGame
        // );
      } catch (err) {
        alert(err.message);
      }
      const a = 1;
    }
  }, [dataCreateGame]);
  useEffect(() => {
    if (dataJoinGame) {
      try {
        const a = 1;
        console.log(
          "dataJoinGame?.joinGame?.profile?.gamePlaying.edges[0].node.idToStartGame"
        );
        console.log(
          dataJoinGame?.joinGame?.profile?.gamePlaying.edges[0].node
            .idToStartGame
        );
        // console.log(
        //   dataJoinGame?.profile?.gamePlaying.edgesedges[0].node.idToStartGame
        // );
      } catch (err) {
        alert(err.message);
      }
    }
  }, [dataJoinGame]);
  useEffect(() => {
    if (dataSetAndGetGameProgress) {
      try {
        const a = 1;
        console.log("useEffect:dataSetAndGetGameProgress");
        console.log(
          dataSetAndGetGameProgress.setAndGetGameProgress.profile
            .opponentGameProgress
        );
        if (
          dataSetAndGetGameProgress.setAndGetGameProgress.profile
            .opponentGameProgress
        ) {
          setOpponentGameProgress(
            dataSetAndGetGameProgress.setAndGetGameProgress.profile
              .opponentGameProgress
          );
        }
        // console.log(
        //   dataSetAndGetGameProgress?.profile?.gamePlaying.edges[0].node
        //     .idToStartGame
        // );
        // setOpponentGameProgress(
        //   dataSetAndGetGameProgress?.profile?.gamePlaying.edges[0].ownerProgress
        // );
      } catch (err) {
        alert(err.message);
      }
    }
  }, [dataSetAndGetGameProgress]);
  return (
    <BattleContext.Provider
      value={{
        queryAndSetUserProfId,
        createGameAndSetToProfile,
        joinGameAndSetToProfile,
        setAndGetGameProgressAndSetToProfile,
        opponentGameProgress,
      }}
    >
      {children}
    </BattleContext.Provider>
  );
};
export default BattleContextProvider;
export const useBattleContext = () => useContext(BattleContext);
