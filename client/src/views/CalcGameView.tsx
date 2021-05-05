/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { ReactElement, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBattleContext } from "../context/BattleContext";
import { useCalcGameContext } from "../context/CalcGameContext";

const CalcGameView: React.FC = (): ReactElement => {
  const { problems, createProblem } = useCalcGameContext();
  const {
    setAndGetGameProgressAndSetToProfile,
    opponentGameProgress,
  } = useBattleContext();
  const navigate = useNavigate();
  const inputEl = useRef<HTMLInputElement>(null);
  const [inputAnswer, setInputAnswer] = useState<string>("");
  const [numberProgress, setNumberProgress] = useState<number>(0);
  const [shownArg1, setShownArg1] = useState<String>("");
  const [shownArg2, setShownArg2] = useState<String>("");
  const [calcSign, setCalcSign] = useState<String>("");
  const [correctAnswer, setCorrectAnswer] = useState<String>("");
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const secondsPassed = useRef(0);
  const handleClickNumber = (n: number) => {
    console.log(n);
    setInputAnswer(inputAnswer + n.toString());
  };
  const handleClickDelete = () => {
    console.log("handleClickDelete");
    setInputAnswer("");
  };
  const handleClickAnswer = () => {
    console.log("handleClickAnswer");
    checkAnswer();
  };
  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // const a = problems;
    console.log("handleInput:", e.target.value);
    setInputAnswer(e.target.value);
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") checkAnswer();
  };
  const checkAnswer = () => {
    if (inputAnswer.length == 0) return;
    if (inputAnswer === correctAnswer) {
      setNumberProgress(numberProgress + 1);
      const audio = new Audio(
        process.env.PUBLIC_URL + "/sounds/correctAnswer.mp3"
      );
      audio.play();
      setInputAnswer("");
      setAndGetGameProgressAndSetToProfile(numberProgress);
      return;
    } else {
      const audio = new Audio(
        process.env.PUBLIC_URL + "/sounds/incorrectAnswer.mp3"
      );
      audio.play();
      setInputAnswer("");
      return;
    }
  };
  const setCurrentProblem = () => {
    setShownArg1(problems[numberProgress][0]);
    setCalcSign(problems[numberProgress][1]);
    setShownArg2(problems[numberProgress][2]);
    setCorrectAnswer(problems[numberProgress][3]);
  };
  useEffect(() => {
    createProblem();
  }, []);
  useEffect(() => {
    if (inputEl && inputEl.current) {
      inputEl.current.focus();
    }
  }, [inputEl, inputEl.current]);
  useEffect(() => {
    if (10 <= numberProgress) {
      navigate("../result", { replace: true });
    }
    setCurrentProblem();
  }, [numberProgress]);
  useEffect(() => {
    if (correctAnswer.length <= inputAnswer.length) checkAnswer();
  }, [inputAnswer]);
  type PropsNumberButton = { numOnButton: number };
  const NumberButton: React.FC<PropsNumberButton> = ({
    children,
    numOnButton,
  }) => (
    <Grid item xs={4}>
      <Button
        variant="contained"
        style={{ height: "100%", width: "100%" }}
        onClick={(e) => {
          handleClickNumber(numOnButton);
        }}
      >
        <Typography variant="h6">{numOnButton}</Typography>
      </Button>
    </Grid>
  );
  type PropsShowProgress = { progress: number };
  const ShowProgress: React.FC<PropsShowProgress> = ({
    children,
    progress,
  }): ReactElement => {
    const stars: boolean[] = [];
    for (let i = 0; i < 10; i++) {
      if (i < progress) {
        stars.push(true);
      } else {
        stars.push(false);
      }
    }
    return (
      <>
        {stars.map((val: boolean) => {
          return <>{val ? <>{"★"}</> : <>{"☆"}</>}</>;
        })}
      </>
    );
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      const date = new Date();
      secondsPassed.current = secondsPassed.current + 1;
      setTime(date.toLocaleTimeString());
      if (secondsPassed.current % 3 === 0) {
        setAndGetGameProgressAndSetToProfile(numberProgress - 1);
      }
    }, 1000);
    return () => {
      clearTimeout(timeout);
    };
  }, [time]);

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          maxWidth: 300,
          maxHeight: 600,
        }}
      >
        <Grid container spacing={3} direction="column">
          <Grid container item spacing={3} alignItems="center">
            <Grid item xs={12}>
              <Typography variant="h6">
                {secondsPassed.current}
                {"びょうけいか"}
              </Typography>
            </Grid>
          </Grid>
          <Grid container item spacing={0} alignItems="center">
            <Grid item xs={4}>
              <Typography variant="h6"> あいて</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h6">
                <ShowProgress progress={opponentGameProgress + 1} />
              </Typography>
            </Grid>
          </Grid>
          <Grid container item spacing={0} alignItems="center">
            <Grid item xs={4}>
              <Typography variant="h6">じぶん</Typography>
            </Grid>
            <Grid item xs={8}>
              <Typography variant="h6">
                <ShowProgress progress={numberProgress} />
              </Typography>
            </Grid>
          </Grid>
          <Grid container item spacing={3} alignItems="center">
            <Grid item xs={2}>
              <Typography variant="h6"> {shownArg1}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="h6"> {calcSign}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="h6"> {shownArg2}</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography variant="h6"> ＝</Typography>
            </Grid>
            <Grid item xs={4}>
              <TextField
                size="medium"
                id="answer"
                label=""
                value={inputAnswer}
                ref={inputEl}
                onChange={(e) => {
                  handleInput(e);
                }}
                onKeyPress={(e) => {
                  handleKeyPress(e);
                }}
              />
            </Grid>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              style={{ height: "100%", width: "100%" }}
              onClick={() => {
                handleClickAnswer();
              }}
            >
              <Typography variant="h6"> こたえる</Typography>
            </Button>
          </Grid>
          <Grid container item spacing={3}>
            <NumberButton numOnButton={7} />
            <NumberButton numOnButton={8} />
            <NumberButton numOnButton={9} />
          </Grid>
          <Grid container item spacing={3}>
            <NumberButton numOnButton={4} />
            <NumberButton numOnButton={5} />
            <NumberButton numOnButton={6} />
          </Grid>
          <Grid container item spacing={3}>
            <NumberButton numOnButton={1} />
            <NumberButton numOnButton={2} />
            <NumberButton numOnButton={3} />
          </Grid>
          <Grid container item spacing={2}>
            <NumberButton numOnButton={0} />
            <Grid item xs={8}>
              <Button
                variant="contained"
                style={{ height: "100%", width: "100%" }}
                onClick={() => {
                  handleClickDelete();
                }}
              >
                <Typography variant="h6">けす</Typography>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CalcGameView;
