import { Box, makeStyles, Typography, Grid } from "@material-ui/core";
import { ErrorTwoTone } from "@material-ui/icons";
import React from "react";

function ErrorComponent({ message }) {
  const useStyles = makeStyles((theme) => ({
    root: {
      position: "relative",
    },
    container: {
      height: "100%",
      position: "relative",
    },
    child: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
    },
    icon: {
        fontSize: "10em"
    }
  }));

  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <div className={classes.child}>
        <div className={classes.root}>
          <Grid container>
            <Grid item xs={12} align = 'center'>
              <ErrorTwoTone className={classes.icon} color="error" />
            </Grid>
            <Grid item xs={12} align = 'center'>
              <Typography variant="h3">{message}</Typography>
            </Grid>
          </Grid>
        </div>
      </div>
    </Box>
  );
}

export default ErrorComponent;
