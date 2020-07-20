browser.menus.create({
    id: "generate-from-link",
    title: "Generate QR Code",
    contexts: ["link"],
    type: "normal",
    onclick: (e) => {
        browser.tabs.query({
            currentWindow: true,
            active: true
        }).then(tabs => {
            browser.tabs.sendMessage(tabs[0].id, e.linkUrl);
        });
    }
});