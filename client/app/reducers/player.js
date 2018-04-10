import { handleActions } from "redux-actions";
import { getApi } from "../utils/apis";
import actionList from "../actions/actionList";

export default handleActions({
  [actionList.playPending]: (state, action) => {
    // Pause previous music before starting a new one.
    let player = {};
    if (Object.getOwnPropertyNames(state.track).length > 0 &&
        Object.getOwnPropertyNames(state.player).length > 0) {
      const previousApi = getApi(state.track.provider);
      player = previousApi.pauseMusic(state.player, state.track);
    }

    const api = getApi(action.payload.provider);
    api.playMusic(action.payload)
    .then((player) => {
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
    const api = getApi(state.track.provider);
    api.playMusic(state.track)
    .then((player) => {
      const newPlayer = api.pauseMusic(player, state.track);
      action.asyncDispatch(actionList.playSuccess(newPlayer));
    });
    return { ...state, player: { isLoading: true } };
  },

  [actionList.pause]: (state, action) => {
    const api = getApi(state.track.provider);
    const player = api.pauseMusic(state.player, state.track);
    return { ...state, player: player };
  },

  [actionList.resume]: (state, action) => {
    const api = getApi(state.track.provider);
    const player = api.resumeMusic(state.player, state.track);
    return { ...state, player: player };
  },
}, {track: {}, player: {}});
