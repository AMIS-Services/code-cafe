import * as React from "react";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "70vh",
    alignItems: "center",
    justifyContent: "center",
    "& h1": {
      width: "fit-content",
    },
  },
};

class Page404 extends React.Component {
  render() {
    return (
      <div className={this.props.classes.root}>
        <h1>Oops!</h1>
        <h1>Page not found!</h1>
      </div>
    );
  }
}

export default withStyles(styles)(Page404);
