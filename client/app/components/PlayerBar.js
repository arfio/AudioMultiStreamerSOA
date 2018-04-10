import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import { AppBar, Toolbar, ToolbarGroup, Typography } from "material-ui";

let styles = theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    textAlign: "center",
  },
  pageTitle: theme.typography.button,
  children: {
    marginRight: "auto",
    marginLeft: "auto",
  }
});

class PlayerBar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <AppBar position="sticky" color="default" className={classes.appBar}>
        <Toolbar>
          <Typography className={classes.pageTitle}><b>Audio</b>MultiStreamer</Typography>
          <div className={classes.children}>
            {this.props.children}
          </div>
        </Toolbar>
      </AppBar>
    );
  }
}
export default withStyles(styles)(PlayerBar);