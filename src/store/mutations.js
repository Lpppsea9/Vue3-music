const mutations = {
  setPlayingState(state, playing) {
    state.playing = playing;
  },
  setSquenceList(state, list) {
    state.sequenceList = list;
  },
  setPlayList(state, list) {
    state.playlist = list;
  },
  setPlayMode(state, mode) {
    state.playMode = mode;
  },
  setCurrentIndex(state, index) {
    state.currentIndex = index;
  },
  setFullScreen(state, fullScreen) {
    state.fullScreen = fullScreen;
  },
  setFavoriteList(state, list) {
    state.favorList = list;
  },
};
export default mutations;
