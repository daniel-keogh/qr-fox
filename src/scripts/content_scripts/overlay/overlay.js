import "./overlay.css";
import * as kjua from "kjua";
import { defaultOptions } from "../../default-options";

browser.runtime.onMessage.addListener(showQrCode);

function showQrCode(link) {
    const overlay = document.createElement("div");
    overlay.id = "qr-overlay";
    overlay.addEventListener("click", overlay.remove);
    document.querySelector("body").appendChild(overlay);

    const qrWrapper = document.createElement("div");
    qrWrapper.id = "qr-wrapper";
    overlay.appendChild(qrWrapper);

    const qrCode = kjua({
        text: link,
        ...defaultOptions,
        size: "260"
    });
    qrCode.title = link;
    qrWrapper.appendChild(qrCode);
}