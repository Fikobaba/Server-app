const display = document.getElementById('display');
let expression = '';

const updateDisplay = () => {
  display.textContent = expression || '0';
};

const isOperator = (value) => ['+', '-', '*', '/'].includes(value);

const formatResult = (value) => {
  if (!Number.isFinite(value)) {
    return 'Error';
  }

  const rounded = Number(value.toFixed(10));
  return String(rounded);
};

const calculate = () => {
  if (!expression) {
    return '0';
  }

  const sanitized = expression.replace(/×/g, '*').replace(/÷/g, '/');

  if (!/^[\d+\-*/.() ]+$/.test(sanitized)) {
    return 'Error';
  }

  try {
    const result = Function(`"use strict"; return (${sanitized});`)();
    return formatResult(result);
  } catch (error) {
    return 'Error';
  }
};

document.querySelectorAll('.btn').forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.dataset.value;

    if (value === 'clear') {
      expression = '';
      updateDisplay();
      return;
    }

    if (value === 'delete') {
      expression = expression.slice(0, -1);
      updateDisplay();
      return;
    }

    if (value === '=') {
      expression = calculate();
      updateDisplay();
      return;
    }

    const lastChar = expression.slice(-1);

    if (isOperator(value) && isOperator(lastChar)) {
      expression = expression.slice(0, -1) + value;
      updateDisplay();
      return;
    }

    if (value === '.' && lastChar !== undefined) {
      const currentNumber = expression.split(/[+\-*/]/).pop();
      if (currentNumber.includes('.')) {
        return;
      }
    }

    if (expression === 'Error') {
      expression = '';
    }

    expression += value;
    updateDisplay();
  });
});

updateDisplay();
