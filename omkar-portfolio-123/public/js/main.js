// Function to add a new recommendation
function addRecommendation() {
    // Get the message of the new recommendation
    const recommendation = document.getElementById("new_recommendation");
    // If the user has left a recommendation, display a pop-up
    if (recommendation.value && recommendation.value.trim() !== "") {
        console.log("New recommendation added");
        
        // Call showPopup here
        showPopup(true);
        
        // Create a new 'recommendation' element and set its value to the user's message
        const element = document.createElement("div");
        element.setAttribute("class", "recommendation");
        element.innerHTML = `<span>&#8220;</span>${recommendation.value}<span>&#8221;</span>`;
        
        // Add this element to the end of the list of recommendations
        document.getElementById("all_recommendations").appendChild(element); 
        
        // Reset the value of the textarea
        recommendation.value = "";
    }
}

// Function to show or hide the popup
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