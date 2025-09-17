import "./core.css";

import { createApp, h } from "vue";
import alert from "./dialog-alert.vue";
import confirm from "./dialog-confirm.vue";
import prompt from "./dialog-prompt.vue";
import choose from "./dialog-choose.vue";

export default {
    install(app) {
        // Insert dialogs EL on HTML
        const BODY = document.body;
        const TAG = document.createElement("div");
        TAG.innerHTML = `<div id='__vacDialogs__'></div>`;
        BODY.appendChild(TAG);

        // Create dialogs root app
        const DialogsRoot = {
            components: { alert, confirm, prompt, choose },
            render() {
                return h("div", { id: "__vacDialogs__" }, [
                    h(alert, { ref: "alert" }),
                    h(confirm, { ref: "confirm" }),
                    h(prompt, { ref: "prompt" }),
                    h(choose, { ref: "choose" }),
                ]);
            }
        };

        const dialogsApp = createApp(DialogsRoot);
        const dialogsRoot = dialogsApp.mount("#__vacDialogs__");

        // Helper to get highest z-index
        function highest_zIndex() {
            const elems = document.getElementsByTagName("*");
            let highest = 0;
            for (let i = 0; i < elems.length; i++) {
                const zindex = window.getComputedStyle(elems[i]).getPropertyValue("z-index");
                if (zindex !== "auto" && Number(zindex) > highest) {
                    highest = Number(zindex);
                }
            }
            return highest;
        }

        // Add global methods
        app.config.globalProperties.$alert = function(options) {
            const dlg = dialogsRoot.$refs.alert;
            // dlg.zIndex = highest_zIndex() + 1;
            dlg.title = options.title;
            dlg.message = options.message;
            dlg.buttonOk = options.buttonOk;
            dlg.callback = options.callback;
            dlg.active = true;
        };

        app.config.globalProperties.$confirm = function(options) {
            const dlg = dialogsRoot.$refs.confirm;
            dlg.zIndex = highest_zIndex() + 1;
            dlg.title = options.title;
            dlg.message = options.message;
            dlg.buttonOk = options.buttonOk;
            dlg.buttonCancel = options.buttonCancel;
            dlg.callback = options.callback;
            dlg.active = true;
        };

        app.config.globalProperties.$prompt = function(options) {
            const dlg = dialogsRoot.$refs.prompt;
            dlg.zIndex = highest_zIndex() + 1;
            dlg.text = "";
            dlg.title = options.title;
            dlg.message = options.message;
            dlg.buttonOk = options.buttonOk;
            dlg.buttonCancel = options.buttonCancel;
            dlg.placeHolder = options.placeHolder;
            dlg.callback = options.callback;
            dlg.active = true;
        };

        app.config.globalProperties.$choose = function(options) {
            const dlg = dialogsRoot.$refs.choose;
            dlg.zIndex = highest_zIndex() + 1;
            dlg.title = options.title;
            dlg.message = options.message;
            dlg.buttons = options.buttons;
            dlg.buttonCancel = options.buttonCancel;
            dlg.callback = options.callback;
            dlg.active = true;
        };
    }
};
