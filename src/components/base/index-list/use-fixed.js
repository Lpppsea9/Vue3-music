import { computed, nextTick, ref, watch } from 'vue'

export default function useFixed (props) {
  const TITLE_HEIGHT = 30
  const groupRef = ref(null)
  const listHeights = ref([])
  const scrollY = ref(0)
  const currentIndex = ref(0)
  const distance = ref(0)

  const fixedTitle = computed(() => {
    if (scrollY.value < 0) {
      return ''
    }
    const currentGroup = props.singersDataList[currentIndex.value]
    return currentGroup ? currentGroup.title : ''
  })

  const fixedStyle = computed(() => {
    const distanceVal = distance.value
    const diff = (distanceVal > 0 && distanceVal < TITLE_HEIGHT) ? distanceVal - TITLE_HEIGHT : 0
    // console.log(diff)

    return `transform: translate3d(0, ${diff}px, 0)`
  })

  watch(() => props.singersDataList, async () => {
    await nextTick()
    calcuate()
  })

  watch(scrollY, (newY) => {
    const listHeightsVal = listHeights.value
    for (let i = 0; i < listHeightsVal.length; i++) {
      const heightTop = listHeightsVal[i]
      const heightBottom = listHeightsVal[i + 1]
      if (newY >= heightTop && newY <= heightBottom) {
        currentIndex.value = i
        distance.value = heightBottom - newY
      }
    }
  })

  function calcuate () {
    const list = groupRef.value.children // ul的li节点
    const listHeightsVal = listHeights.value // 空数组
    let height = 0

    listHeightsVal.length = 0 // 每次置空
    listHeightsVal.push(height) // [0]

    for (let i = 0; i < list.length; i++) {
      height += list[i].clientHeight //
      listHeightsVal.push(height) // [0,xx,xx]的含有每个ul元素累加高度的数组
    }
  }

  function onScroll (pos) {
    // console.log('pos', pos)
    scrollY.value = -pos.y
    // console.log('scrollY', scrollY.value)
  }

  return {
    groupRef,
    onScroll,
    currentIndex,
    fixedTitle,
    fixedStyle
  }
}
