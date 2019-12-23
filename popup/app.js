function listenForClicks () {
    document.addEventListener("click", (e) => {
        function stealth (tabs) {
            browser.tabs.sendMessage(tabs[0].id, {
                command: "make-private",
            });
        }
        function reset (tabs) {
            browser.tabs.sendMessage(tabs[0].id, {
                command: "reset",
            });
        }

        function reportError (error) {
            console.error(`Could not apply stealth mode: ${error}`);
        }

        if (e.target.classList.contains("privacy-screen")) {
            browser.tabs.query({ active: true, currentWindow: true })
                .then(stealth)
                .catch(reportError);
        }
        else if (e.target.classList.contains("reset")) {
            browser.tabs.query({ active: true, currentWindow: true })
                .then(reset)
                .catch(reportError);
        }
    });
}

function reportExecuteScriptError (error) {
    document.querySelector("#popup-content").classList.add("hidden");
    document.querySelector("#error-content").classList.remove("hidden");
    console.error(`Failed to execute apply stealth mode content script: ${error.message}`);
}

browser.tabs.executeScript({ file: "/content_scripts/stealth.js" })
    .then(listenForClicks)
    .catch(reportExecuteScriptError);

