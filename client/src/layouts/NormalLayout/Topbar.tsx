import { AppBar, IconButton, Link } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { default as React } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      [theme.breakpoints.up("md")]: {
        width: "100%",
      },
      underline: "none",
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    toolbar: { display: "flex" },
    title: { flex: "1 1 auto" },
  })
);

const Topbar = () => {
  const classes = useStyles();
  const navigation = useNavigate();
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography
          variant="h6"
          noWrap
          component="div"
          color="inherit"
          className={classes.title}
        >
          <RouterLink to={"/"}>
            <Link color="white">計算ゲーム</Link>
          </RouterLink>
        </Typography>
        <IconButton
          aria-label="logout"
          onClick={() => {
            localStorage.removeItem("token");
            // window.location.href = "/";
            navigation("/auth");
          }}
        >
          <ExitToAppIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
export default Topbar;
