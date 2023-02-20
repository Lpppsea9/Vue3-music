// 创建响应式
function myReactive(target = {}) {
  if (typeof target !== "object" || target == null) {
    // 不是对象或者数组,则返回
    return target;
  }

  // 代理配置
  const proxyConf = {
    get(target, key, receivers) {
      const ownKeys = Reflect.ownKeys(target);
      if (ownKeys.includes(key)) {
        console.log();
      }
      const result = Reflect.get(target, key, receivers);
      return myReactive(result);
    },

    set(target, key, val, receivers) {
      if ((val = target[key])) {
        return true;
      }
      const result = Reflect.set(target, key, val, receivers);
      return result;
    },

    deleteProperty(target, key) {
      const result = Reflect.deleteProperty(target, key);
      return result;
    },
  };

  // 生成代理对象
  const observed = new Proxy(target, proxyConf);
  return observed;
}

const data = {
  age: 25,
  name: "lppp",
  b: {
    c: "lll",
  },
};

const data1 = myReactive(data);
console.log(data1);
