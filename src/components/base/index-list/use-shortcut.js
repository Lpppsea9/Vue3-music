import { ref, computed } from 'vue'

export default function useShortcut (props, groupRef) {
  const scrollRef = ref(null)
  const ANCHOR_HEIGHT = 18

  const shortcutList = computed(() => {
    return props.singersDataList.map(item => {
      return item.title
    })
  })

  const touch = {}
  function onShortcutTouchStart (e) {
    touch.scY1 = e.touches[0].pageY
    const anchorIndex = parseInt(e.target.dataset.index)
    touch.anchorIndex = anchorIndex

    // const scroll = scrollRef.value.scroll
    // const targetElm = groupRef.value.children[anchorIndex] // 当前左侧列表每一小块元素列表(热、A)
    // scroll.scrollToElement(targetElm)
    scrollTo(anchorIndex)
  }

  function onShortcutTouchMove (e) {
    // const scY2 = e.target.dataset.index
    touch.scY2 = e.touches[0].pageY
    const delta = Math.floor((touch.scY2 - touch.scY1) / ANCHOR_HEIGHT)
    const anchorIndex = touch.anchorIndex + delta

    // const scroll = scrollRef.value.scroll
    // const targetElm = groupRef.value.children[delta] // 当前左侧列表每一小块元素列表(热、A)
    // scroll.scrollToElement(targetElm)
    scrollTo(anchorIndex)
  }

  function scrollTo (index) {
    console.log('index--->', index)
    if (isNaN(index)) {
      return
    }
    index = Math.max(0, Math.min(shortcutList.value.length - 1, index))
    // index = Math.max(0, Math.min(shortcutList.value.length - 1, index))

    const scroll = scrollRef.value.scroll
    const targetElm = groupRef.value.children[index] // 当前左侧列表每一小块元素列表(热、A)
    scroll.scrollToElement(targetElm)
  }

  return {
    shortcutList,
    scrollRef,
    onShortcutTouchStart,
    onShortcutTouchMove
  }
}
