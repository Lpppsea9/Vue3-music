// const data = {
//   age: 25,
//   name: "刘鹏",
// };

const data = ["a", "b", "c"];
const proxyData = new Proxy(data, {
  get(target, key, receiver) {
    const ownKeys = Reflect.ownKeys(target);
    if (ownKeys.includes(key)) {
      console.log("includes get", key);
    }
    const result = Reflect.get(target, key, receiver);
    console.log("get", key);
    return result; // 返回结果
  },
  set(target, key, val, receiver) {
    if ((val = target[key])) {
      return true;
    }
    const result = Reflect.set(target, key, val, receiver);
    console.log("set", key);
    // console.log("result", result); //true
    return result; // 是否设置成功
  },
  deleteProperty(target, key) {
    const result = Reflect.deleteProperty(target, key);
    console.log("delete property", key);
    // console.log("result", result); //true
    return result; // 是否设置成功
  },
});

console.log(proxyData);
