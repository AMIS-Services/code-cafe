import * as React from "react";
import { withStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";
import { UserContext } from "../../common/context";
import { fetch } from "../../common/fetch";

const styles = {
  root: {
    margin: 32,
    width: 320,
  },
  inputs: {
    display: "flex",
    flexDirection: "column",
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
    margin: "16px 0 16px 16px",
  },
};

class Register extends React.Component {
  state = {
    email: "",
    password: "",
    username: "",
  };

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  submit = async () => {
    const { ...user } = this.state;
    await fetch("users", { method: "POST", body: user });
    this.context.login(this.state.email, this.state.password);
    this.props.history.push("/");
  };

  render() {
    return (
      <UserContext.Consumer>
        {context => (
          <div className={this.props.classes.root}>
            <form className={this.props.classes.inputs}>
              <TextField
                id="username"
                required
                label="Gebruikersnaam"
                value={this.state.username}
                onChange={this.handleChange}
              />
              <TextField
                id="password"
                type="password"
                required
                label="Wachtwoord"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <TextField
                id="email"
                required
                label="Email"
                type="email"
                autoComplete="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </form>
            <div className={this.props.classes.buttons}>
              <Button onClick={this.submit}>OK</Button>
            </div>
          </div>
        )}
      </UserContext.Consumer>
    );
  }
}

Register.contextType = UserContext;

export default withStyles(styles)(Register);
