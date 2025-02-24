/**
 * Utility functions for API-related operations
 */

/**
 * Adds a new recommendation to the list
 */
export function addRecommendation() {
    const recommendation = document.getElementById("new_recommendation");
    if (!recommendation) {
        console.error("Recommendation input element not found");
        return;
    }
    if (recommendation.value && recommendation.value.trim() !== "") {
        console.log("New recommendation added");
        
        showPopup(true, "Recommendation added successfully!");
        
        const allRecommendations = document.getElementById("all_recommendations");
        if (!allRecommendations) {
            console.error("All recommendations container not found");
            return;
        }
        
        const element = document.createElement("div");
        element.setAttribute("class", "recommendation");
        element.innerHTML = `<span>&#8220;</span>${recommendation.value}<span>&#8221;</span>`;
        allRecommendations.appendChild(element); 
        
        recommendation.value = "";
    }
}

/**
 * Shows or hides the popup
 * @param {boolean} show - Whether to show or hide the popup
 * @param {string} message - The message to display in the popup
 */
export function showPopup(show, message = '') {
    const popup = document.getElementById('popup');
    if (!popup) {
        console.error("Popup element not found");
        return;
    }
    if (show) {
        popup.textContent = message;
        popup.style.visibility = 'visible';
        popup.style.backgroundColor = '#D4EDFF';
        popup.style.padding = '20px';
        popup.style.borderRadius = '8px';
        popup.style.textAlign = 'center';
    } else {
        popup.style.visibility = 'hidden';
    }
}