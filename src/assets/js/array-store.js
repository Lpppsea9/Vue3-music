function insertArray(arr, currSong, compare) {
  // 判断本地是否存在当前播放的歌曲 循环调用compare函数
  console.log("arr=>", Array.isArray(arr));
  const index = arr.findIndex(compare);
  console.log("insertArr", index);
  if (index > -1) {
    return;
  }
  arr.unshift(currSong);
}

function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare);
  if (index > -1) {
    arr.splice(index, 1);
  }
}

export function remove(key, compare) {
  const items = JSON.parse(localStorage.getItem(key)) || [];
  deleteFromArray(items, compare);
  localStorage.setItem(key, JSON.stringify(items));
  return items;
}

export function save(currSong, key, compare) {
  // 获取本地存储的播放列表
  const items = JSON.parse(localStorage.getItem(key)) || [];
  insertArray(items, currSong, compare);
  localStorage.setItem(key, JSON.stringify(items));

  return items;
}
