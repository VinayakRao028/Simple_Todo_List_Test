import React, { useEffect, useState } from 'react';
import './TodoList.css';
import typescriptLogo from '../assets/typescript.svg';
import viteLogo from '../assets/vite.svg';

interface CounterProps {
  initialCount?: number;
}

const Counter: React.FC<CounterProps> = ({ initialCount = 0 }) => {
  const [count, setCount] = useState(initialCount);

  const setCounter = (element: HTMLButtonElement) => {
    const setCount = (count: number) => {
      element.innerHTML = `count is ${count}`;
    };

    element.addEventListener('click', () => setCount(count + 1));
    setCount(count);
  };

  useEffect(() => {
    const counterElement = document.querySelector<HTMLButtonElement>('#counter');
    if (counterElement) {
      setCounter(counterElement);
    }
  }, [count]);

  return (
    <button id="counter" type="button" onClick={() => setCount(count + 1)}>
      count is {count}
    </button>
  );
};

const TodoList: React.FC = () => {
  return (
    <div className="todo-list-container">
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://www.typescriptlang.org/" target="_blank" rel="noopener noreferrer">
          <img src={typescriptLogo} className="logo vanilla" alt="TypeScript logo" />
        </a>
        <h1>Vite + TypeScript</h1>
        <div className="card">
          <Counter />
        </div>
        <p className="read-the-docs">
          Click on the Vite and TypeScript logos to learn more
        </p>
      </div>
    </div>
  );
};

export default TodoList;