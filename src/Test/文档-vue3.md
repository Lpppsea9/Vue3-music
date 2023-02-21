1. vue3 新功能
2. Composition API

# Vue3 面试题

1. Vue3 比 Vue2 有什么优势？
2. 描述 Vue3 生命周期
   - options API 生命周期(有两个改名字了)
   - composition 生命周期
   - setup
3. 如何看待 Composition API 和 Options API？
   - Composition API 带来了什么？
     - 更好的代码组织
     - 更好的逻辑复用
     - 更好的类型推导
   - Composition API 和 Options API 如何选择？

###### 如何理解 ref toRef 和 toRefs？

- ref
  - 生成值类型的响应式数据
  - 可用于模板和 reactive
  - 通过 .value 修改值
- toRef
- toRefs
- 总结:
  > - 用 reactive 做对象的响应式,用 ref 做值类型的响应式
  > - setup 中返回 toRefs(state),或者 toRef(state, 'xxx')
  > - ref 的变量命名都用 xxxRef
  > - 合成函数返回响应式对象时,使用 toRefs

1. 为何需要 ref

   - 返回值类型，会丢失响应式
   - 如在 setup, computed, 合成函数中, 都有可能返回值类型

2. 为什么需要.value

   - ref 是一个对象(不丢失响应式),value 存储值
   - 通过.value 的 get 和 set
   - computed 返回的是一个类似于 ref

3. 为什么需要 toRef 和 toRefs

   - 初衷: 不丢失响应式的情况下，把对象数据分解/扩散
   - 前提: 针对的是响应式对象(reactive 封装的)非普通对象
   - 注意: toRef 和 toRefs **不创造**响应式，而是**延续**响应式

4. Vue3 升级了哪些重要的功能？

   - createApp
   - 生命周期
   - emits 属性
   - Fragment(可以输出多节点)
   - 移除.sync
   - 异步组件 defineAsyncComponent
   - 移除 filter(基本没用过)
   - teleport (to="body")例子弹窗
   - Suspense 基于插槽实现
   - Composition API
     > - reactive
     > - ref 相关
     > - readonly
     > - watch 和 watchEffect
     > - setup
     > - 生命周期钩子函数

5. Composition API 如何实现代码逻辑复用？

   - 例子: useMousePosition

6. Vue3 如何实现响应式？

   - Vue2 是怎么实现的(defineProperty)
   - Object.defineProperty 的缺点
     > - 深度监听需要一次性递归
     > - 无法监听新增属性/删除属性(vue.$set/$delete)
     > - 无法监听原生数组
   - Proxy 和 Reflect
   - Reflect 作用

     > - 和 Proxy 能力一一对应
     > - 规范化、标准化、函数式

   - 深度监听性能如何提升

     - Vue2 的深度监听是上来直接递归到底,
     - Vue3 是 get 里面递归, 什么时候用什么时候递归（获取哪一层就把哪一层处理成响应式）

   - 总结

     - 优点 Proxy 能规避 Object.defineProperty 的问题
       > - 深度监听,性能更好
       > - 可监听 新增/删除 属性
       > - 可监听数组变化
     - 缺点 Proxy 无法兼容所有浏览器,无法 polyfill

7. Vue3 移除.sync 用法

   - 子组件需在 emits 属性里写["update:xxx"]来触发父组件绑定值改变

8. watch 和 watchEffect 的区别是什么？

   - watch(xxxRef, (newVal,oldVal) => {},{配置})
   - watch(() => state.xxx, (newVal,oldVal) = {}， {配置}) -> getter 函数
   - watchEffect(为什么初始化需要执行？->因为要收集需要监听的属性)

9. setup 中如何获取组件实例？

   - 考察在 setup 和其他 Composition API 中是没有 this 的
   - 可通过 getCurrentInstance 获取当前实例
   - 若使用 Options API 可照常使用 this

10. Vue3 为何比 Vue2 快？
11. Vite 是什么？
12. Composition API 和 React Hooks 的对比
