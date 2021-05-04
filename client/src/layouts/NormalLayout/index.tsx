import { createStyles, makeStyles, Theme } from "@material-ui/core";
import React, { ReactElement } from "react";
import { Outlet } from "react-router-dom";
import Topbar from "./Topbar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      minHeight: "100vh",
      maxWidth: "100vw",
      overflow: "hidden",
      width: "100%",
      // backgroundColor: "pink",
    },
    toolbar: { ...theme.mixins.toolbar },
    content: {
      display: "inline-block",
      // flex: "1 0 auto",
      flex: 1,
      height: "auto",
      overflow: "hidden",
      flexDirection: "column",
    },
  })
);
const NormalLayout: React.FC = (): ReactElement => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.root}>
        <Topbar />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default NormalLayout;
