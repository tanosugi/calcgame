/* eslint-disable @typescript-eslint/no-redeclare */
import React, {
  createContext,
  ReactElement,
  useContext,
  useState,
} from "react";

const CalcGameContext = createContext(
  {} as {
    problems: string[][];
    calcType: string;
    setCalcType: React.Dispatch<React.SetStateAction<string>>;
    createProblem: React.Dispatch<void>;
    resetProblems: React.Dispatch<void>;
  }
);

export const ADDITION = "ADDITION";
export const SUBTRACTION = "SUBTRACTION";
export const MULTIPLICATION = "MULTIPLICATION";
export const DIVISION = "DIVISION";

const CalcGameContextProvider: React.FC = ({ children }): ReactElement => {
  const [problems, setProblems] = useState<string[][]>([]);
  const [calcType, setCalcType] = useState(ADDITION);

  const resetProblems = () => {
    setProblems([]);
  };

  const createProblem = () => {
    resetProblems();
    const arrayToUpdate = problems;
    switch (calcType) {
      case ADDITION:
        for (var i = 0; i < 11; i++) {
          const arg1 = Math.floor(Math.random() * 10 + 1);
          const arg2 = Math.floor(Math.random() * 10 + 1);
          arrayToUpdate.push([
            arg1.toString(),
            "+",
            arg2.toString(),
            (arg1 + arg2).toString(),
          ]);
        }
        break;
      case SUBTRACTION:
        for (var i = 0; i < 11; i++) {
          const arg1 = Math.floor(Math.random() * 10 + 1);
          const arg2 = Math.floor(Math.random() * 10 + 1);
          arrayToUpdate.push([
            (arg1 + arg2).toString(),
            "-",
            arg1.toString(),
            arg2.toString(),
          ]);
        }
        break;
      case MULTIPLICATION:
        for (var i = 0; i < 11; i++) {
          const arg1 = Math.floor(Math.random() * 10 + 1);
          const arg2 = Math.floor(Math.random() * 10 + 1);
          arrayToUpdate.push([
            arg1.toString(),
            "x",
            arg2.toString(),
            (arg1 * arg2).toString(),
          ]);
        }
        break;
      case DIVISION:
        for (var i = 0; i < 11; i++) {
          const arg1 = Math.floor(Math.random() * 10 + 1);
          const arg2 = Math.floor(Math.random() * 10 + 1);
          arrayToUpdate.push([
            (arg1 * arg2).toString(),
            "÷",
            arg1.toString(),
            arg2.toString(),
          ]);
        }
        break;
    }

    setProblems(arrayToUpdate);
    return;
  };
  return (
    <CalcGameContext.Provider
      value={{
        problems,
        calcType,
        setCalcType,
        createProblem,
        resetProblems,
      }}
    >
      {children}
    </CalcGameContext.Provider>
  );
};
export default CalcGameContextProvider;
export const useCalcGameContext = () => useContext(CalcGameContext);
