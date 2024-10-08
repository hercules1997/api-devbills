import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { TransactionsService } from '../services/transactions.service'
import {
  CreateTransactionDTO,
  GetDashboardDTO,
  GetFinancialEvolutionDTO,
  IndexTransactionsDTO
} from '../dtos/transactions.dto'
import { BodyRequest, QueryRequest } from './types'

export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  create = async (
    req: BodyRequest<CreateTransactionDTO>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { title, amount, date, categoryId, type } = req.body

      const result = await this.transactionsService.create({
        title,
        amount,
        date,
        categoryId,
        type
      })

      return res.status(StatusCodes.CREATED).json(result)
    } catch (err) {
      next(err)
    }
  }

  index = async (
    req: QueryRequest<IndexTransactionsDTO>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { beginDate, title, endDate, categoryId } = req.query
      const result = await this.transactionsService.index({
        beginDate,
        title,
        endDate,
        categoryId
      })

      return res.status(StatusCodes.OK).json(result)
    } catch (err) {
      next(err)
    }
  }

  getDashboard = async (
    req: QueryRequest<GetDashboardDTO>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { beginDate, endDate } = req.query
      const result = await this.transactionsService.getDashboard({
        beginDate,
        endDate
      })

      return res.status(StatusCodes.OK).json(result)
    } catch (err) {
      next(err)
    }
  }

  getFinancialEvolution = async (
    req: QueryRequest<GetFinancialEvolutionDTO>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { year } = req.query
      const result = await this.transactionsService.getFinancialEvolution({
        year
      })

      return res.status(StatusCodes.OK).json(result)
    } catch (err) {
      next(err)
    }
    
  }
    delete = async (
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      try {
        const { id } = req.params;
        
        await this.transactionsService.delete(id);
        
        return res.status(StatusCodes.NO_CONTENT).send();
      } catch (err) {
      next(err);
    }
  }
}
