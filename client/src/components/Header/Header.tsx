import React from "react";
import { AppBar, Toolbar, makeStyles, Box } from "@material-ui/core";
import { Link, withRouter } from "react-router-dom";
import { colors } from "../Theme/ColorPalette";
import HomeIcon from "@material-ui/icons/Home";
import { TextElement } from "../common/TextElement";

function Header() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <AppBar position="static" className={classes.appContainer}>
        <Toolbar>
          <Link to="/">
            <HomeIcon fontSize="large" style={{ fill: colors.lightBlue }} />
          </Link>
        </Toolbar>
        <Toolbar>               
          <Link to="/" style={{ textDecoration: "none" }}>
            <TextElement textStyle={{ color: colors.lightBlue }}>GuardRaillo</TextElement>
          </Link>
        </Toolbar>
        <Box
          style={{
            marginRight: "2%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center ",
          }}
        ></Box>
      </AppBar>
    </Box>
  );
}

const useStyles = makeStyles({
  root: {
    // flexGrow: 1,
  },
  appContainer: {
    backgroundColor: colors.white,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0px 1px 12px rgba(0, 0, 0, 0.04)",
  },
});
export default withRouter(Header);
