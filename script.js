document.getElementById('addExpenseBtn').addEventListener('click', addExpense);
document.getElementById('filterCategory').addEventListener('change', filterExpenses);

let totalAmount = 0;
const expenses = [];

function addExpense() {
    const name = document.getElementById('expenseName').value;
    const amount = parseFloat(document.getElementById('expenseAmount').value);
    const category = document.getElementById('expenseCategory').value;
    const date = document.getElementById('expenseDate').value;

    if (name && amount && category && date) {
        const expense = { name, amount, category, date };
        expenses.push(expense);
        renderExpenses();
        updateTotal();
        clearForm();
    }
}

function renderExpenses() {
    const tableBody = document.querySelector('#expenseTable tbody');
    tableBody.innerHTML = '';

    expenses.forEach((expense, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${expense.name}</td>
            <td>$${expense.amount.toFixed(2)}</td>
            <td>${expense.category}</td>
            <td>${expense.date}</td>
            <td>
                <button onclick="editExpense(${index})">Edit</button>
                <button onclick="deleteExpense(${index})">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

function updateTotal() {
    totalAmount = expenses.reduce((total, expense) => total + expense.amount, 0);
    document.getElementById('totalAmount').textContent = `$${totalAmount.toFixed(2)}`;
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    renderExpenses();
    updateTotal();
}

function editExpense(index) {
    const expense = expenses[index];
    document.getElementById('expenseName').value = expense.name;
    document.getElementById('expenseAmount').value = expense.amount;
    document.getElementById('expenseCategory').value = expense.category;
    document.getElementById('expenseDate').value = expense.date;

    deleteExpense(index);
}

function filterExpenses() {
    const category = document.getElementById('filterCategory').value;
    const filteredExpenses = category === 'All' ? expenses : expenses.filter(expense => expense.category === category);

    const tableBody = document.querySelector('#expenseTable tbody');
    tableBody.innerHTML = '';

    filteredExpenses.forEach((expense, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${expense.name}</td>
            <td>$${expense.amount.toFixed(2)}</td>
            <td>${expense.category}</td>
            <td>${expense.date}</td>
            <td>
                <button onclick="editExpense(${index})">Edit</button>
                <button onclick="deleteExpense(${index})">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

function clearForm() {
    document.getElementById('expenseName').value = '';
    document.getElementById('expenseAmount').value = '';
    document.getElementById('expenseCategory').value = 'Food';
    document.getElementById('expenseDate').value = '';
}