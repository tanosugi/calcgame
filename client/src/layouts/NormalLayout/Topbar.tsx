import { AppBar, Link } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { default as React } from "react";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      [theme.breakpoints.up("md")]: {
        width: "100%",
      },
      underline: "none",
    },
  })
);

const Topbar = () => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div" color="inherit">
          <RouterLink to={"/"}>
            <Link color="white">計算ゲーム</Link>
          </RouterLink>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
export default Topbar;
