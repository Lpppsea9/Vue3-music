import { createStore, createLogger } from "vuex";
import state from "./state";
import mutations from "./mutations";
import * as getters from "./getters";
import * as actions from "./actions";
const debug = process.env.NODE_ENV !== "production";

// console.log("debug", debug);

export default createStore({
  state,
  getters,
  mutations,
  actions,
  // modules: {},
  strict: debug,
  plugins: debug ? [createLogger()] : [],
});
