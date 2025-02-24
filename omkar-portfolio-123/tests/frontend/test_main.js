const jsdom = require('jsdom');
const { JSDOM } = jsdom;

// Set up a DOM environment
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
global.document = dom.window.document;
global.window = dom.window;

// Mock console.log to capture output
const originalConsoleLog = console.log;
let consoleOutput = [];
console.log = (message) => {
  consoleOutput.push(message);
};

// Implementation of addRecommendation function
function addRecommendation() {
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
}

// Implementation of showPopup function
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

// Helper function to set up the DOM environment
function setupDOMEnvironment() {
  const recommendationInput = document.createElement('textarea');
  recommendationInput.id = 'new_recommendation';
  document.body.appendChild(recommendationInput);

  const allRecommendations = document.createElement('div');
  allRecommendations.id = 'all_recommendations';
  document.body.appendChild(allRecommendations);

  const popup = document.createElement('div');
  popup.id = 'popup';
  document.body.appendChild(popup);

  return { recommendationInput, allRecommendations, popup };
}

// Test suite
describe('Portfolio Recommendation System', () => {
  let elements;

  beforeEach(() => {
    // Clear the body before each test
    document.body.innerHTML = '';
    elements = setupDOMEnvironment();
    consoleOutput = [];
  });

  describe('addRecommendation', () => {
    test('should add a new recommendation when input is valid', () => {
      elements.recommendationInput.value = 'Great portfolio!';
      addRecommendation();

      expect(elements.allRecommendations.children.length).toBe(1);
      expect(elements.allRecommendations.innerHTML).toContain('Great portfolio!');
      expect(elements.recommendationInput.value).toBe('');
      expect(consoleOutput).toContain('New recommendation added');
    });

    test('should not add a recommendation when input is empty', () => {
      elements.recommendationInput.value = '';
      addRecommendation();

      expect(elements.allRecommendations.children.length).toBe(0);
      expect(consoleOutput).toHaveLength(0);
    });

    test('should not add a recommendation when input contains only whitespace', () => {
      elements.recommendationInput.value = '   ';
      addRecommendation();

      expect(elements.allRecommendations.children.length).toBe(0);
      expect(consoleOutput).toHaveLength(0);
    });

    test('should handle multiple recommendations', () => {
      elements.recommendationInput.value = 'First recommendation';
      addRecommendation();
      elements.recommendationInput.value = 'Second recommendation';
      addRecommendation();

      expect(elements.allRecommendations.children.length).toBe(2);
      expect(elements.allRecommendations.innerHTML).toContain('First recommendation');
      expect(elements.allRecommendations.innerHTML).toContain('Second recommendation');
    });
  });

  describe('showPopup', () => {
    test('should show popup when called with true', () => {
      showPopup(true);

      expect(elements.popup.style.visibility).toBe('visible');
      expect(elements.popup.style.backgroundColor).toBe('#D4EDFF');
      expect(elements.popup.style.padding).toBe('20px');
      expect(elements.popup.style.borderRadius).toBe('8px');
      expect(elements.popup.style.textAlign).toBe('center');
    });

    test('should hide popup when called with false', () => {
      showPopup(false);

      expect(elements.popup.style.visibility).toBe('hidden');
    });

    test('should toggle popup visibility', () => {
      showPopup(true);
      expect(elements.popup.style.visibility).toBe('visible');

      showPopup(false);
      expect(elements.popup.style.visibility).toBe('hidden');

      showPopup(true);
      expect(elements.popup.style.visibility).toBe('visible');
    });
  });
});

// Restore original console.log after tests
afterAll(() => {
  console.log = originalConsoleLog;
});