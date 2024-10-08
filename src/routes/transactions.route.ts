import { Router } from 'express'
import { ParamsType, validator } from '../middlewares/validator.middleware'
import {
  createTransactionsSchema,
  deleteTransactionSchema,
  getDashboardSchema,
  getFinancialEvolutionSchema,
  indexTransactionsSchema
} from '../dtos/transactions.dto'
import { TransactionsController } from '../controlles/transactions.controller'
import { TransactionsFactory } from '../factories/transactions.factories'

export const transactionsRoutes = Router()

const controller = new TransactionsController(
  TransactionsFactory.getServiceInstance()
)

transactionsRoutes.get('/', controller.index)

transactionsRoutes.get(
  '/',
  validator({
    schema: indexTransactionsSchema,
    type: ParamsType.QUERY
  }),
  controller.index
)

transactionsRoutes.post(
  '/',
  validator({
    schema: createTransactionsSchema,
    type: ParamsType.BODY
  }),
  controller.create
)

transactionsRoutes.get(
  '/dashboard',
  validator({
    schema: getDashboardSchema,
    type: ParamsType.QUERY
  }),
  controller.getDashboard
)

transactionsRoutes.get(
  '/financial-evolution',
  validator({
    schema: getFinancialEvolutionSchema,
    type: ParamsType.QUERY
  }),
  controller.getFinancialEvolution
)

transactionsRoutes.delete(
  '/:id', // A rota para deletar uma transação, onde ':id' é o ID da transação
  validator({
    schema: deleteTransactionSchema, // Use o schema para validação do ID
    type: ParamsType.PARAMS // O ID deve ser parte dos parâmetros da rota
  }),
  controller.delete // Chama o método delete do controller
)