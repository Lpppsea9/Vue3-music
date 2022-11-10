import Loading from './loading.vue'
import { createApp } from 'vue'
import { addClass, removeClass } from '@/assets/js/dom'
import createLoadingLikeDirective from '@/assets/js/create-loading-like-directive'

const relativeCls = 'g-relative'

const loadingDirective = createLoadingLikeDirective(Loading)

// const loadingDirective = {
//   mounted (el, binding) {
//     const app = createApp(Loading)
//     const instance = app.mount(document.createElement('div'))
//     el.instance = instance

//     const title = binding.arg
//     if (typeof title !== 'undefined') {
//       instance.setTitle(title)
//     }

//     if (binding.value) {
//       append(el)
//     }
//   },

//   updated (el, binding) {
//     const title = binding.arg
//     if (typeof title !== 'undefined') {
//       el.instance.setTitle(title)
//     }
//     if (binding.value !== binding.oldVal) {
//       binding.value ? append(el) : remove(el)
//     }
//   }
// }

// function append (el) {
//   const style = getComputedStyle(el)
//   // debugger
//   if (['absloute', 'fixed', 'relative'].indexOf(style.position) === -1) {
//     addClass(el, relativeCls)
//   }
//   el.appendChild(el.instance.$el)
// }

// function remove (el) {
//   removeClass(el, relativeCls)
//   el.removeChild(el.instance.$el)
// }

export default loadingDirective
