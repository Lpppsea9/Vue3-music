import { PLAY_MODE } from "@/assets/js/constant";

const state = {
  sequenceList: [],
  playlist: [],
  playing: false,
  playMode: PLAY_MODE.squence, // 0
  currentIndex: 0,
  fullScreen: false,
};

export default state;
