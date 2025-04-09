(function() {
    // Configuration
    const desiredPageTitle = "Applied Intelligence built by Bejo"; // *** YOUR FINAL TITLE ***
    const originalLoginText = "Sign in to Open WebUI";
    const newLoginText = "Sign in to Applied Intelligence built by Bejo"; // Adjusted login text

    // Function to FORCE the desired page title
    function forcePageTitle() {
        // Always set the title if it's not already the desired one
        if (document.title !== desiredPageTitle) {
            document.title = desiredPageTitle;
            // console.log("Page title forced to:", desiredPageTitle); // Optional: for debugging
        }
    }

    // Function to replace the login text (adjust selector if needed)
    function replaceLoginText() {
        // Use a broader selector or specific elements if the text isn't found
        document.querySelectorAll('h1, h2, h3, p, div.text-center.text-xl').forEach(element => {
           if (element.innerText && (element.innerText.trim() === originalLoginText || element.innerText.includes("Sign in to Open"))) {
                // Check if already replaced to prevent infinite loops if observer triggers repeatedly
                if (element.innerText.trim() !== newLoginText) {
                    element.innerText = newLoginText;
                    console.log("Replaced login text in:", element.tagName);
                }
            }
        });
         // Add other selectors/methods if needed
    }

    // Use MutationObserver to constantly check and force the title
    // Also re-checks login text in case the login component re-renders
    function setupObservers() {
        if (document.body && document.querySelector('title')) {
            try {
                const observer = new MutationObserver(function(mutations) {
                    // Force title check on every relevant mutation
                    forcePageTitle();
                    // Also re-check login text
                    replaceLoginText();
                });

                // Observe the body for subtree changes AND the title element directly
                observer.observe(document.body, { childList: true, subtree: true });
                observer.observe(document.querySelector('title'), { subtree:true, characterData: true, childList: true });

                console.log("Observers set up for title forcing and login text.");

            } catch (error) {
                console.error("Error setting up observers:", error);
                setTimeout(setupObservers, 500); // Retry setup if error
            }
        } else {
            // If body or title not ready, retry shortly
            setTimeout(setupObservers, 100);
        }
    }

    // Initial setup function
    function initialize() {
         // Run initial replacements/forcing as soon as possible
        forcePageTitle();
        replaceLoginText();

        // Set up observers once DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', setupObservers);
        } else {
            // DOM already loaded
            setupObservers();
        }

         // Also run on window load as a fallback
        window.addEventListener('load', function() {
            forcePageTitle();
            replaceLoginText();
        });

        // Extra checks after intervals, primarily for title forcing
        setTimeout(forcePageTitle, 500);
        setTimeout(forcePageTitle, 1500);
        setTimeout(forcePageTitle, 3000); // Keep forcing it
    }

    initialize();
})();
