import React, { useState } from 'react';

const Skills = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [newRecommendation, setNewRecommendation] = useState('');

  const addRecommendation = () => {
    if (newRecommendation.trim() !== '') {
      setRecommendations([...recommendations, newRecommendation]);
      setNewRecommendation('');
      setShowPopup(true);
      console.log('New recommendation added');
    }
  };

  return (
    <div>
      <textarea
        id="new_recommendation"
        value={newRecommendation}
        onChange={(e) => setNewRecommendation(e.target.value)}
      />
      <button onClick={addRecommendation}>Add Recommendation</button>
      
      <div id="all_recommendations">
        {recommendations.map((rec, index) => (
          <div key={index} className="recommendation">
            <span>&#8220;</span>{rec}<span>&#8221;</span>
          </div>
        ))}
      </div>
      
      {showPopup && (
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
        </div>
      )}
    </div>
  );
};

export default Skills;