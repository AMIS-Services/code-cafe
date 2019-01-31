import * as React from "react";
import { Card, Grid, withStyles } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { HouseIcon } from "../../resources/HouseIcon";
import { fetch } from "../../common/fetch";
import { UserContext } from "../../common/context";

const styles = {
  root: {
    height: "100%",
    padding: 8,
    display: "flex",
    flexDirection: "column",
    margin: 20,
    "& main": {
      width: "100%" - 24,
    },
    "& h2": {
      margin: 8,
    },
    "& p": {
      fontSize: 16,
    },
    "& footer": {
      marginTop: "auto",
      alignSelf: "flex-end",
    },
  },
  thumbnail: {
    width: "100%",
    cursor: "pointer",
  },
  subHeader: {
    color: "grey",
    fontSize: 14,
  },
  houseIcon: {
    cursor: "pointer",
    fill: "lightgray",
  },
  houseIconFavorite: {
    cursor: "pointer",
    fill: "red",
  },
};

class AccommodationCard extends React.Component {
  state = { ...this.props.accommodation };

  toggleFavorite = async () => {
    const { _id, createdAt, updatedAt, ...user } = this.context.user;
    const accommodationIndex = user.favoriteAccommodations.indexOf(this.state._id);
    accommodationIndex === -1
      ? user.favoriteAccommodations.push(this.state._id)
      : user.favoriteAccommodations.splice(accommodationIndex, 1);

    const newUser = await fetch(`users/${this.context.user._id}`, {
      method: "PUT",
      body: user,
    });
    this.context.updateUser(newUser);
  };

  goToDetail = () => {
    this.props.history.push("accommodation/" + this.state._id);
  };

  render() {
    const { image, name, location, _id, description } = this.state;
    return (
      <Grid item xs={12} sm={4} lg={3}>
        <Card className={this.props.classes.root} data-test="accommodationCard">
          <header onClick={this.goToDetail}>
            <img className={this.props.classes.thumbnail} src={image} alt="img of accommodation" />
          </header>
          <main>
            <h2>{name}</h2>
            <div className="sub-header">{location}</div>
            <p>{description}</p>
          </main>
          <UserContext.Consumer>
            {context => {
              return context.user ? (
                <footer>
                  <HouseIcon
                    data-test="favorite-icon"
                    onClick={this.toggleFavorite}
                    className={
                      context.user.favoriteAccommodations.includes(_id)
                        ? this.props.classes.houseIconFavorite
                        : this.props.classes.houseIcon
                    }
                  />
                </footer>
              ) : null;
            }}
          </UserContext.Consumer>
        </Card>
      </Grid>
    );
  }
}

AccommodationCard.contextType = UserContext;

export default withStyles(styles)(withRouter(AccommodationCard));

AccommodationCard.propTypes = {
  accommodation: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};
