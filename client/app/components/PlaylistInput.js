import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import { TextField } from "material-ui";

const styles = theme => ({
  root: {
    margin: 20,
    width: "50vw",
  }
});

class PlaylistInput extends Component {
  render() {
    const { classes } = this.props;
    return (
      <TextField
        id="searchfield"
        label="Playlist name"
        onKeyDown={(e) => {if (e.key == "Enter") this.props.handleCreatePlaylist(e)}}
        margin="normal"
        className={classes.root}
      />
    );
  }
}
PlaylistInput.propTypes = {
  handleCreatePlaylist: PropTypes.func.isRequired
};

export default withStyles(styles)(PlaylistInput);