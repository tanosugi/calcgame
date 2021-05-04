import { useLazyQuery } from "@apollo/client";
import React, {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState
} from "react";
import { useNavigate } from "react-router";
import { GET_MY_USERNAME } from "../queries";

const UserContext = createContext(
  {} as {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    userName: string;
    setUserName: React.Dispatch<React.SetStateAction<string>>;
    redirectIfNotLoggedIn: () => void;
  }
);
const UserContextProvider: React.FC = ({ children }): ReactElement => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const [
    getMyUserName,
    {
      loading: loadingGetMyUsername,
      data: dataGetMyUsername,
      error: errorGetMyUsername,
      called: calledGetMyUsername,
    },
  ] = useLazyQuery(GET_MY_USERNAME, {
    fetchPolicy: "cache-and-network",
  });

  const redirectIfNotLoggedIn = async () => {
    console.log("redirectIfNotLoggedIn", isLoggedIn);
    try {
      const data = await getMyUserName();
      // if (dataGetMyUsername) {
      //   setIsLoggedIn(true);
      // } else {
      //   console.log(errorGetMyUsername);
      //   navigate("auth");
      // }
    } catch (err) {
      alert(err.message);
    }
    return;
  };
  useEffect(() => {
    try {
      if (calledGetMyUsername && !loadingGetMyUsername) {
        if (dataGetMyUsername) {
          setIsLoggedIn(true);
        } else {
          console.log(errorGetMyUsername);
          navigate("auth");
        }
      }
    } catch (err) {
      alert(err.message);
    }
  }, [loadingGetMyUsername]);

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userName,
        setUserName,
        redirectIfNotLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
export const useUserContext = () => useContext(UserContext);
