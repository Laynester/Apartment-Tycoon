import Vue from "vue";
import App from "./App.vue";
import store from "./store";

Vue.config.productionTip = false;
Vue.prototype.$window = window;
Vue.prototype.$store = store;
Vue.prototype.$int = function(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
