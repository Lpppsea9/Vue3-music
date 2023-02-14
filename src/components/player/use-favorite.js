import { useStore } from "vuex";
import { computed } from "vue";
import { FAVORITE_KEY } from "@/assets/js/constant";
import { remove, save } from "@/assets/js/array-store";

export default function useFavorite() {
  const store = useStore();
  const favList = computed(() => store.state.favorList);

  function getFavoriteIcon(currSong) {
    return isFavorite(currSong) ? "icon-favorite" : "icon-not-favorite";
  }

  function toggleFavorite(currSong) {
    let list;
    if (isFavorite(currSong)) {
      // remove
      console.log("取消收藏");
      // 本地存在fav
      // if (localStorage.getItem(FAVORITE_KEY)) {
      //   const locList = localStorage.getItem(FAVORITE_KEY);
      // }
      list = remove(FAVORITE_KEY, compare);
    } else {
      // save
      console.log("添加收藏");
      list = save(currSong, FAVORITE_KEY, compare);
    }
    store.commit("setFavoriteList", list);
    function compare(item) {
      return item.id === currSong.id;
    }
  }

  function isFavorite(song) {
    return (
      favList.value.findIndex((item) => {
        return item.id === song.id;
      }) > -1
    );
  }

  return {
    toggleFavorite,
    getFavoriteIcon,
  };
}
