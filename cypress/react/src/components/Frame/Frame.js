import * as React from "react";
import { Route, Switch } from "react-router-dom";
import { login, checkSession, logout } from "../../common/auth";
import Appbar from "../Appbar/Appbar";
import Accommodations from "../Accommodations/Accommodations";
import CreateAccommodation from "../CreateAccommodation/CreateAccommodation";
import Page404 from "../Error/Page404";
import AccommodationsDetail from "../AccommodationsDetail/AccommodationsDetail";
import { UserContext } from "../../common/context";
import Register from "../Login/Register";

class Frame extends React.Component {
  state = {
    user: undefined,
    login: async (email, password) => {
      const user = await login(email, password);
      this.setState({ user });
      return user;
    },
    logout: () => {
      logout();
      this.setState({ user: undefined });
    },
    updateUser: user => {
      this.setState({ user });
    },
  };

  async componentDidMount() {
    const user = await checkSession();
    if (user) this.setState({ user });
  }

  render() {
    return (
      <UserContext.Provider value={this.state}>
        <Appbar title="AMISBnB" />
        <React.Fragment>
          <Switch>
            <Route exact path="/" component={Accommodations} />
            <Route path="/accommodation/:id" component={AccommodationsDetail} />
            <Route path="/create" component={CreateAccommodation} />
            <Route path="/register" component={Register} />
            <Route component={Page404} />
          </Switch>
        </React.Fragment>
      </UserContext.Provider>
    );
  }
}

export default Frame;
