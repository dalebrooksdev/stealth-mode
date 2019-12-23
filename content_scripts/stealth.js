(function () {
    if (window.hasRun) {
        return;
    }
    window.hasRun = true;

    function privacy () {
        document.body.style.filter = "blur(.75rem)";
    }

    function noPrivacy () {
        document.body.style.filter = "blur(0rem)";
    }

    browser.runtime.onMessage.addListener((message) => {
        if (message.command === "make-private") {
            privacy();
        } else if (message.command === "reset") {
            noPrivacy();
        }
    });
})();