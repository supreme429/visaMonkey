import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import monkey, { cdn } from "vite-plugin-monkey";
import inject from "@rollup/plugin-inject";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve("./src"),
    },
  },
  plugins: [
    react(),
    inject({
      $: "jquery", // 这里会自动载入 node_modules 中的 jquery   jquery全局变量
      jQuery: "jquery",
      "windows.jQuery": "jquery",
    }),
    monkey({
      entry: "src/main.tsx",
      userscript: {
        name: "visa-booking-tools",
        author: "ianLau429",
        icon: "https://vitejs.dev/logo.svg",
        namespace: "visa-booking-tools",
        description: "预约工具插件 - 自动安装调试脚本、支持热更新",
        match: [
          "https://visa.vfsglobal.com/chn/zh/che/book-an-appointment",
          "https://visa.vfsglobal.com/chn/zh/che/login",
          "https://visa.vfsglobal.com/chn/zh/ita/login",
        ],
        grant: ["GM.getValue", "GM.setValue"],
      },
      build: {
        externalGlobals: {
          react: cdn.jsdelivr("React", "umd/react.production.min.js"),
          "react-dom": cdn.jsdelivr(
            "ReactDOM",
            "umd/react-dom.production.min.js"
          ),
        },
      },
    }),
  ],
});
