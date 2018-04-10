import { combineReducers } from "redux";
import search from "./searchs";
import player from "./player";
import playlists from "./playlists";

const rootReducer = combineReducers({
  search,
  player,
  playlists
});

export default rootReducer;