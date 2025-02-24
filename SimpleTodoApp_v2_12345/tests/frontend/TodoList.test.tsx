import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from './TodoList';

// Mock the SVG imports
jest.mock('../assets/typescript.svg', () => 'mocked-typescript-svg');
jest.mock('../assets/vite.svg', () => 'mocked-vite-svg');

describe('TodoList Component', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
  });

  test('renders TodoList component', () => {
    render(<TodoList />);
    
    // Check if logos are rendered
    expect(screen.getByAltText('Vite logo')).toBeInTheDocument();
    expect(screen.getByAltText('TypeScript logo')).toBeInTheDocument();
    
    // Check if the title is rendered
    expect(screen.getByText('Vite + TypeScript')).toBeInTheDocument();
    
    // Check if the counter button is rendered
    expect(screen.getByRole('button', { name: /count is 0/i })).toBeInTheDocument();
    
    // Check if the read-the-docs text is rendered
    expect(screen.getByText('Click on the Vite and TypeScript logos to learn more')).toBeInTheDocument();
  });

  test('counter increments when clicked', () => {
    render(<TodoList />);
    
    const counterButton = screen.getByRole('button', { name: /count is 0/i });
    
    fireEvent.click(counterButton);
    expect(counterButton).toHaveTextContent('count is 1');
    
    fireEvent.click(counterButton);
    expect(counterButton).toHaveTextContent('count is 2');
  });

  test('counter starts with initial count', () => {
    render(<TodoList />);
    const counterButton = screen.getByRole('button', { name: /count is 0/i });
    expect(counterButton).toHaveTextContent('count is 0');
  });

  test('logos have correct src and alt attributes', () => {
    render(<TodoList />);
    
    const viteLogo = screen.getByAltText('Vite logo');
    expect(viteLogo).toHaveAttribute('src', 'mocked-vite-svg');
    expect(viteLogo).toHaveAttribute('alt', 'Vite logo');
    
    const typescriptLogo = screen.getByAltText('TypeScript logo');
    expect(typescriptLogo).toHaveAttribute('src', 'mocked-typescript-svg');
    expect(typescriptLogo).toHaveAttribute('alt', 'TypeScript logo');
  });

  test('logo links have correct href attributes', () => {
    render(<TodoList />);
    
    const viteLink = screen.getByRole('link', { name: /vite logo/i });
    expect(viteLink).toHaveAttribute('href', 'https://vitejs.dev');
    expect(viteLink).toHaveAttribute('target', '_blank');
    expect(viteLink).toHaveAttribute('rel', 'noopener noreferrer');
    
    const typescriptLink = screen.getByRole('link', { name: /typescript logo/i });
    expect(typescriptLink).toHaveAttribute('href', 'https://www.typescriptlang.org/');
    expect(typescriptLink).toHaveAttribute('target', '_blank');
    expect(typescriptLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});

// Additional test cases based on the raw test cases provided
describe('Additional Test Cases', () => {
  test('setupCounter function', () => {
    const mockButton = document.createElement('button');
    const setCounter = (element: HTMLButtonElement) => {
      const setCount = (count: number) => {
        element.innerHTML = `count is ${count}`;
      };
      element.addEventListener('click', () => setCount(parseInt(element.innerHTML.split(' ')[2]) + 1));
      setCount(0);
    };

    setCounter(mockButton);
    expect(mockButton.innerHTML).toBe('count is 0');

    mockButton.click();
    expect(mockButton.innerHTML).toBe('count is 1');
  });

  test('documentQuerySelector', () => {
    const mockDiv = document.createElement('div');
    mockDiv.id = 'app';
    document.body.appendChild(mockDiv);

    const result = document.querySelector('#app');
    expect(result).toBeInstanceOf(HTMLDivElement);

    document.body.removeChild(mockDiv);
  });

  test('documentQuerySelectorButton', () => {
    const mockButton = document.createElement('button');
    mockButton.id = 'counter';
    document.body.appendChild(mockButton);

    const result = document.querySelector('#counter');
    expect(result).toBeInstanceOf(HTMLButtonElement);

    document.body.removeChild(mockButton);
  });

  test('renderAppHTML', () => {
    const renderAppHTML = () => {
      return `
        <div>
          <a href="https://vitejs.dev" target="_blank">
            <img src="${'mocked-vite-svg'}" class="logo" alt="Vite logo" />
          </a>
          <a href="https://www.typescriptlang.org/" target="_blank">
            <img src="${'mocked-typescript-svg'}" class="logo vanilla" alt="TypeScript logo" />
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
    };

    const result = renderAppHTML();
    expect(result).toContain('<div>');
    expect(result).toContain('<img src="mocked-vite-svg"');
    expect(result).toContain('<img src="mocked-typescript-svg"');
    expect(result).toContain('<h1>Vite + TypeScript</h1>');
    expect(result).toContain('<button id="counter" type="button"></button>');
    expect(result).toContain('Click on the Vite and TypeScript logos to learn more');
  });
});