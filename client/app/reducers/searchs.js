import { handleActions } from "redux-actions";
import { getAllApis } from "../utils/apis";
import actionList from "../actions/actionList";

export default handleActions({
  [actionList.searchPending]: (state, action) => {
    const apiList = getAllApis();
    let promises = Array();
    apiList.forEach((api) => {
      promises.push(api.searchMusic(action.payload));
    });

    Promise.all(promises)
    .then((results) => {
      return results.reduce((previous, current, index) => {
        previous.push(...apiList[index].extractMusicObjectFromResult(current));
        return previous;
      }, []);
    })
    .then((tracks) => {
      action.asyncDispatch(actionList.searchSuccess(tracks));
    });
    return { ...state, query: action.payload };
  },

  [actionList.searchSuccess]: (state, action) => {
    return { ...state, tracks: action.payload };
  }
}, {});
