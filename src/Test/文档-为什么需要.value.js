function computed(getter) {
  let value = 0;
  setTimeout(() => {
    value = getter();
  }, 1500);
  return value;
}
let a = 0;
a = computed(() => 100);
console.log(a);

// 思考？为什么ref通过下面的方法实现
function computed2(getter) {
  const ref = {
    value: null,
  };
  setTimeout(() => {
    ref.value = getter();
  }, 1500);
  return ref;
}
let b = {};
b = computed2(() => 100);
console.log(b);
