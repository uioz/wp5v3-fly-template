<template>
  <tw-button>
    <accept-email></accept-email>start</tw-button
  >
</template>
<script>
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { AcceptEmail } from "@icon-park/vue-next";
import TwButton from "@/components/tw-button.vue";

export default defineComponent({
  name: "index",
  components: {
    AcceptEmail,
    TwButton,
  },
  setup() {
    const store = useStore();

    return {
      message: "hello world",
      count: computed(() => store.state.count),
    };
  },
});
</script>
<style src="./index.pure.scss"></style>
