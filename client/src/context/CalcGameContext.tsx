import React, {
  createContext,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";

const CalcGameContext = createContext(
  {} as {
    problems: string[][];
    // setProblems: React.Dispatch<React.SetStateAction<string[][]>>;
    createProblem: React.Dispatch<string>;
  }
);

export const ADDITION = "ADDITION";
export const SUBTRACTION = "SUBTRACTION";
export const MULTIPLICATION = "MULTIPLICATION";
export const DIVISION = "DIVISION";

const CalcGameContextProvider: React.FC = ({ children }): ReactElement => {
  const [problems, setProblems] = useState<string[][]>([]);
  useEffect(() => {}, []);

  const createProblem = (problemTypes: string) => {
    setProblems([[""]]);
    const arrayToUpdate = problems;
    switch (problemTypes) {
      case ADDITION:
        for (var i = 0; i < 10; i++) {
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
    }

    setProblems(arrayToUpdate);
    return;
  };
  return (
    <CalcGameContext.Provider
      value={{
        problems,
        // setProblems,
        createProblem,
      }}
    >
      {children}
    </CalcGameContext.Provider>
  );
};
export default CalcGameContextProvider;
export const useCalcGameContext = () => useContext(CalcGameContext);
