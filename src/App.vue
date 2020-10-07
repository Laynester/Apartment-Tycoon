<script>
import "./assets/scss/app.scss";
import window from "./templates/window";
import clouds from "./templates/clouds";
import { Howl } from "howler";

export default {
  mounted() {
    this.$store.commit("start");
    this.ticking();
  },
  data() {
    return {
      playing: false,
      sound: null,
    };
  },
  components: {
    window,
    clouds,
  },
  methods: {
    add() {
      this.$store.commit("buy");
      setTimeout(() => {
        this.$refs["top"].scrollIntoView({ behavior: "smooth" });
      }, 10);
    },
    ticking() {
      setInterval(() => {
        this.$store.commit("earning");
        this.$store.commit("save");
      }, 1000);
    },
    playAudio() {
      let sound = new Howl({
        src: ["./assets/music.mp3"],
        volume: 0.5,
        onend: function() {
          sound2.play();
        },
      });
      sound.play();
      let sound2 = new Howl({
        src: ["./assets/music2.mp3"],
        volume: 0.5,
        onend: function() {
          sound3.play();
        },
      });
      let sound3 = new Howl({
        src: ["./assets/music3.mp3"],
        volume: 0.5,
        onend: function() {
          sound.play();
        },
      });
    },
    play() {
      this.playing = !this.playing;
      this.playAudio();
    },
  },
  beforeDestroy() {
    this.sound.stop();
  },
};
</script>

<template>
  <div id="app" ref="app">
    <clouds />
    <div class="modual" v-if="!playing">
      <button @click.prevent="play">play</button>
    </div>
    <div class="tower" v-else>
      <div class="floor lobby" @click.prevent="add">
        <window v-for="i in 3" :key="i" :index="$int(0, 0)" />
      </div>
      <div
        v-for="(f, i) in $store.state.floors"
        :key="i"
        class="floor"
        :data-id="i"
      >
        <window v-for="ii in 14" :key="ii" :index="$int(1000, 30000)" />
        <div class="hover">
          <span>Earning: {{ f.earning }}</span>
          <span>Level: {{ f.level }}</span>
          <button
            class="btn btn-warning btn-sm"
            :class="{
              'btn-danger':
                $store.state.money <
                Math.floor(f.baseAmount * f.level) * Math.floor(f.level / 2) +
                  f.baseAmount,
            }"
            :disabled="
              $store.state.money <
                Math.floor(f.baseAmount * f.level) * Math.floor(f.level / 2) +
                  f.baseAmount
            "
            @click.prevent="$store.commit('upgrade', i)"
          >
            Upgrade ({{
              Math.floor(f.baseAmount * f.level) * Math.floor(f.level / 2) +
                f.baseAmount
            }})
          </button>
        </div>
      </div>
      <div class="floor addition" @click.prevent="add">
        <window v-for="i in 14" :key="i" :index="$int(0, 0)" />
        <div class="hover buy">
          <button
            class="btn btn-success btn-sm"
            :class="{
              'btn-danger':
                $store.state.money <
                Math.floor(10000 * $store.state.floors.length),
            }"
            :disabled="
              $store.state.money <
                Math.floor(10000 * $store.state.floors.length)
            "
          >
            Purchase new floor ({{
              Math.floor(10000 * $store.state.floors.length)
            }})
          </button>
        </div>
      </div>
      <div ref="top" class="pt-5" />
    </div>
    <div class="container-sm" id="top">
      <div class="stats row">
        <div class="col text-center">
          <span class="text-center"
            >Earning: {{ $store.state.moniesPS }}/s</span
          >
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
  </div>
</template>
