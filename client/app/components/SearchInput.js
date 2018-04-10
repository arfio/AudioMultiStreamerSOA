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

class SearchInput extends Component {
  render() {
    const { classes } = this.props;
    return (
      <TextField
        id="searchfield"
        label="Search"
        value={this.props.query}
        onKeyDown={(e) => {if (e.key == "Enter") this.props.handleSearch(e)}}
        margin="normal"
        className={classes.root}
      />
    );
  }
}
SearchInput.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  query: PropTypes.string
};

export default withStyles(styles)(SearchInput);