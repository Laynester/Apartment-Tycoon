<script>
import window from "./window";
export default {
  components: {
    window,
  },
};
</script>

<template>
  <div class="floor lobby">
    <window v-for="i in 3" :key="i" :index="$int(0, 0)" />
  </div>
</template>
