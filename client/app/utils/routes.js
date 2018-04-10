import React from "react";
import { Switch, Route } from "react-router";
import { withStyles } from "material-ui/styles";
import PlaylistPage from "../containers/PlaylistPage";
import SearchPage from "../containers/SearchPage";

let styles = theme => ({
  page: {
    marginLeft: 180,
    height: "100%",
    background: theme.palette.secondary.dark
  }
});

class Routes extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.page}>
        <Switch>
          <Route exact path="/" component={SearchPage}/>
          <Route exact path="/playlists" component={PlaylistPage} />
        </Switch>
      </div>
    );
  }
}
export default withStyles(styles)(Routes);