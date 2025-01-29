import { JSDOM } from 'jsdom';
import fs from 'fs';
import path from 'path';

// Mock the style imports
jest.mock('../src/styles/main.css', () => ({}));
jest.mock('../src/assets/typescript.svg', () => 'typescript.svg');
jest.mock('../src/assets/vite.svg', () => 'vite.svg');

// Mock the setupCounter function
jest.mock('../src/scripts/counter', () => ({
  setupCounter: jest.fn(),
}));

describe('typeTest', () => {
  let window: Window;
  let document: Document;

  beforeEach(() => {
    // Set up a fake DOM environment
    const dom = new JSDOM('<!DOCTYPE html><div id="app"></div>');
    window = dom.window;
    document = window.document;

    // Mock global objects
    global.document = document;
    global.window = window;
  });

  it('should create and insert HTML content', () => {
    // Load and execute the typeTest.ts file
    const typeTestPath = path.resolve(__dirname, '../src/scripts/typeTest.ts');
    const typeTestContent = fs.readFileSync(typeTestPath, 'utf8');
    eval(typeTestContent);

    // Check if the content was inserted into the #app element
    const appElement = document.getElementById('app');
    expect(appElement).not.toBeNull();
    expect(appElement?.innerHTML).toContain('Vite + TypeScript');
    expect(appElement?.innerHTML).toContain('Click on the Vite and TypeScript logos to learn more');
  });

  it('should call setupCounter with the button element', () => {
    // Load and execute the typeTest.ts file
    const typeTestPath = path.resolve(__dirname, '../src/scripts/typeTest.ts');
    const typeTestContent = fs.readFileSync(typeTestPath, 'utf8');
    eval(typeTestContent);

    // Import the mocked setupCounter function
    const { setupCounter } = require('../src/scripts/counter');

    // Check if setupCounter was called with a button element
    expect(setupCounter).toHaveBeenCalledTimes(1);
    const calledWith = (setupCounter as jest.Mock).mock.calls[0][0];
    expect(calledWith).toBeInstanceOf(window.HTMLButtonElement);
    expect(calledWith.textContent).toBe('count is 0');
  });
});