import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography
} from "@material-ui/core";
import React, { ReactElement, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useBattleContext } from "../context/BattleContext";
import { useUserContext } from "../context/UserContext";

const MeetView: React.FC = (): ReactElement => {
  const navigation = useNavigate();
  const { redirectIfNotLoggedIn } = useUserContext();
  const {
    createGameAndSetToProfile,
    joinGameAndSetToProfile,
  } = useBattleContext();
  const [isOwner, setIsOwner] = useState(true);
  const [inputAnswer, setInputAnswer] = useState<string>("");
  useEffect(() => {
    redirectIfNotLoggedIn();
  }, []);
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
    isOwner
      ? createGameAndSetToProfile(parseInt(inputAnswer))
      : joinGameAndSetToProfile(parseInt(inputAnswer));
    navigation("/calcgame");
  };
  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    // const a = problems;
    console.log("handleInput:", e.target.value);
    setInputAnswer(e.target.value);
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") handleClickAnswer();
  };
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
              <Typography variant="h6">{"たいせんID"}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant={isOwner ? "contained" : "outlined"}
                style={{ height: "100%", width: "100%" }}
                onClick={(event) => {
                  setIsOwner(true);
                }}
              >
                <Typography variant="h6">じぶんが　はっこう</Typography>
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                variant={isOwner ? "outlined" : "contained"}
                style={{ height: "100%", width: "100%" }}
                onClick={(event) => {
                  setIsOwner(false);
                }}
              >
                <Typography variant="h6">ともだちがはっこう</Typography>
              </Button>
            </Grid>
          </Grid>
          <Grid container item spacing={3} alignItems="center">
            <Grid item xs={4}>
              <Typography variant="h6"> {"　　ID："}</Typography>
            </Grid>
            <Grid item xs={8}>
              <TextField
                size="medium"
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
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              style={{ height: "100%", width: "100%" }}
              onClick={() => {
                handleClickAnswer();
              }}
            >
              <Typography variant="h6">
                {isOwner ? "はっこう" : "さんか"}
              </Typography>
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default MeetView;
