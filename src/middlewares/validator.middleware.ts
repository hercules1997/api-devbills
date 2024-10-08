import { NextFunction, Request, Response } from 'express'
import { ZodRawShape, z } from 'zod'
import { AppError } from '../errors/app.error'
import { StatusCodes } from 'http-status-codes'

// Enum para definir os tipos de parâmetros que podem ser validados
export enum ParamsType {
  QUERY = 'query',
  BODY = 'body',
  PARAMS = 'params' // Adicionando a linha para incluir 'params'
}

// Tipo para definir as propriedades do validador
type ValidateParams = {
  schema: ZodRawShape // Schema que será usado para validação
  type: ParamsType // Tipo de parâmetro a ser validado
}

// Middleware de validação
export function validator(params: ValidateParams) {
  return (req: Request, res: Response, next: NextFunction) => {
    // Validando os parâmetros do request com base no schema fornecido
    const result = z.object(params.schema).safeParse(req[params.type])

    if (!result.success) {
      // Se a validação falhar, formatar os erros
      const errorFormatted = result.error.issues.map(
        (item) => `${item.path.join('.')}: ${item.message}`
      )

      // Lançar um erro formatado
      throw new AppError(errorFormatted, StatusCodes.UNPROCESSABLE_ENTITY)
    }

    // Substituir os parâmetros do request pelos dados validados
    req[params.type] = result.data

    // Passar para o próximo middleware
    next()
  }
}
