import { handleActions } from "redux-actions";
import { getApi } from "../utils/apis";
import actionList from "../actions/actionList";
import Sound from "react-sound";
import request from "request";
import temp from "temp";
import fs from "fs";

const playerUri = "http://localhost:3002/player/";

function playMusic(track) {
  const inputStream = fs.createWriteStream(temp.path({suffix: ".mp3"}));
  return new Promise(function(resolve, reject) {
    request.get(playerUri + "play/" + track.provider)
      .form({ track: JSON.stringify(track) })
      .pipe(inputStream)
      .on("finish", () => {
        resolve({
          path: inputStream.path,
          status: Sound.status.PLAYING,
          isPlaying: true,
          position: 0,
          musicId: track.musicId,
        });
      });
  });
}

function pauseMusic(player, track) {
  return { ...player, status: Sound.status.PAUSED, isPlaying: false };
}

function resumeMusic(player, track) {
  return { ...player, status: Sound.status.PLAYING, isPlaying: true };
}

export default handleActions({
  [actionList.playPending]: (state, action) => {
    // Pause previous music before starting a new one.
    let player = {};
    if (Object.getOwnPropertyNames(state.track).length > 0 &&
        Object.getOwnPropertyNames(state.player).length > 0) {
      player = pauseMusic(state.player, state.track);
    }

    playMusic(action.payload).then((player) => {
      action.asyncDispatch(actionList.playSuccess(player));
    });
    return { ...state, track: action.payload, player: { ...player, isLoading: true }};
  },

  [actionList.playSuccess]: (state, action) => {
    // This case arises when a track arrives after another even if it was played before.
    if (action.payload.musicId !== state.track.musicId) {
      return { ...state };
    }
    return { ...state, player: action.payload };
  },

  [actionList.initialize]: (state, action) => {
    if (Object.getOwnPropertyNames(state.track).length == 0) {
      return { ...state };
    }
    playMusic(state.track).then((player) => {
      const newPlayer = pauseMusic(player, state.track);
      action.asyncDispatch(actionList.playSuccess(newPlayer));
    });
    return { ...state, player: { isLoading: true } };
  },

  [actionList.pause]: (state, action) => {
    const player = pauseMusic(state.player, state.track);
    return { ...state, player: player };
  },

  [actionList.resume]: (state, action) => {
    const player = resumeMusic(state.player, state.track);
    return { ...state, player: player };
  },
}, {track: {}, player: {}});
