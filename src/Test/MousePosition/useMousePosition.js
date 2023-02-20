import { onMounted, onUnmounted, ref } from "vue";

export default function useMousePosition() {
  const x = ref(0);
  const y = ref(0);

  function updatePostion(e) {
    // console.log("ee值", e);
    x.value = e.pageX;
    y.value = e.pageY;
  }

  onMounted(() => {
    console.log("useMousePosition onMounted");
    window.addEventListener("mousemove", updatePostion);
  });

  onUnmounted(() => {
    console.log("useMousePosition onUnmounted");
    window.removeEventListener("mousemove", updatePostion);
  });

  return {
    x,
    y,
  };
}
