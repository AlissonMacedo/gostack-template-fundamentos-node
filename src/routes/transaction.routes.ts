import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const listTransactions = [];

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const teste = transactionsRepository.getBalance();

    return response.status(200).json(teste);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;

    const createTransaction = new CreateTransactionService(
      transactionsRepository,
    );

    const transaction = createTransaction.execute({ title, type, value });

    return response.status(200).json(transaction);
  } catch (err) {
    return response.status(400).json({ error: 'O Valor é maior que o saldo' });
  }
});

export default transactionRouter;
