/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Button, Container, Grid, TextField } from "@material-ui/core";
import React, { ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ADDITION, useCalcGameContext } from "../context/CalcGameContext";

const CalcGameView: React.FC = (): ReactElement => {
  const { problems, createProblem } = useCalcGameContext();
  let navigate = useNavigate();
  const [inputAnswer, setInputAnswer] = useState<string>("");
  const [numberProgress, setNumberProgress] = useState<number>(0);
  const [shownArg1, setShownArg1] = useState<String>("a");
  const [shownArg2, setShownArg2] = useState<String>("");
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
    if (inputAnswer === problems[numberProgress][3]) {
      setNumberProgress(numberProgress + 1);
      const audio = new Audio(
        process.env.PUBLIC_URL + "/sounds/correctAnswer.mp3"
      );
      audio.play();
      setInputAnswer("");

      return true;
    } else {
      const audio = new Audio(
        process.env.PUBLIC_URL + "/sounds/incorrectAnswer.mp3"
      );
      audio.play();
      setInputAnswer("");
      return false;
    }
  };
  const finishGame = () => {};
  useEffect(() => {
    createProblem(ADDITION);
    setShownArg1(problems[numberProgress][0]);
    setShownArg2(problems[numberProgress][2]);
    // SUBTRACTION,MULTIPLICATION,DIVISION,
  }, []);
  useEffect(() => {
    setShownArg1(problems[numberProgress][0]);
    setShownArg2(problems[numberProgress][2]);
  }, [numberProgress]);
  useEffect(() => {
    if (inputAnswer.length > 1) checkAnswer();
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
        {numOnButton}
      </Button>
    </Grid>
  );

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
            <Grid item xs={3}>
              あいて
            </Grid>
            <Grid item xs={8}>
              ★★★★★★★☆☆☆
            </Grid>
          </Grid>
          <Grid container item spacing={3} alignItems="center">
            <Grid item xs={3}>
              じぶん
            </Grid>
            <Grid item xs={8}>
              ★★★★★★★★☆☆
            </Grid>
          </Grid>
          <Grid container item spacing={3} alignItems="center">
            <Grid item xs={2}>
              {shownArg1}
            </Grid>
            <Grid item xs={2}>
              +
            </Grid>
            <Grid item xs={2}>
              {shownArg2}
            </Grid>
            <Grid item xs={2}>
              =
            </Grid>
            <Grid item xs={4}>
              <TextField
                id="answer"
                label=""
                value={inputAnswer}
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
              こたえる
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
                けす
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default CalcGameView;
