import { Box, makeStyles } from "@material-ui/core";
import React from "react";
import RepoContainer from "../components/Repo/RepoContainer";
import Footer from "../components/Footer/Footer";
import { TextElement } from "../components/common/TextElement";

const useStyle = makeStyles({
  container: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    marginBottom: "10px",
    flexGrow: 1,
  },
  containerFluid: {
    width: "80%",
    marginTop: "40px",
  },
});
function MyRepos() {
  const classes = useStyle();

  return (
    <>
      <Box className={classes.container}>
        <Box className={classes.containerFluid}>
          {/* Title */}
          <Box>
            <TextElement
              font="bold"
              fontType="h2"
              textStyle={{ textAlign: "left" }}
            >
              My Repos
            </TextElement>
          </Box>

          {/* repos Container */}

          <RepoContainer />
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default MyRepos;
