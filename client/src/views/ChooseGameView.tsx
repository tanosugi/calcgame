import { Box, Button, Container, Grid, Typography } from "@material-ui/core";
import React, { ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ADDITION,
  DIVISION,
  MULTIPLICATION,
  SUBTRACTION,
  useCalcGameContext,
} from "../context/CalcGameContext";

const ChooseGameView: React.FC = (): ReactElement => {
  const navigate = useNavigate();
  const [isBattle, setIsBattle] = useState(false);
  const { calcType, setCalcType, resetProblems } = useCalcGameContext();
  useEffect(() => {
    setCalcType(ADDITION);
    // resetProblems();
  }, []);
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          maxWidth: 300,
          maxHeight: 600,
        }}
      >
        <Grid container spacing={3} direction="column">
          <Grid container item spacing={1} alignItems="center">
            <Grid item>
              <Typography variant="h6">もんだい</Typography>
            </Grid>
            <Grid container item spacing={3} alignItems="center">
              <Grid item xs={3}>
                <Button
                  variant={calcType === ADDITION ? "contained" : "outlined"}
                  style={{ height: "100%", width: "100%" }}
                  onClick={(event) => {
                    setCalcType(ADDITION);
                  }}
                >
                  <Typography variant="h6"></Typography>
                  {"＋"}
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant={calcType === SUBTRACTION ? "contained" : "outlined"}
                  style={{ height: "100%", width: "100%" }}
                  onClick={(event) => {
                    setCalcType(SUBTRACTION);
                  }}
                >
                  <Typography variant="h6">{"－"}</Typography>
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant={
                    calcType === MULTIPLICATION ? "contained" : "outlined"
                  }
                  style={{ height: "100%", width: "100%" }}
                  onClick={(event) => {
                    setCalcType(MULTIPLICATION);
                  }}
                >
                  <Typography variant="h6">{"×"}</Typography>
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant={calcType === DIVISION ? "contained" : "outlined"}
                  style={{ height: "100%", width: "100%" }}
                  onClick={(event) => {
                    setCalcType(DIVISION);
                  }}
                >
                  <Typography variant="h6">{"÷"}</Typography>
                </Button>
              </Grid>
            </Grid>
            <Grid
              container
              item
              spacing={3}
              alignItems="center"
              style={{ paddingTop: "30px" }}
            >
              <Grid item>
                <Typography variant="h6">たいせん</Typography>
              </Grid>
            </Grid>
            <Grid container item spacing={3} alignItems="center">
              <Grid item xs={6}>
                <Button
                  variant={isBattle ? "outlined" : "contained"}
                  style={{ height: "100%", width: "100%" }}
                  onClick={(event) => {
                    setIsBattle(false);
                  }}
                >
                  <Typography variant="h6">なし</Typography>
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant={isBattle ? "contained" : "outlined"}
                  style={{ height: "100%", width: "100%" }}
                  onClick={(event) => {
                    setIsBattle(true);
                  }}
                >
                  <Typography variant="h6">あり</Typography>
                </Button>
              </Grid>
            </Grid>
            <Typography variant="h6" color="error">
              {"まだたいせんはみじっそう！！"}
            </Typography>
            <Grid
              item
              container
              spacing={3}
              alignItems="center"
              style={{ paddingTop: "60px" }}
            >
              <Grid item xs={12}>
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ height: "100%", width: "100%" }}
                  onClick={(event) => {
                    navigate(isBattle ? "../auth" : "../calcgame");
                    resetProblems();
                  }}
                >
                  <Typography variant="h6">
                    {isBattle ? "ログインしてまちあわせ" : "スタート"}
                  </Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ChooseGameView;
