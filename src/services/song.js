import { get } from "./base";

export function processSongs(songs) {
  if (!songs.length) {
    return Promise.resolve(songs);
  }
  return get("/api/getSongsUrl", {
    mid: songs.map((item) => {
      return item.mid;
    }),
  }).then((result) => {
    console.log("song请求", result);
    const map = result.map;
    return songs
      .map((song) => {
        song.url = map[song.mid];
        // song.url = "";
        return song;
      })
      .filter((song) => {
        return song.url && song.url.indexOf("vkey") > -1;
      });
  });
}
