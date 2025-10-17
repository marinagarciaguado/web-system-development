const expenseNameInput = document.querySelector('input[name="expense-name"]');
const expenseAmountInput = document.querySelector('input[name="expense-amount"]');
const addButton = document.getElementById('add-button');
const expenseList = document.getElementById('expense-list');
const totalElement = document.getElementById('total');

let totalAmount = 0;

addButton.addEventListener('click', () => {
    const name = expenseNameInput.value;
    const amount = parseFloat(expenseAmountInput.value);

    if (name === '' || isNaN(amount) || amount <= 0) {
        alert('Please enter a valid name and a positive amount.');
        return;
    }

    totalAmount += amount;
    totalElement.textContent = totalAmount.toFixed(2) + '€';

    const listItem = document.createElement('li');

    const textNode = document.createTextNode(`${name}: ${amount.toFixed(2)}€`);
    listItem.appendChild(textNode);
    
    expenseList.appendChild(listItem);

    expenseNameInput.value = '';
    expenseAmountInput.value = '';
});



