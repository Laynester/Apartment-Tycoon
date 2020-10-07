<script>
import window from "./window";
export default {
  components: {
    window,
  },
  methods: {
    add() {
      this.$store.commit("buy");
      setTimeout(() => {
        this.$refs["top"].scrollIntoView({ behavior: "smooth" });
      }, 10);
    },
  },
};
</script>

<template>
  <div class="floor addition" @click.prevent="add">
    <window v-for="i in 14" :key="i" :index="$int(0, 0)" />
    <div class="hover buy">
      <button
        class="btn btn-success btn-sm"
        :class="{
          'btn-danger':
            $store.state.money < Math.floor(10000 * $store.state.floors.length),
        }"
        :disabled="
          $store.state.money < Math.floor(10000 * $store.state.floors.length)
        "
      >
        Purchase new floor ({{
          Math.floor(10000 * $store.state.floors.length)
        }})
      </button>
    </div>
  </div>
</template>
