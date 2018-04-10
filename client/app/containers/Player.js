import React, { Component } from "react";
import { connect } from "react-redux";
import Sound from "react-sound";
import { Typography, IconButton, CircularProgress } from "material-ui";
import { Play, Pause, SkipPrevious, SkipNext } from "mdi-material-ui";
import actionList from "../actions/actionList";
import PlayerBar from "../components/PlayerBar";


class Player extends Component {
  state = {
    position: 0,
  }

  componentDidMount() {
    this.props.initialize();
  }

  handleResume = () => {
    this.props.resume();
  };

  handlePause = () => {
    this.props.pause();
  };

  handleNext = () => {
    this.props.next();
  };

  handlePrevious = () => {
    this.props.previous(this.state.position);
  };

  onPause = (audioPlayer) => {
    this.setState({
      position: audioPlayer.position,
    });
  };

  render() {
    const { player, track } = this.props;
    return (
      <PlayerBar>
        <Sound
          url={player.path || ""}
          playStatus={player.status || Sound.status.STOPPED}
          playFromPosition={this.state.position}
          onFinishedPlaying={this.handleNext}
          onPause={this.onPause}
          onLoad={()=>{this.setState({position:0});}}
          volume={10}
        />
        <Typography>
          {!track && "No music"}
          {track && track.title}
        </Typography>
        <IconButton onClick={() => this.handlePrevious()}><SkipPrevious/></IconButton>
        {(player.isPlaying && !player.isLoading) &&
          <IconButton onClick={() => this.handlePause()}><Pause/></IconButton>}
        {(!player.isPlaying && !player.isLoading) &&
          <IconButton onClick={() => this.handleResume()}><Play/></IconButton>}
        {player.isLoading && <CircularProgress color="secondary"/>}
        <IconButton onClick={() => this.handleNext()}><SkipNext/></IconButton>
      </PlayerBar>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    player: state.index.player.player,
    track: state.index.player.track,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initialize: (track) => { dispatch(actionList.initialize(track)); },
    resume: () => { dispatch(actionList.resume()); },
    pause: () => { dispatch(actionList.pause()); },
    next: () => { dispatch(actionList.next()); },
    previous: () => { dispatch(actionList.previous()); },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Player);