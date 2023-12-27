import { StatusCodes } from 'http-status-codes'
import { CategoryRepository } from '../database/repositories/categories.repository'
import { AppError } from '../errors/app.error'
import { TransactionRepository } from '../database/repositories/transactions.repository'
import { Transaction } from '../entities/transactions.entity'
import {
  CreateTransactionDTO,
  GetDashboardDTO,
  GetFinancialEvolutionDTO,
  IndexTransactionsDTO
} from '../dtos/transactions.dto'
import { Balance } from '../entities/balance.entity'
import { Expense } from '../entities/expense.entity'

export class TransactionsService {
  constructor(
    private transactionRepository: TransactionRepository,
    private categoriesRepository: CategoryRepository
  ) {}

  create = async ({
    title,
    date,
    amount,
    type,
    categoryId
  }: CreateTransactionDTO): Promise<Transaction> => {
    const category = await this.categoriesRepository.findById(categoryId)

    if (!category) {
      throw new AppError('Category does not exisits.', StatusCodes.NOT_FOUND)
    }

    const transaction = new Transaction({
      title,
      date,
      amount,
      type,
      category
    })

    const createdTransaction =
      await this.transactionRepository.create(transaction)

    return createdTransaction
  }

  index = async (filters: IndexTransactionsDTO): Promise<Transaction[]> => {
    const transaction = await this.transactionRepository.index(filters)
    return transaction
  }

  getDashboard = async ({
    beginDate,
    endDate
  }: GetDashboardDTO): Promise<{ balance: Balance; expenses: Expense[] }> => {
    let [balance, expenses] = await Promise.all([
      this.transactionRepository.getBalance({
        beginDate,
        endDate
      }),
      this.transactionRepository.getExpenses({
        beginDate,
        endDate
      })
    ])

    if (!balance) {
      balance = new Balance({
        _id: null,
        incomes: 0,
        expenses: 0,
        balance: 0
      })
    }

    return { balance, expenses }
  }

  getFinancialEvolution = async ({
    year
  }: GetFinancialEvolutionDTO): Promise<Balance[]> => {
    const resultFinancialEvolution =
      await this.transactionRepository.getFinancialEvolution({ year })

    return resultFinancialEvolution
  }
}
