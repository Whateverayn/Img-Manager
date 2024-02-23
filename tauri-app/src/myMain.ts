import { appWindow } from "@tauri-apps/api/window";

let winClo: HTMLElement | null;
let winMin: HTMLElement | null;
let winMax: HTMLElement | null;

async function updateDisplayBasedOnMaximizeState() {
    winMax = document.getElementById('winMax');
    const isMaximized = await appWindow.isMaximized();
    if (winMax) {
        if (isMaximized) {
            // ウィンドウが最大化されているときのスタイルを適用
            winMax.dataset.s = "2";
        } else {
            // ウィンドウが最大化されていないときのスタイルを適用
            winMax.dataset.s = "1";
        }
    }
}

window.addEventListener("DOMContentLoaded", () => {
    winClo = document.getElementById('winClo');
    winMin = document.getElementById('winMin');
    winMax = document.getElementById('winMax');

    winClo?.addEventListener("click", () => {
        appWindow.close();
    });
    winMin?.addEventListener("click", () => {
        appWindow.minimize();
    });
    winMax?.addEventListener("click", () => {
        appWindow.toggleMaximize();
    });

    updateDisplayBasedOnMaximizeState();
});

window.addEventListener("resize", updateDisplayBasedOnMaximizeState);