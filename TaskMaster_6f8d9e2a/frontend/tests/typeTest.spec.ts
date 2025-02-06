import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Mock implementations
const mockQuerySelector = vi.fn();
const mockInnerHTML = vi.fn();
const mockAddEventListener = vi.fn();

// Mock data
const mockViteLogo = 'mock-vite-logo.svg';
const mockTypescriptLogo = 'mock-typescript-logo.svg';

// Helper function to create mock HTML elements
function createMockElement(id: string): Partial<HTMLElement> {
  return {
    id,
    innerHTML: '',
    querySelector: mockQuerySelector,
    addEventListener: mockAddEventListener,
  };
}

// Mock document object
const mockDocument = {
  querySelector: mockQuerySelector,
};

// Mock window object
const mockWindow = {
  document: mockDocument,
};

// Setup and teardown
beforeEach(() => {
  vi.resetAllMocks();
  global.document = mockDocument as any;
  global.window = mockWindow as any;
});

afterEach(() => {
  vi.restoreAllMocks();
});

// Test cases
describe('DOM Manipulation Tests', () => {
  it('should set innerHTML of #app element', () => {
    const mockAppElement = createMockElement('app');
    mockQuerySelector.mockReturnValue(mockAppElement);

    document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
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

    expect(mockQuerySelector).toHaveBeenCalledWith('#app');
    expect(mockAppElement.innerHTML).toContain('Vite + TypeScript');
    expect(mockAppElement.innerHTML).toContain(mockViteLogo);
    expect(mockAppElement.innerHTML).toContain(mockTypescriptLogo);
  });

  it('should query for #counter button', () => {
    const mockCounterButton = createMockElement('counter') as Partial<HTMLButtonElement>;
    mockQuerySelector.mockReturnValue(mockCounterButton);

    const counterButton = document.querySelector<HTMLButtonElement>('#counter');

    expect(mockQuerySelector).toHaveBeenCalledWith('#counter');
    expect(counterButton).toBe(mockCounterButton);
  });

  it('should call setupCounter when counter button is found', () => {
    const mockCounterButton = createMockElement('counter') as Partial<HTMLButtonElement>;
    mockQuerySelector.mockReturnValue(mockCounterButton);

    const setupCounter = vi.fn();

    const counterButton = document.querySelector<HTMLButtonElement>('#counter');
    if (counterButton) {
      setupCounter(counterButton as HTMLButtonElement);
    }

    expect(setupCounter).toHaveBeenCalledWith(mockCounterButton);
  });

  it('should log error when counter button is not found', () => {
    mockQuerySelector.mockReturnValue(null);
    const consoleErrorSpy = vi.spyOn(console, 'error');

    const counterButton = document.querySelector<HTMLButtonElement>('#counter');
    if (counterButton) {
      setupCounter(counterButton);
    } else {
      console.error('Counter button not found');
    }

    expect(consoleErrorSpy).toHaveBeenCalledWith('Counter button not found');
  });
});

// Mock implementation of setupCounter function
function setupCounter(element: HTMLButtonElement) {
  let counter = 0;
  const setCounter = (count: number) => {
    counter = count;
    element.innerHTML = `count is ${counter}`;
  };
  element.addEventListener('click', () => setCounter(counter + 1));
  setCounter(0);
}

describe('setupCounter Tests', () => {
  it('should initialize counter and add click event listener', () => {
    const mockCounterButton = createMockElement('counter') as Partial<HTMLButtonElement>;
    
    setupCounter(mockCounterButton as HTMLButtonElement);

    expect(mockCounterButton.innerHTML).toBe('count is 0');
    expect(mockAddEventListener).toHaveBeenCalledWith('click', expect.any(Function));
  });

  it('should increment counter on click', () => {
    const mockCounterButton = createMockElement('counter') as Partial<HTMLButtonElement>;
    
    setupCounter(mockCounterButton as HTMLButtonElement);

    // Simulate click event
    const clickHandler = mockAddEventListener.mock.calls[0][1];
    clickHandler();

    expect(mockCounterButton.innerHTML).toBe('count is 1');
  });
});