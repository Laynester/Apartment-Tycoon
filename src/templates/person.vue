<script>
export default {
  mounted() {
    this.bottom = this.$int(-10, 38);
    this.left = this.$int(-10, 38);
    setInterval(() => {
      this.bottom = this.$int(-10, 38);
      this.left = this.$int(-10, 38);
    }, Math.floor(this.index / 6));
  },
  props: {
    index: Number,
  },
  data() {
    return {
      bottom: 0,
      left: 0,
    };
  },
};
</script>
<template>
  <div class="person" :style="'bottom:' + bottom + 'px;left:' + left + 'px;'" />
</template>
