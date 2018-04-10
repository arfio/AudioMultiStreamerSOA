import React, { Component } from "react";
import { withStyles } from "material-ui/styles";
import { Drawer, ListItem, ListItemText, List, ListItemIcon } from "material-ui";
import { Home, FormatListBulleted, Magnify } from "mdi-material-ui"
import { Link } from "react-router-dom";

const styles = theme => ({
  drawerPaper: {
    width: 180,
    paddingTop: 65,
    background: theme.palette.primary.light,
  },
});

class Menu extends Component {
  renderMenuItems() {
    return (
      <div>
        <ListItem button component={Link} to="/">
          <ListItemIcon><Magnify/></ListItemIcon><ListItemText primary="Search"/>
        </ListItem>
        <ListItem button component={Link} to="/playlists">
          <ListItemIcon><FormatListBulleted/></ListItemIcon><ListItemText primary="Playlists"/>
        </ListItem>
      </div>
    );
  }

  render() {
    const { classes } = this.props;
    return (
      <Drawer open={true} variant="permanent"
        classes={{ paper: classes.drawerPaper }}>
        <List>{this.renderMenuItems()}</List>
      </Drawer>
    );
  }
}
export default withStyles(styles)(Menu);