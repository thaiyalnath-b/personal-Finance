document.addEventListener('DOMContentLoaded', () => {
    const addTransaction = document.getElementById('btn');
    const transactionList = document.getElementById('TransactionList');
    const totalIncomes = document.getElementById('incomes');
    const totalExpences = document.getElementById('expences');
    const balances = document.getElementById('balance');

    function displayTransactions() {
        const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        transactionList.innerHTML = '';
        transactions.forEach((transaction, index) => {
            const li = document.createElement('li');
            if (transaction.list === 'Income') {
                li.innerHTML = `${transaction.name} - ${transaction.amount.toFixed(2)} (${transaction.list})
                <button class='delete-btn' role="button" onclick='deleteTransaction(${index})'>Delete</button>`;
                li.style.backgroundColor = '#004c80';
                li.style.color = 'white';
            }
            else {
                li.innerHTML = `${transaction.name} - ${transaction.amount.toFixed(2)} (${transaction.list})
                <button class='delete-btn' role="button" onclick='deleteTransaction(${index})'>Delete</button>`;
                li.style.backgroundColor = '#004c80';
                li.style.color = 'white';
            }
            transactionList.appendChild(li);
        });
    }
    addTransaction.addEventListener('click', addTrans);
    function addTrans() {
        const name = document.getElementById('inputData').value;
        const amount = parseFloat(document.getElementById('inputAmount').value);
        const list = document.getElementById('datalist').value;
        if (name && !isNaN(amount)) {
            const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
            const newTransaction = { name, amount, list };
            transactions.push(newTransaction);
            localStorage.setItem('transactions', JSON.stringify(transactions));
            displayTransactions();
            updateSummary();
            inputData.value = '';
            inputAmount.value = '';
        }
    }
    function updateSummary() {
        const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        let incomeTotal = 0;
        let expenceTotal = 0;
        transactions.forEach((transaction) => {
            if (transaction.list === 'Income') {
                incomeTotal += transaction.amount;
            }
            else {
                expenceTotal += transaction.amount;
            }
        });
        const balance = incomeTotal - expenceTotal;
        totalIncomes.textContent = incomeTotal.toFixed(2);
        totalExpences.textContent = expenceTotal.toFixed(2);
        balances.textContent = balance.toFixed(2);
    }
    function deleteTransaction(index) {
        const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
        transactions.splice(index, 1);
        localStorage.setItem('transactions', JSON.stringify(transactions));
        displayTransactions();
        updateSummary();
    }
    window.deleteTransaction = deleteTransaction;
    displayTransactions();
    updateSummary();
});



