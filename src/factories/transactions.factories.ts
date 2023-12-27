import { CategoryRepository } from '../database/repositories/categories.repository'
import { TransactionRepository } from '../database/repositories/transactions.repository'
import { CategoryModel } from '../database/schemas/category.schema'
import { TransactionModel } from '../database/schemas/transactions.schema'
import { TransactionsService } from '../services/transactions.service'

export class TransactionsFactory {
  private static transactionsService: TransactionsService

  static getServiceInstance() {
    if (this.transactionsService) {
      return this.transactionsService
    }

    const repository = new TransactionRepository(TransactionModel)
    const categoriesRepository = new CategoryRepository(CategoryModel)
    const service = new TransactionsService(repository, categoriesRepository)

    this.transactionsService = service

    return service
  }
}
