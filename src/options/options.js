import "./options.css";
import { defaultOptions } from "../scripts/default-options";

const form = document.querySelector(".options-form");
const sizeSlider = document.querySelector("#size");
const colourPicker = document.querySelector("#colour");

document.addEventListener("DOMContentLoaded", restoreOptions);

form.addEventListener("submit", saveOptions);
form.addEventListener("reset", resetDefaults);

sizeSlider.addEventListener("mouseover", () => sizeSlider.title = sizeSlider.value + "px");
colourPicker.addEventListener("mouseover", () => colourPicker.title = colourPicker.value);

async function restoreOptions() {
    const res = await browser.storage.local.get();

    sizeSlider.value = res.size || defaultOptions.size;
    colourPicker.value = res.fill || defaultOptions.fill;
}

function saveOptions(e) {
    browser.storage.local.set({
        size: sizeSlider.value,
        fill: colourPicker.value,
    });
    e.preventDefault();
}

function resetDefaults(e) {
    sizeSlider.value = sizeSlider.title = defaultOptions.size;
    colourPicker.value = colourPicker.title = defaultOptions.fill;
    e.preventDefault();
}