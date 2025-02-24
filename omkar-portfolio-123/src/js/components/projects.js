// projects.js

/**
 * Adds a new recommendation to the list of recommendations.
 * @returns {void}
 */
export function addRecommendation() {
    const recommendation = document.getElementById("new_recommendation");
    const recommendationValue = recommendation.value.trim();

    if (recommendationValue) {
        console.log("New recommendation added");
        showPopup(true);

        const element = document.createElement("div");
        element.classList.add("recommendation");
        element.innerHTML = `<span>&#8220;</span>${recommendationValue}<span>&#8221;</span>`;

        document.getElementById("all_recommendations").appendChild(element);
        recommendation.value = "";
    }
}

/**
 * Shows or hides a popup message.
 * @param {boolean} show - Whether to show or hide the popup.
 * @returns {void}
 */
export function showPopup(show) {
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