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
7. watch 和 watchEffect 的区别是什么？
8. setup 中如何获取组件实例？
9. Vue3 为何比 Vue2 快？
10. Vite 是什么？
11. Composition API 和 React Hooks 的对比
