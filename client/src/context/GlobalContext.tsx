import React, { ReactElement } from "react";
import BattleContextProvider from "./BattleContext";
import CalcGameContext from "./CalcGameContext";
import UserContextProvider from "./UserContext";

const GlobalContextProvider: React.FC = ({ children }): ReactElement => {
  return (
    <BattleContextProvider>
      <UserContextProvider>
        <CalcGameContext>{children}</CalcGameContext>
      </UserContextProvider>
    </BattleContextProvider>
  );
};

export default GlobalContextProvider;
