import { z } from 'zod'
import { TransactionType } from '../entities/transactions.entity'

export const createTransactionsSchema = {
  title: z.string(),
  amount: z.number().int().positive(),
  type: z.nativeEnum(TransactionType),
  date: z.coerce.date(),
  categoryId: z.string().length(24)
}

const createTransactionObject = z.object(createTransactionsSchema)
export type CreateTransactionDTO = z.infer<typeof createTransactionObject>

export const indexTransactionsSchema = {
  title: z.string().optional(),
  categoryId: z.string().length(24).optional(),
  beginDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional()
}

const indexTransactionsObject = z.object(indexTransactionsSchema)
export type IndexTransactionsDTO = z.infer<typeof indexTransactionsObject>

export const getDashboardSchema = {
  beginDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional()
}
const getDashboardObject = z.object(getDashboardSchema)
export type GetDashboardDTO = z.infer<typeof getDashboardObject>

export const getFinancialEvolutionSchema = {
  year: z.string()
}
const getFinacialEvolutionObject = z.object(getFinancialEvolutionSchema)
export type GetFinancialEvolutionDTO = z.infer<typeof getFinacialEvolutionObject>

export const deleteTransactionSchema = {
  id: z.string().length(24) // Verifica se o ID tem 24 caracteres
};

const deleteTransactionObject = z.object(deleteTransactionSchema);
export type DeleteTransactionDTO = z.infer<typeof deleteTransactionObject>