import React, { Component } from "react";
import { connect } from "react-redux";
import { AppBar, Tabs, Tab, Button } from "material-ui";
import { Close } from "mdi-material-ui";
import actionList from "../actions/actionList";
import Store from "electron-store";
import PlaylistInput from "../components/PlaylistInput";
import MusicTable from "../components/MusicTable";

function retrievePlaylists() {
  const store = new Store();
  return store.get("playlists", {});
}

class PlaylistPage extends Component {
  handleCreatePlaylist = (event) => {
    this.props.createPlaylist(event.target.value);
  }

  handleSelectPlaylist = (event, value) => {
    this.props.selectPlaylist(value);
  }

  handlePlayPlaylist = (track) => {
    this.props.playPlaylist(track);
    this.props.play(track);
  }

  handleAddRemoveTrackPlaylist = (name, track) => {
    this.props.addRemoveTrackPlaylist(name, track);
  }

  handleDeletePlaylist = () => {
    this.props.deletePlaylist(
      Object.keys(this.props.playlists)[this.props.currentDisplayedPlaylist]);
  }

  render() {
    const playlists = retrievePlaylists();
    return (
      <div>
        <PlaylistInput handleCreatePlaylist={this.handleCreatePlaylist}/>
        <Button onClick={this.handleDeletePlaylist}>
          Delete Current Playlist
        </Button>
        <AppBar position="static" color="default">
          <Tabs
            value={this.props.currentDisplayedPlaylist}
            onChange={(event, value) => this.handleSelectPlaylist(event, value)}
            background="secondary"
            scrollable
            scrollButtons="auto"
          >
            {Object.keys(playlists).map(playlistKey => {
              return <Tab label={playlistKey} key={playlistKey}/>;
            })}
          </Tabs>
        </AppBar>
        {Object.keys(playlists).map((playlistKey, index) => {
          return (
            <div key={playlistKey}>
              {this.props.currentDisplayedPlaylist === index &&
                <MusicTable
                  tracks={playlists[playlistKey] || Array()}
                  playlists={Object.keys(this.props.playlists)}
                  play={this.handlePlayPlaylist}
                  addRemoveTrackPlaylist={this.handleAddRemoveTrackPlaylist}
                />
              }
            </div>
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    playlists: state.index.playlists.playlists,
    currentDisplayedPlaylist: state.index.playlists.currentDisplayedPlaylist,
    currentPlaylist: state.index.playlists.currentPlaylist,
    currentTrack: state.index.playlists.currentTrack,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    play: (track) => { dispatch(actionList.playPending(track)); },
    createPlaylist: (name) => { dispatch(actionList.createPlaylist(name)); },
    deleteFromPlaylist: (name, track) => { dispatch(actionList.deleteFromPlaylist(name, track)); },
    deletePlaylist: (name) => { dispatch(actionList.deletePlaylist(name)); },
    playPlaylist: (track) => { dispatch(actionList.playPlaylist(track)) },
    selectPlaylist: (index) => { dispatch(actionList.selectPlaylist(index)); },
    addRemoveTrackPlaylist: (name, track) => {
      dispatch(actionList.addRemoveTrackPlaylist([name, track])); },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PlaylistPage);