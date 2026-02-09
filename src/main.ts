import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./styles/fonts.local.css";
import "./styles/tailwind.css";

createApp(App).use(router).mount("#app");
