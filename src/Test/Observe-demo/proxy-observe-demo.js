// 创建响应式
function myReactive(target) {
  if (typeof target !== "object" || target == null) {
    return target;
  }

  const proxyConf = {
    get(target, key, receiver) {
      const ownKeys = Reflect.ownKeys(target);
      if (ownKeys.includes(key)) {
        // 为什么做这一步处理?
      }
      const result = Reflect.get(target, key, receiver);
      console.log("get", result);
      return myReactive(result);
    },
    set(target, key, val, receiver) {
      if (val === target[key]) {
        // 不用重复设置相同的值
        return true;
      }
      const result = Reflect.set(target, key, val, receiver);
      console.log("set", result);
      return result;
    },
    deleteProperty(target, key) {
      const result = Reflect.deleteProperty(target, key);
      console.log("delete", result);
      return result;
    },
  };

  const obeserveObj = new Proxy(target, proxyConf);
  return obeserveObj;
}

const data = {
  age: 18,
  name: "LPPP",
  c: {
    d: "222",
  },
};

const data1 = myReactive(data);
