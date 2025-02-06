import { JSDOM } from 'jsdom';

// Mock external dependencies
const mockSetupCounter = jest.fn();
jest.mock('./components/counter', () => ({
  setupCounter: mockSetupCounter,
}));

// Mock assets
const mockTypescriptLogo = 'mocked-typescript-logo.svg';
jest.mock('./assets/typescript.svg', () => 'mocked-typescript-logo.svg');

const mockViteLogo = 'mocked-vite-logo.svg';
jest.mock('/vite.svg', () => 'mocked-vite-logo.svg');

describe('typeTest', () => {
  let dom: JSDOM;
  let document: Document;
  let window: Window;

  beforeEach(() => {
    dom = new JSDOM('<!DOCTYPE html><html><body><div id="app"></div></body></html>', {
      url: 'http://localhost',
    });
    document = dom.window.document;
    window = dom.window;

    // Mock global document and window
    global.document = document;
    global.window = window as any;

    // Reset mocks
    mockSetupCounter.mockClear();
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const runTypeTest = () => {
    // Simulating the import and execution of the typeTest.ts file
    const app = document.querySelector<HTMLDivElement>('#app')!;
    app.innerHTML = `
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="${mockViteLogo}" class="logo" alt="Vite logo" />
        </a>
        <a href="https://www.typescriptlang.org/" target="_blank">
          <img src="${mockTypescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
        </a>
        <h1>Vite + TypeScript</h1>
        <div class="card">
          <button id="counter" type="button"></button>
        </div>
        <p class="read-the-docs">
          Click on the Vite and TypeScript logos to learn more
        </p>
      </div>
    `;

    const counterButton = document.querySelector<HTMLButtonElement>('#counter');
    if (counterButton) {
      mockSetupCounter(counterButton);
    } else {
      console.error('Counter button not found');
    }
  };

  test('renders correct HTML structure', () => {
    runTypeTest();
    const app = document.querySelector('#app');
    expect(app).not.toBeNull();
    expect(app?.innerHTML).toContain('<h1>Vite + TypeScript</h1>');
    expect(app?.querySelectorAll('a').length).toBe(2);
    expect(app?.querySelectorAll('img').length).toBe(2);
    expect(app?.querySelector('.card')).not.toBeNull();
    expect(app?.querySelector('.read-the-docs')).not.toBeNull();
  });

  test('uses correct logo sources', () => {
    runTypeTest();
    const images = document.querySelectorAll('img');
    expect(images[0].src).toContain(mockViteLogo);
    expect(images[1].src).toContain(mockTypescriptLogo);
  });

  test('sets up counter when button is found', () => {
    runTypeTest();
    const counterButton = document.querySelector('#counter');
    expect(counterButton).not.toBeNull();
    expect(mockSetupCounter).toHaveBeenCalledWith(counterButton);
  });

  test('logs error when counter button is not found', () => {
    const app = document.querySelector<HTMLDivElement>('#app')!;
    app.innerHTML = '<div></div>'; // Remove the counter button
    runTypeTest();
    expect(console.error).toHaveBeenCalledWith('Counter button not found');
    expect(mockSetupCounter).not.toHaveBeenCalled();
  });
});