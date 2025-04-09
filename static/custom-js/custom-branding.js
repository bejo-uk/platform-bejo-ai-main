(function() {
    const desiredPageTitle = "Applied Intelligence built by Bejo";
    const originalLoginText = "Sign in to Open WebUI"; // Or "Sign in to Applied Intelligence" if the constant change worked
    const newLoginText = "Sign in to Applied Intelligence";

    function forceTitle() {
        if (document.title !== desiredPageTitle) {
            document.title = desiredPageTitle;
            // console.log(`Title forced: ${Date.now()}`); // Uncomment for intense debugging
        }
    }

    function replaceLoginTextIfNeeded() {
         // Use a specific selector if possible, otherwise broad search
         document.querySelectorAll('h1, h2, h3, p, div.text-center.text-xl').forEach(element => {
            // Check for the text that needs replacing (might be the original or the one set by APP_NAME)
           if (element.innerText && (element.innerText.includes("Sign in to Open WebUI") || element.innerText.includes("Sign in to Applied Intelligence"))) {
                // Only replace if it's not already the final desired text
                if (element.innerText.trim() !== newLoginText) {
                    element.innerText = newLoginText;
                    console.log("Updated login text.");
                }
            }
        });
    }

    // Force title immediately and repeatedly
    forceTitle();
    setInterval(forceTitle, 100); // Check and force every 100ms

    // Attempt login text replacement repeatedly on load
    // (MutationObserver is generally better but can be complex; interval is simpler for testing)
    replaceLoginTextIfNeeded(); // Initial attempt
    setTimeout(replaceLoginTextIfNeeded, 500);
    setTimeout(replaceLoginTextIfNeeded, 1500);
    setTimeout(replaceLoginTextIfNeeded, 3000);

    // Also run on load events
     if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
             forceTitle();
             replaceLoginTextIfNeeded();
         });
    }
    window.addEventListener('load', () => {
        forceTitle();
        replaceLoginTextIfNeeded();
    });

    console.log("Aggressive title/text override script loaded.");

})();
