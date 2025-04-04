(function() {
    // Function that applies the custom styling to the target element
    function applyCustomStyling() {
        // Find all elements that match the selector
        const elements = document.querySelectorAll('div.fixed.m-10.z-50');
        
        if (elements.length > 0) {
            // Apply the custom styles to each matching element
            elements.forEach(element => {
                element.style.left = '50%';
                element.style.transform = 'translate(-50%, -50%)';
                element.style.top = '10%';
                element.style.margin = '0 !important';
                
                // Remove the m-10 class if it's controlling margin
                element.classList.remove('m-10');
                
                console.log('Applied custom styling to div.fixed.m-10.z-50 element');
            });
        }
    }
    
    // Attempt to apply styles immediately
    applyCustomStyling();
    
    // Also set up a MutationObserver to handle dynamically loaded content
    const observer = new MutationObserver((mutations) => {
        applyCustomStyling();
    });
    
    // Start observing the document body for DOM changes
    observer.observe(document.body, { 
        childList: true, 
        subtree: true 
    });
    
    // Also apply on window load (catches late-rendered components)
    window.addEventListener('load', applyCustomStyling);
    
    // Apply multiple times over the first few seconds in case of delayed rendering
    setTimeout(applyCustomStyling, 500);
    setTimeout(applyCustomStyling, 1000);
    setTimeout(applyCustomStyling, 2000);
})();
