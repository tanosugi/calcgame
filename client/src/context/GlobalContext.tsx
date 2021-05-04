import React, { ReactElement } from "react";
import CalcGameContext from "./CalcGameContext";

const GlobalContextProvider: React.FC = ({ children }): ReactElement => {
  return <CalcGameContext>{children}</CalcGameContext>;
};

export default GlobalContextProvider;
