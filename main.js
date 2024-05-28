class TransactionAnalyzer {
    constructor() {
        this.transactions = [];
    }

    async loadTransactionsFromJSON(src = "./transactions.json") {
        try {
            const response = await fetch(src);
            if (!response.ok) {
                throw new Error(`Could not fetch ${src}, status: ${response.status}`);
            }
            const data = await response.json();
            this.transactions = data;
        } catch (error) {
            console.error(error);
        }
    }

    addTransaction(transaction) {
        this.transactions.push(transaction);
    }

    getAllTransaction() {
        return this.transactions;
    }

    static transaction(transaction_id, transaction_date, transaction_amount, transaction_type, transaction_description, merchant_name, card_type) {
        return {
            transaction_id,
            transaction_date,
            transaction_amount,
            transaction_type,
            transaction_description,
            merchant_name,
            card_type
        };
    }

    calculateTotalAmount() {
        let sumOfAllTransactions = 0;
        for (let index = 0; index < this.transactions.length; index++) {
            const transaction = this.transactions[index];
            sumOfAllTransactions += transaction.transaction_amount;
        }
        return sumOfAllTransactions;
    }

    calculateTotalAmountByDate(year, month, day) {
        let totalAmountByDate = 0;
        for (let index = 0; index < this.transactions.length; index++) {
            const transaction = this.transactions[index];
            const transactionDate = new Date(transaction.transaction_date);
            if ((!year || transactionDate.getFullYear() === year) &&
                (!month || transactionDate.getMonth() + 1 === month) &&
                (!day || transactionDate.getDate() === day)
            ) {
                totalAmountByDate += transaction.transaction_amount;
            }
        }
        return totalAmountByDate;
    }

    getTransactionByType(type) {
        const transactionsByType = [];
        for (let i = 0; i < this.transactions.length; i++) {
            const transaction = this.transactions[i];
            if (transaction.transaction_type === type) {
                transactionsByType.push(transaction);
            }
        }
        return transactionsByType;
    }
}

const analyzer = new TransactionAnalyzer();
analyzer.loadTransactionsFromJSON('transactions.json')
    .then(() => {
        // Печатаем массив транзакций из файла transactions.json
        console.log(analyzer.transactions);

        // Получаем всех транзакций через метод класса и выводим в консоль
        console.log(analyzer.getAllTransaction());

        // Вычисляем общую сумму всех транзакций и выводим в консоль
        console.log(analyzer.calculateTotalAmount());

        // Вычисляем общую сумму транзакций по указанной дате и выводим в консоль
        console.log(analyzer.calculateTotalAmountByDate(2024, 3, 12));

        // Получаем транзакции указанного типа и выводим в консоль
        console.log(analyzer.getTransactionByType('debit'));
    })
    .catch(error => {
        console.error(error);
    });
