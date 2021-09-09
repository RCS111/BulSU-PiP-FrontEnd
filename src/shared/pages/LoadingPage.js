import {
    Box,
    CircularProgress,
    makeStyles,
  } from "@material-ui/core";
  import React from "react";
  
  function LoadingPage() {
    const useStyles = makeStyles((theme) => ({
      root: {
        position: "relative",
      },
      bottom: {
        color: theme.palette.grey[300],
      },
      top: {
        color: "#ab003c",
        animationDuration: "550ms",
        position: "absolute",
        left: 0,
      },
      circle: {
        strokeLinecap: "round",
      },
      container: {
        height: "100vh",
        position: "relative",
      },
      child: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      },
    }));
  
    const classes = useStyles();
  
    return (
      <Box className={classes.container}>
      <div className={classes.child}>
        <div className={classes.root}>
          <CircularProgress
            variant="determinate"
            className={classes.bottom}
            size={100}
            thickness={10}
            value={100}
          />
          <CircularProgress
            variant="indeterminate"
            disableShrink
            className={classes.top}
            classes={{
              circle: classes.circle,
            }}
            size={100}
            thickness={10}
          />
        </div>
        </div>
      </Box>
    );
  }
  
  export default LoadingPage;
  