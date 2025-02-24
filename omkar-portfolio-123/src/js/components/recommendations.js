// recommendations.js

/**
 * Adds a new recommendation to the list and displays a popup.
 */
const addRecommendation = () => {
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
};

/**
 * Shows or hides the popup based on the boolean parameter.
 * @param {boolean} show - Whether to show or hide the popup
 */
const showPopup = (show) => {
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
};

// Export the functions to be used in other modules if needed
export { addRecommendation, showPopup };