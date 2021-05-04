import React, { ReactElement } from "react";
import CalcGameContext from "./CalcGameContext";
import UserContextProvider from "./UserContext";

const GlobalContextProvider: React.FC = ({ children }): ReactElement => {
  return (
    <UserContextProvider>
      <CalcGameContext>{children}</CalcGameContext>
    </UserContextProvider>
  );
};

export default GlobalContextProvider;
