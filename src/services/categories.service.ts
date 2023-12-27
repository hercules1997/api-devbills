import { StatusCodes } from 'http-status-codes'
import { CategoryRepository } from '../database/repositories/categories.repository'
import { CreateCategoryDTO } from '../dtos/categories.dto'
import { Category } from '../entities/category.entity'
import { AppError } from '../errors/app.error'
import { createWriteStream } from 'fs'

export class CategoriesService {
  constructor(private categoriesRepository: CategoryRepository) {}

  create = async ({ title, color }: CreateCategoryDTO): Promise<Category> => {
    const foundCategory = await this.categoriesRepository.findByTitle(title)

    if (foundCategory) {
      throw new AppError('Category already exisits.', StatusCodes.BAD_REQUEST)
    }

    const category = new Category({
      title,
      color
    })

    const createdCategory = await this.categoriesRepository.create(category)

    return createdCategory
  }

  index = async (): Promise<Category[]> => {
    const categories = await this.categoriesRepository.index()
    return categories
  }
}
