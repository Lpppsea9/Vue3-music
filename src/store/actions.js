import { PLAY_MODE } from "@/assets/js/constant";
import { shuffle } from "@/assets/js/util";

export function selectPlay({ commit }, { list, index }) {
  commit("setPlayingState", true);
  commit("setSquenceList", list);
  commit("setPlayList", list);
  commit("setPlayMode", PLAY_MODE.sequence);
  commit("setCurrentIndex", index);
  commit("setFullScreen", true);
}

export function randomPlay({ commit }, list) {
  commit("setPlayingState", true);
  commit("setSquenceList", list);
  commit("setPlayList", shuffle(list));
  commit("setPlayMode", PLAY_MODE.random);
  commit("setCurrentIndex", 0);
  commit("setFullScreen", true);
}

export function changeMode({ commit, state, getters }, mode) {
  console.log("state对象", state);
  const currentId = getters.currentSong.id;
  if (mode === PLAY_MODE.random) {
    commit("setPlayList", shuffle(state.sequenceList));
  } else {
    commit("setPlayList", state.sequenceList);
  }
  /*
  如果随机播放的话找到随机过后的playlist正在播放的歌所在索引
  赋值currentIndex为当前索引，不切换
   */
  const curIndex = state.playlist.findIndex((song) => {
    return song.id === currentId;
  });

  commit("setCurrentIndex", curIndex);
  commit("setPlayMode", mode);
}
