// File: src/js/components/about.js
// This file should contain code related to the "about" section.
// For now, it will be empty as we've moved the previous functions.

// File: src/js/components/recommendations.js
/**
 * Adds a new recommendation to the list of recommendations.
 * This function is triggered when a user submits a new recommendation.
 */
function addRecommendation() {
    // Get the message of the new recommendation
    const recommendation = document.getElementById("new_recommendation");
    
    // If the user has left a recommendation, display a pop-up
    if (recommendation.value && recommendation.value.trim() !== "") {
        console.log("New recommendation added");
        
        // Show the popup
        showPopup(true);
        
        // Create a new 'recommendation' element and set its value to the user's message
        const element = document.createElement("div");
        element.classList.add("recommendation");
        element.innerHTML = `<span>&#8220;</span>${recommendation.value}<span>&#8221;</span>`;
        
        // Add this element to the end of the list of recommendations
        document.getElementById("all_recommendations").appendChild(element);
        
        // Reset the value of the textarea
        recommendation.value = "";
    }
}

// Make the function globally accessible
window.addRecommendation = addRecommendation;

// File: src/js/utils/ui.js
/**
 * Shows or hides a popup message.
 * @param {boolean} show - Whether to show (true) or hide (false) the popup.
 */
function showPopup(show) {
    const popup = document.getElementById('popup');
    if (show) {
        popup.style.visibility = 'visible';
        popup.style.backgroundColor = '#D4EDFF';
        popup.style.padding = '20px';
        popup.style.borderRadius = '8px';
        popup.style.textAlign = 'center';
    } else {
        popup.style.visibility = 'hidden';
    }
}

// Make the function globally accessible
window.showPopup = showPopup;