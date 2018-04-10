import { createAction } from "redux-actions";

export default {
  // search actions
  searchPending: createAction("SEARCH_PENDING"),
  searchSuccess: createAction("SEARCH_SUCCESS"),

  // player actions
  playPending: createAction("PLAY_PENDING"),
  playSuccess: createAction("PLAY_SUCCESS"),
  resume: createAction("RESUME"),
  pause: createAction("PAUSE"),
  initialize: createAction("INITIALIZE"),

  // playlist actions
  createPlaylist: createAction("CREATE_PLAYLIST"),
  addRemoveTrackPlaylist: createAction("ADD_REMOVE_TRACK_PLAYLIST"),
  deletePlaylist: createAction("DELETE_PLAYLIST"),
  playPlaylist: createAction("PLAY_PLAYLIST"),
  selectPlaylist: createAction("SELECT_PLAYLIST"),
  next: createAction("NEXT"),
  previous: createAction("PREVIOUS"),
};
