'use strict';

module.exports = class Calc {

  constructor(options) {

    let plainCalcTemplate = options.template;

    this._calc = document.querySelector('#calculator');
    this._calc.innerHTML = plainCalcTemplate();
    this._previousResult = this._calc.querySelector('[data-type="calc-result-previous"]');
    this._currentResult = this._calc.querySelector('[data-type="calc-result-current"]');
    this._isPrevExpressionBtn = false;
    this._isFindResult = false;
    this._intermediateExp = ''; // промежуточный результат

    // handlers
    this._calc.addEventListener('click', this._onCalculate.bind(this));

  };

  _onCalculate(e) {
    let action = e.target.getAttribute('data-type');
    switch (action) {
      case 'numeric':
        this._inputNumeric(e.target.innerText);
        break;
      case 'calc-button-backspace':
        this._backSpace();
        break;
      case 'calc-button-operation':
        this._inputOperation(e);
        break;
      case 'calc-button-result':
        this._findResult();
        break;
      case 'calc-button-reset':
        this._resetValues();
        break;
    }
  };

  _inputNumeric(num) {
    if (this._isPrevExpressionBtn) {
      this._currentResult.innerHTML = '';
      this._isPrevExpressionBtn = false;
    }
    if (this._isFindResult) {
      this._previousResult.innerHTML = '';
      this._currentResult.innerHTML = '';
      this._isFindResult = false;
    }
    this._currentResult.innerHTML += num;
    this._intermediateExp + num;
  };

  _inputOperation(e) {
    let operation = e.target.innerText;
    this._isPrevExpressionBtn = true;
    this._previousResult.innerHTML += this._currentResult.innerHTML;
    this._intermediateExp += this._currentResult.innerHTML;

    this._checkExpression(this._intermediateExp);

    this._previousResult.innerHTML += ' ' + operation + ' ';
    this._intermediateExp += ' ' + operation + ' ';
  };

  _checkExpression(expression) {
    expression = expression.trim().split(' ');
    if (expression.length === 3) {
      this._currentResult.innerHTML = this._findExpression(expression);
      this._intermediateExp = this._currentResult.innerHTML;
    }
  }

  _backSpace() {
    let strResult = this._currentResult.innerHTML;
    this._currentResult.innerHTML = strResult.slice(0, strResult.length-1);
  };

  _resetValues() {
    this._previousResult.innerHTML = '';
    this._currentResult.innerHTML = '';
    this._intermediateExp = '';
  }

  _findResult() {
    let expression = this._intermediateExp + this._currentResult.innerHTML;
    expression = expression.trim().split(' ');
    this._previousResult.innerHTML = '';
    this._intermediateExp = '';
    this._currentResult.innerHTML = this._findExpression(expression);
    this._isFindResult = true;
  };

  _findExpression(expression) {
    let result;
    switch (expression[1]) {
      case '+':
        result = parseFloat(expression[0]) + parseFloat(expression[2]);
        break;
      case '-':
        result = parseFloat(expression[0]) - parseFloat(expression[2]);
        break;
      case '*':
        result = parseFloat(expression[0]) * parseFloat(expression[2]);
        break;
      case '/':
        result = parseFloat(expression[0]) / parseFloat(expression[2]);
        break;
    }
    return result;
  };

};