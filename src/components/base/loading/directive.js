import Loading from "./loading.vue";
// import { createApp } from "vue";
// import { addClass, removeClass } from "@/assets/js/dom";
import createLoadingLikeDirective from "@/assets/js/create-loading-like-directive";

// const relativeCls = "g-relative";

const loadingDirective = createLoadingLikeDirective(Loading);

export default loadingDirective;
