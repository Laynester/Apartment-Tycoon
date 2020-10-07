<template>
  <div class="container-sm" id="top">
    <div class="stats row">
      <div class="col text-center">
        <span class="text-center">Earning: {{ $store.state.moniesPS }}/s</span>
      </div>
      <div class="col text-center">
        <span>Total Floors: {{ $store.state.floors.length }}</span>
      </div>
      <div class="col text-center">
        <span>Money: {{ $store.state.money }}</span>
      </div>
      <div class="col text-center">
        <button
          @click.prevent="$store.commit('reset')"
          class="btn btn-danger btn-sm"
        >
          reset
        </button>
      </div>
    </div>
  </div>
</template>
