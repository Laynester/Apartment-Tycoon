<script>
import "./assets/scss/app.scss";
import clouds from "./templates/clouds";
import lobby from "./templates/lobby";
import floor from "./templates/floor";
import addition from "./templates/addition";
import top from "./templates/top";
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
    clouds,
    lobby,
    floor,
    addition,
    top,
  },
  methods: {
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
      <lobby />
      <floor
        v-for="(f, i) in $store.state.floors"
        :key="i"
        class="floor"
        :data-id="i"
        :index="i"
        :floor="f"
      />
      <addition />
      <div ref="top" class="pt-5" />
    </div>
    <top />
  </div>
</template>
