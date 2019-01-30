import * as React from "react";
import { withStyles, Grid } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { fetch } from "../../common/fetch";
import { CaretLeftIcon } from "../../resources/CaretLeftIcon";
import { CaretRightIcon } from "../../resources/CaretRightIcon";

const styles = {
  root: {
    height: "10%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& main": {
      width: "100%",
    },
    "& h2": {
      marginLeft: 100,
    },
    "& p": {
      fontSize: 16,
      marginLeft: 100,
    },
    "& footer": {
      marginTop: "auto",
      alignSelf: "flex-end",
    },
  },
  image: {
    height: 700,
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  arrow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: 24,
    color: "#c9c9c9",
    backgroundColor: "#dadada",
    height: 48,
    width: 48,
    borderRadius: 24,
    margin: 8,
  },
  imageCover: {
    maxWidth: "90%",
    maxHeight: "100%",
    overflow: "hidden",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 8,
  },
  subHeader: {
    color: "red",
    fontSize: 12,
    marginLeft: 100,
  },
  amenities: {
    width: 430,
    border: "1.5px solid #ababab",
    borderRadius: 8,
    marginBottom: 24,
  },
  amenity: { marginTop: 8, display: "flex", justifyContent: "center" },
  toggleAmenities: {
    fontWeight: "bold",
    fontSize: "1.2em",
    cursor: "pointer",
  },
};

class AccommodationsDetail extends React.Component {
  state = { accommodation: undefined, imageIndex: 0 };

  componentDidMount() {
    const path = this.props.match.params.id;
    fetch(`accommodations/${path}`).then(result => {
      if (result === undefined) {
        this.props.history.replace("/404");
      } else {
        this.setState({ accommodation: result });
      }
    });
  }

  nextImage = () => {
    const { imageIndex, accommodation } = this.state;
    const newIndex = imageIndex < accommodation.images.length - 1 ? imageIndex + 1 : 0;
    this.setState({ imageIndex: newIndex });
  };

  previousImage = () => {
    const { imageIndex, accommodation } = this.state;
    const newIndex = imageIndex > 0 ? imageIndex - 1 : accommodation.images.length - 1;
    this.setState({ imageIndex: newIndex });
  };

  toggleAmenities = () => {};

  render() {
    const maxAmenities = 6;
    if (!this.state.accommodation) return null;
    return (
      <div className={this.props.classes.root}>
        <header className={this.props.classes.image}>
          {this.state.accommodation.images.length > 1 && (
            <div className={this.props.classes.arrow} onClick={this.previousImage}>
              <CaretLeftIcon />
            </div>
          )}
          <img
            className={this.props.classes.imageCover}
            src={this.state.accommodation.images[this.state.imageIndex]}
            alt={this.state.accommodation.name}
          />
          {this.state.accommodation.images.length > 1 && (
            <div className={this.props.classes.arrow} onClick={this.nextImage}>
              <CaretRightIcon />
            </div>
          )}
        </header>
        <main>
          <h2>{this.state.accommodation.name}</h2>
          <div className={this.props.classes.subHeader}>{this.state.accommodation.location}</div>
          <p>{this.state.accommodation.description}</p>
        </main>
        <div className={this.props.classes.amenities}>
          <Grid container spacing={24}>
            {this.state.accommodation.amenities.map(
              (amenity, index) =>
                index < maxAmenities && (
                  <Grid key={index} item xs={6} className={this.props.classes.amenity}>
                    <span>{amenity.replace(/^\w/, c => c.toUpperCase())}</span>
                  </Grid>
                )
            )}
          </Grid>
          {this.state.accommodation.amenities.length > maxAmenities && (
            <Grid item xs={12} className={this.props.classes.amenity}>
              <div onClick={this.toggleAmenities} className={this.props.classes.toggleAmenities}>
                <span>....</span>
              </div>
            </Grid>
          )}
        </div>
        <footer />
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(AccommodationsDetail));
