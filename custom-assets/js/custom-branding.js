(function() {
    // Configuration - customize these values as needed
    const newPageTitle = "Bejo - Applied Intelligence";
    const originalLoginText = "Sign in to Open WebUI";
    const newLoginText = "Sign in to Bejo AI Platform";
    
    // Function to change the browser tab title
    function updatePageTitle() {
        // Change the title if it contains "Open WebUI" or matches exactly
        if (document.title.includes("Open WebUI") || document.title === "Open WebUI") {
            document.title = newPageTitle;
            console.log("Page title updated successfully");
        }
    }
    
    // Function to replace the login text on the authentication screen
    function replaceLoginText() {
        // Method 1: Find exact text matches across common HTML elements
        document.querySelectorAll('h1, h2, h3, h4, h5, p, span, div, label, a, button').forEach(element => {
            if (element.innerText && element.innerText.trim() === originalLoginText) {
                element.innerText = newLoginText;
                console.log("Replaced exact login text match");
            }
        });
        
        // Method 2: Find partial matches (in case text has extra spaces or formatting)
        document.querySelectorAll('h1, h2, h3, h4, h5, p, span, div, label, a, button').forEach(element => {
            if (element.innerText && element.innerText.includes("Sign in to Open")) {
                element.innerText = element.innerText.replace(originalLoginText, newLoginText);
                console.log("Replaced partial login text match");
            }
        });
        
        // Method 3: Check text in attributes like aria-label that might contain the text
        document.querySelectorAll('[aria-label], [title], [placeholder]').forEach(element => {
            if (element.getAttribute('aria-label') === originalLoginText) {
                element.setAttribute('aria-label', newLoginText);
            }
            if (element.getAttribute('title') === originalLoginText) {
                element.setAttribute('title', newLoginText);
            }
            if (element.getAttribute('placeholder') === originalLoginText) {
                element.setAttribute('placeholder', newLoginText);
            }
        });
    }

    // Function to safely set up the MutationObserver for DOM changes
    function setupDomObserver() {
        // Check if document.body exists before observing
        if (document.body) {
            try {
                // Create observer to watch for DOM changes
                const observer = new MutationObserver(function() {
                    // Run our customization functions whenever DOM changes
                    updatePageTitle();
                    replaceLoginText();
                });
                
                // Start observing the document body for changes
                observer.observe(document.body, { 
                    childList: true,   // Watch for added/removed elements
                    subtree: true,     // Watch the entire DOM tree
                    characterData: true // Watch for text changes
                });
                console.log("DOM observer successfully set up");
            } catch (error) {
                // Error handling to prevent script crashes
                console.error("Error setting up DOM observer:", error);
                
                // Fallback: try again after a delay
                setTimeout(setupDomObserver, 500);
            }
        } else {
            // If document.body isn't available yet, retry later
            console.log("document.body not available yet, retrying soon");
            setTimeout(setupDomObserver, 100);
        }
    }
    
    // Function to set up a specific observer for the page title
    function setupTitleObserver() {
        const titleElement = document.querySelector('title');
        if (titleElement) {
            try {
                // Create observer specifically for the title element
                const titleObserver = new MutationObserver(function() {
                    updatePageTitle();
                });
                
                // Start observing the title element
                titleObserver.observe(titleElement, { 
                    childList: true, 
                    characterData: true, 
                    subtree: true 
                });
                console.log("Title observer set up successfully");
            } catch (error) {
                console.error("Error setting up title observer:", error);
            }
        } else {
            // If title element doesn't exist yet, try again later
            setTimeout(setupTitleObserver, 200);
        }
    }
    
    // Main initialization function
    function initialize() {
        // Handle different document ready states
        if (document.readyState === 'loading') {
            // Document still loading: set up event listener
            document.addEventListener('DOMContentLoaded', function() {
                updatePageTitle();
                replaceLoginText();
                setupDomObserver();
                setupTitleObserver();
            });
        } else {
            // Document already loaded: run immediately
            updatePageTitle();
            replaceLoginText();
            setupDomObserver();
            setupTitleObserver();
        }
        
        // Additional safety measures to catch late-rendered content
        // Run our functions at increasing intervals after page load
        setTimeout(function() {
            updatePageTitle();
            replaceLoginText();
        }, 500);
        
        setTimeout(function() {
            updatePageTitle();
            replaceLoginText();
        }, 1500);
        
        setTimeout(function() {
            updatePageTitle();
            replaceLoginText();
        }, 3000);
        
        // Also run when window is fully loaded (including all resources)
        window.addEventListener('load', function() {
            updatePageTitle();
            replaceLoginText();
        });
    }
    
    // Start the initialization process
    initialize();
})();
