// src/js/components/navigation.js

import React, { useState } from 'react';

const Navigation = () => {
  const [popupVisible, setPopupVisible] = useState(false);

  const addRecommendation = () => {
    const recommendation = document.getElementById("new_recommendation");
    if (recommendation.value && recommendation.value.trim() !== "") {
      console.log("New recommendation added");
      showPopup(true);

      const element = document.createElement("div");
      element.setAttribute("class", "recommendation");
      element.innerHTML = `<span>&#8220;</span>${recommendation.value}<span>&#8221;</span>`;
      document.getElementById("all_recommendations").appendChild(element);

      recommendation.value = "";
    }
  };

  const showPopup = (show) => {
    setPopupVisible(show);
  };

  return (
    <>
      <button onClick={addRecommendation}>Add Recommendation</button>
      {popupVisible && (
        <div 
          id="popup"
          style={{
            visibility: 'visible',
            backgroundColor: '#D4EDFF',
            padding: '20px',
            borderRadius: '8px',
            textAlign: 'center'
          }}
        >
          Recommendation added successfully!
          <button onClick={() => showPopup(false)}>Close</button>
        </div>
      )}
    </>
  );
};

export default Navigation;