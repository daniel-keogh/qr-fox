import "./popup.css";
import * as kjua from "kjua";
import { defaultOptions } from "../scripts/default-options";

browser.tabs.query({
    active: true,
    currentWindow: true
}).then(tabs => {
    const { url, title } = tabs[0];
    const qrContainer = document.querySelector("#qr-code");

    browser.storage.local.get()
        .then(opts => {
            const qrCode = kjua({
                text: url,
                ...defaultOptions,
                ...opts
            });

            qrCode.title = title;
            qrContainer.appendChild(qrCode);
        })
        .catch(() => {
            qrContainer.innerHTML = (`
                <img src="../assets/images/error.svg"
                    width="200" height="200"
                    title="Failed to generate QR code for this URL."
                />
            `)
        });
});