// import { event } from "@tauri-apps/api";
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

const pageList = ["page_home", "page_ffmpeg"];
const updatePage = () => {
    pageList.forEach(element => {
        const div = document.getElementById(element);
        if (div != null) {
            div.dataset.s = "false";
        }
    });
    const div2 = document.getElementById('mode') as HTMLInputElement;
    const div3 = div2.value;
    const div4 = document.getElementById(div3);
    if (div4 != null) {
        div4.dataset.s = "true";
    }
}

const changeMode = (mode: string) => {
    const elm = document.getElementById('mode') as HTMLInputElement;
    elm.value = mode;
    updatePage();
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

    document.getElementById('mode')?.addEventListener('change', updatePage);
    document.getElementById('home_ffmpeg')?.addEventListener('click', () => { changeMode('page_ffmpeg') });

    const inputElement = document.getElementById('inputFileName')  as HTMLInputElement;
    const ffmpegForm = document.getElementById('ffmpeg_form') as HTMLFormElement;

    ffmpegForm.addEventListener('dragover', (event) =>{
        event.preventDefault();
    })
    ffmpegForm.addEventListener('drop', (event) => {
        event.preventDefault();
        const files = event.dataTransfer?.files;
        if (files!.length > 0 && inputElement != null && files != undefined) {
            inputElement.value = files[0].name;
        }
    });

    updateDisplayBasedOnMaximizeState();
});

window.addEventListener("resize", updateDisplayBasedOnMaximizeState);

const updateOpacity = () => {
    document.body.style.setProperty('--opacity', document.hasFocus() ? "1" : "0.6");
};

window.addEventListener('focus', updateOpacity);
window.addEventListener('blur', updateOpacity);


// ファイル受け取り
// appWindow.onFileDropEvent((ev) => {
//     if (ev.payload.type !== 'drop') {
//         return
//     }
//     const [filepath] = ev.payload.paths// as string[]
//     console.log(filepath)
//     //=> /absolute/path/example.txt
// })