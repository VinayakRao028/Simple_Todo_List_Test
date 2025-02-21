import { JSDOM } from 'jsdom';
import { expect } from 'chai';

// Mock external dependencies
const mockTypescriptLogo = 'mocked-typescript-logo.svg';
const mockViteLogo = 'mocked-vite-logo.svg';

// Mock setupCounter function
function setupCounter(element: HTMLButtonElement) {
  let counter = 0;
  const setCounter = (count: number) => {
    counter = count;
    element.innerHTML = `count is ${counter}`;
  };
  element.addEventListener('click', () => setCounter(counter + 1));
  setCounter(0);
}

describe('Frontend App Tests', () => {
  let document: Document;
  let window: Window;

  beforeEach(() => {
    const dom = new JSDOM(`
      <!DOCTYPE html>
      <html>
        <body>
          <div id="app"></div>
        </body>
      </html>
    `, { runScripts: 'dangerously' });

    window = dom.window;
    document = window.document;

    // Mock global objects
    global.document = document;
    global.window = window;

    // Run the main script
    const script = `
      const typescriptLogo = '${mockTypescriptLogo}';
      const viteLogo = '${mockViteLogo}';
      ${setupCounter.toString()}
      
      document.querySelector("#app").innerHTML = \`
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src="\${viteLogo}" class="logo" alt="Vite logo" />
          </a>
          <a href="https://www.typescriptlang.org/" target="_blank">
            <img src="\${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
          </a>
          <h1>Vite + TypeScript</h1>
          <div class="card">
            <button id="counter" type="button"></button>
          </div>
          <p class="read-the-docs">
            Click on the Vite and TypeScript logos to learn more
          </p>
        </div>
      \`;

      setupCounter(document.querySelector("#counter"));
    `;

    const scriptElement = document.createElement('script');
    scriptElement.textContent = script;
    document.body.appendChild(scriptElement);
  });

  it('should render the app container', () => {
    const appContainer = document.querySelector('#app');
    expect(appContainer).to.exist;
  });

  it('should render the Vite logo', () => {
    const viteLogo = document.querySelector('img[alt="Vite logo"]') as HTMLImageElement;
    expect(viteLogo).to.exist;
    expect(viteLogo.src).to.include(mockViteLogo);
  });

  it('should render the TypeScript logo', () => {
    const tsLogo = document.querySelector('img[alt="TypeScript logo"]') as HTMLImageElement;
    expect(tsLogo).to.exist;
    expect(tsLogo.src).to.include(mockTypescriptLogo);
  });

  it('should render the correct heading', () => {
    const heading = document.querySelector('h1');
    expect(heading).to.exist;
    expect(heading?.textContent).to.equal('Vite + TypeScript');
  });

  it('should render the counter button', () => {
    const counterButton = document.querySelector('#counter');
    expect(counterButton).to.exist;
  });

  it('should increment the counter when clicked', () => {
    const counterButton = document.querySelector('#counter') as HTMLButtonElement;
    expect(counterButton.innerHTML).to.equal('count is 0');

    counterButton.click();
    expect(counterButton.innerHTML).to.equal('count is 1');

    counterButton.click();
    expect(counterButton.innerHTML).to.equal('count is 2');
  });

  it('should render the read-the-docs paragraph', () => {
    const paragraph = document.querySelector('.read-the-docs');
    expect(paragraph).to.exist;
    expect(paragraph?.textContent).to.equal('Click on the Vite and TypeScript logos to learn more');
  });

  // Negative test case
  it('should not render non-existent elements', () => {
    const nonExistentElement = document.querySelector('#non-existent');
    expect(nonExistentElement).to.be.null;
  });
});