import Transaction from '../models/Transaction';

interface Balance {
  transactions: Transaction[];
  balance: object;
}

let income: string;
let outcome: number;
let total: number;

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const { transactions } = this;
    function getTotalIncome(total, item) {
      return total + (item.type === 'income' ? item.value : null);
    }
    const totalIncome = this.transactions.reduce(getTotalIncome, 0);

    function getTotalOutcome(total, item) {
      return total + (item.type === 'outcome' ? item.value : null);
    }
    const totalOutcome = this.transactions.reduce(getTotalOutcome, 0);

    const totalTotal = totalIncome - totalOutcome;

    const teste = {
      transactions,
      balance: {
        income: totalIncome,
        outcome: totalOutcome,
        total: totalTotal,
      },
    };
    return teste;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const { transactions } = this;
    const transaction = new Transaction({
      title,
      value,
      type,
    });

    function getTotalIncome(total, item) {
      return total + (item.type === 'income' ? item.value : null);
    }
    const totalIncome = this.transactions.reduce(getTotalIncome, 0);

    if (type === 'outcome' && value > totalIncome) {
      console.log('ultrapassou');
      return err;
    }

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
