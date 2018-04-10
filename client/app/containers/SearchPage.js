import React, { Component } from "react";
import { connect } from "react-redux";
import actionList from "../actions/actionList";
import SearchInput from "../components/SearchInput";
import MusicTable from "../components/MusicTable";

class SearchPage extends Component {
  handleSearch = (event) => {
    this.props.search(event.target.value);
  };

  handlePlay = (track) => {
    this.props.play(track);
  };

  handleAddRemoveTrackPlaylist = (name, track) => {
    this.props.addRemoveTrackPlaylist(name, track);
  };

  render() {
    return (
      <div>
        <SearchInput handleSearch={this.handleSearch}/>
        <MusicTable
          tracks={this.props.tracks || Array()}
          playlists={Object.keys(this.props.playlists)}
          play={this.handlePlay}
          addRemoveTrackPlaylist={this.handleAddRemoveTrackPlaylist}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    query: state.index.search.query,
    tracks: state.index.search.tracks,
    playlists: state.index.playlists.playlists,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    search: (query) => { dispatch(actionList.searchPending(query)); },
    play: (track) => { dispatch(actionList.playPending(track)); },
    addRemoveTrackPlaylist: (name, track) => {
      dispatch(actionList.addRemoveTrackPlaylist([name, track])); },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);