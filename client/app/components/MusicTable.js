import React, { Component } from "react";
import PropTypes from "prop-types";
import { Typography, Paper, Button, IconButton, Table,
  TableBody, TableCell, TableHead, TableRow, Menu, MenuItem } from "material-ui";
import { withStyles } from "material-ui/styles";
import { Play, PlaylistPlus, Soundcloud } from "mdi-material-ui";

const styles = theme => ({
  root: {
    margin: "auto",
    width: "100%",
    overflowX: "auto",
  },
  table: {
    minWidth: 700,
    maxWidth: 700
  },
});

class MusicTable extends Component {
  state = {
    anchorEl: null,
    track: null,
  };

  formatTime(duration) {
    const formattedTime = ("00" + Math.floor(duration / 60).toString()).slice(-2) + ":" +
      ("00" + (duration % 60).toString()).slice(-2);
    if (duration > 3600)
      return ("00" + Math.floor(duration / 3600).toString()).slice(-2) + ":" +
        formattedTime;
    return formattedTime;
  }

  handleOpenMenu = (event, track) => {
    this.setState({ anchorEl: event.currentTarget, track: track });
  };

  handleCloseMenu = () => {
    this.setState({ anchorEl: null, track: null });
  };

  isTrackInPlaylist = (playlistKey) => {
    if (this.props.playlists[playlistKey] === undefined)
      return false;
    return this.props.playlists[playlistKey].find(t => t.musicId === this.state.track.musicId);
  };

  renderTableHead = () => {
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox"></TableCell>
          <TableCell padding="checkbox">Track title</TableCell>
          <TableCell padding="checkbox">Author</TableCell>
          <TableCell numeric>Duration</TableCell>
          <TableCell padding="checkbox">Add to playlist</TableCell>
        </TableRow>
      </TableHead>
    );
  };

  renderTableBody = () => {
    const { classes, tracks } = this.props;
    return (
      <TableBody>
        {tracks.map(t => {
          return (
            <TableRow key={t.musicId}>
              <TableCell padding="checkbox">
                <IconButton aria-label="Play/pause" onClick={() => this.props.play(t)}>
                  <Play/>
                </IconButton>
              </TableCell>
              <TableCell padding="checkbox">
                {t.title}
                <div>
                  {t.provider == "SoundcloudApi" && <Soundcloud/>}
                  {t.provider == "DeezerApi" && "Deezer"}
                  {t.provider == "JamendoApi" && "Jamendo"}
                </div>
              </TableCell>
              <TableCell padding="checkbox">{t.author}</TableCell>
              <TableCell numeric>{this.formatTime(t.duration)}</TableCell>
              <TableCell padding="checkbox">
                <IconButton onClick={(event) => this.handleOpenMenu(event, t)}>
                  <PlaylistPlus/>
                </IconButton>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    );
  };

  renderPlaylistMenu = () => {
    const { anchorEl, track } = this.state;
    return (
      <Menu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={this.handleCloseMenu}>
      {this.props.playlists.map(playlist =>
        <MenuItem
          key={playlist}
          selected={this.isTrackInPlaylist(playlist)}
          onClick={() => {
            this.props.addRemoveTrackPlaylist(this.state.track, playlist);
            this.setState({ anchorEl: null });
          }}
        >
          {playlist}
        </MenuItem>
      )}
    </Menu>
    );
  };

  render() {
    const { classes, tracks } = this.props;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          {this.renderTableHead()}
          {this.renderTableBody()}
        </Table>
        {this.renderPlaylistMenu()}
      </Paper>
    );
  }
}
MusicTable.propTypes = {
  tracks: PropTypes.array.isRequired,
  playlists: PropTypes.array.isRequired,
  play: PropTypes.func.isRequired,
  addRemoveTrackPlaylist: PropTypes.func.isRequired,
};

export default withStyles(styles)(MusicTable);