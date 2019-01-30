import * as React from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import AccommodationCard from "../AccommodationCard/AccommodationCard";
import { getAllAccommodations } from "../../store/accommodations/actions";

const styles = {
  cardGrid: {
    padding: 8,
  },
};

class Accommodations extends React.Component {
  componentDidMount() {
    this.props.getAllAccommodations();
  }

  render() {
    if (!this.props.accommodations) return null;

    return (
      <div className={this.props.classes.root}>
        <main>
          <Grid container spacing={24} className={this.props.classes.cardGrid}>
            {this.props.accommodations &&
              this.props.accommodations.map((accommodation, index) => (
                <AccommodationCard accommodation={accommodation} key={index} />
              ))}
          </Grid>
        </main>
      </div>
    );
  }
}

const mapStateToProps = accommodations => accommodations;
const mapDispatchToProps = { getAllAccommodations };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Accommodations));
