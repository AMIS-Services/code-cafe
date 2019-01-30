import * as React from "react";
import { withStyles, Dialog, DialogTitle, Input, Button } from "@material-ui/core";
import { UserContext } from "../../common/context";
import { Link } from "react-router-dom";

const styles = {
  title: {
    width: 320,
    backgroundColor: "red",
    "& h2": {
      color: "white",
      fontWeight: "bold",
    },
  },
  userFields: {
    display: "flex",
    flexDirection: "column",
    margin: 16,
    "& div:nth-child(2n)": {
      marginTop: 16,
    },
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
    margin: 16,
  },
  link: {
    marginLeft: 16,
    color: "black",
    fontSize: 12,
  },
};

class LoginDialog extends React.Component {
  constructor(props) {
    super(props);
    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();
  }

  handleLogin = () => {
    const user = this.context.login(this.emailRef.value, this.passwordRef.value);
    if (user) this.props.handleClose();
  };

  render() {
    return (
      <Dialog open={this.props.open}>
        <DialogTitle className={this.props.classes.title}>Login</DialogTitle>
        <div className={this.props.classes.userFields}>
          <Input
            inputRef={input => {
              this.emailRef = input;
            }}
            placeholder="Email"
          />
          <Input
            type="password"
            inputRef={input => {
              this.passwordRef = input;
            }}
            placeholder="Password"
          />
        </div>
        <div className={this.props.classes.link}>
          <Link to="/register" onClick={this.props.handleClose}>
            Nog geen account?
          </Link>
        </div>
        <div className={this.props.classes.buttons}>
          <Button onClick={this.handleLogin}>OK</Button>
          <Button onClick={this.props.handleClose}>Cancel</Button>
        </div>
      </Dialog>
    );
  }
}

LoginDialog.contextType = UserContext;

export default withStyles(styles)(LoginDialog);
