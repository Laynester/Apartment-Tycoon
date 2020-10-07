import Vuex from "vuex";
import Vue from "vue";
import { Howl } from "howler";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    money: parseInt(localStorage.getItem("money")) || 0,
    floors: JSON.parse(localStorage.getItem("floors")) || [],
    moniesPS: 0,
    kaching: new Howl({
      src: ["./assets/kaching.mp3"],
      volume: 0.3,
    }),
  },
  mutations: {
    start(state) {
      if (!state.floors.length) {
        state.floors.push({
          cost: 1500,
          earning: 10,
          level: 1,
          baseAmount: 10,
        });
        state.money = 0;
        localStorage.setItem("floors", JSON.stringify(state.floors));
        localStorage.setItem("money", 0);
      }
    },
    buy(state) {
      let firstFloor = state.floors[0];
      let cost = Math.floor(10000 * state.floors.length);
      if (state.money >= cost) {
        state.kaching.play();
        state.floors.push({
          cost: cost,
          earning: Math.floor(
            firstFloor.baseAmount * (state.floors.length + 1)
          ),
          level: 0,
          baseAmount: Math.floor(
            firstFloor.baseAmount * (state.floors.length + 1)
          ),
        });
        state.money = Math.floor(state.money - cost);
        localStorage.setItem("floors", JSON.stringify(state.floors));
        localStorage.setItem("money", state.money);
      }
    },
    earning(state) {
      let monies = 0;
      state.floors.forEach((x) => {
        monies += x.earning;
      });
      state.moniesPS = monies;
      state.money += monies;
      localStorage.setItem("money", state.money);
      this._vm.$store.commit("save");
    },
    save(state) {
      localStorage.setItem("floors", JSON.stringify(state.floors));
      localStorage.setItem("money", state.money);
    },
    reset(state) {
      state.money = 0;
      state.floors = [];
      this._vm.$store.commit("start");
      this._vm.$store.commit("save");
    },
    upgrade(state, index) {
      let floor = state.floors[index];
      let cost =
        Math.floor(floor.baseAmount * floor.level) *
          Math.floor(floor.level / 2) +
        floor.baseAmount;
      floor.level = Math.floor(floor.level + 1);
      floor.earning = Math.floor(floor.baseAmount * floor.level);
      state.money = state.money - cost;
      this._vm.$store.commit("save");
      state.kaching.play();
    },
  },
});

export default store;
