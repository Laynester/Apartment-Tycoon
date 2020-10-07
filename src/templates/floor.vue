<script>
import window from "./window";
export default {
  props: ["floor", "index"],
  components: {
    window,
  },
};
</script>

<template>
  <div>
    <window v-for="ii in 14" :key="ii" :index="$int(1000, 30000)" />
    <div class="hover">
      <span>Earning: {{ floor.earning }}</span>
      <span>Level: {{ floor.level }}</span>
      <button
        class="btn btn-warning btn-sm"
        :class="{
          'btn-danger':
            $store.state.money <
            Math.floor(floor.baseAmount * floor.level) *
              Math.floor(floor.level / 2) +
              floor.baseAmount,
        }"
        :disabled="
          $store.state.money <
            Math.floor(floor.baseAmount * floor.level) *
              Math.floor(floor.level / 2) +
              floor.baseAmount
        "
        @click.prevent="$store.commit('upgrade', index)"
      >
        Upgrade ({{
          Math.floor(floor.baseAmount * floor.level) *
            Math.floor(floor.level / 2) +
            floor.baseAmount
        }})
      </button>
    </div>
  </div>
</template>
