import * as React from "react";
import { connect } from "react-redux";
import { withStyles, MenuItem, InputLabel, FormControl, Select, Input, Button } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import { TextField } from "@material-ui/core";
import { createAccommodation } from "../../store/accommodations/actions";

const styles = {
  root: {
    margin: 32,
    display: "flex",
    flexDirection: "column",
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
    margin: 32,
  },
  submit: {
    backgroundColor: "red",
    color: "white",
  },
};

class CreateAccommodation extends React.Component {
  state = {
    name: "",
    location: "",
    imgUrl: "",
    description: "",
    amenities: [],
  };

  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleChangeAmenities = event => {
    this.setState({ amenities: event.target.value });
  };

  submit = async () => {
    const { imgUrl, ...accommodation } = this.state;
    accommodation.images = [imgUrl];
    this.props.createAccommodation(accommodation);
    this.props.history.push("/");
  };

  render() {
    const amenities = [
      "Beddegoed",
      "Centrale verwarming",
      "Droger",
      "EHBO Kit",
      "Parkeerplek",
      "Stofzuiger",
      "Strijkijzer",
      "TV",
      "Verduisterende gordijnen",
      "Verwarming",
      "Wieg",
      "WiFi",
      "Zeep",
    ];
    return (
      <div className={this.props.classes.root}>
        Accommodatie aanmaken
        <TextField id="name" required label="Naam" value={this.state.name} onChange={this.handleChange} />
        <TextField id="location" required label="Locatie" value={this.state.location} onChange={this.handleChange} />
        <TextField id="imgUrl" required label="Foto URL" value={this.state.imgUrl} onChange={this.handleChange} />
        <TextField
          id="description"
          required
          label="Beschrijving"
          value={this.state.description}
          onChange={this.handleChange}
        />
        <FormControl>
          <InputLabel>Faciliteiten</InputLabel>
          <Select
            multiple
            value={this.state.amenities}
            onChange={this.handleChangeAmenities}
            input={<Input id="amenities" />}
          >
            {amenities.map(amenity => (
              <MenuItem key={amenity} value={amenity}>
                {amenity}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div className={this.props.classes.buttons}>
          <Button className={this.props.classes.submit} onClick={this.submit}>
            Aanmaken
          </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = accommodation => accommodation;
const mapDispatchToProps = { createAccommodation };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(withRouter(CreateAccommodation)));
