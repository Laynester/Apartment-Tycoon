<script>
import person from "./person";

export default {
  props: {
    index: Number,
  },
  data() {
    return {
      interval: null,
      light: false,
    };
  },
  components: {
    person,
  },
  mounted() {
    if (this.index > 0) {
      setTimeout(() => {
        this.tick();
      }, this.index);
    } else {
      this.light = false;
    }
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  methods: {
    set() {
      this.light = !this.light;
    },
    tick() {
      setTimeout(() => {
        this.set();
        this.tickk();
      }, 1 * this.index);
    },
    tickk() {
      setTimeout(() => {
        this.set();
        this.tick();
      }, 3 * this.index + 3300);
    },
  },
};
</script>
<template>
  <div class="window" :class="{ light: light }">
    <person :index="index" v-if="light" />
  </div>
</template>
