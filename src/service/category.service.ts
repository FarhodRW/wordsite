import { CommonService } from "./base.service";
import { Model, FilterQuery } from 'mongoose'
import { Category, CategoryModel } from "../db/model/category/category.model";
import { CategoryDto } from "../db/dto/category.dto";


class CategoryService<T> extends CommonService<T> {
  constructor(model: Model<T>) {
    super(model)
  }

  public async save(dto: CategoryDto) {

    try {
      const category = await this.create(dto);
      return category;
    } catch (e) {
      console.log(e);
      // if (e.code == 11000) {

      // }
    }
  }

  public async updateById(id, dto) {

    try {
      const category = await this.updateById(id, dto);
      return category;
    } catch (e) {
      console.log(e);
      // if (e.code == 11000) {

      // }
    }
  }

  public async deleteById(id) {
    const update = {
      isDeleted: true
    }

    return this.updateById(id, update);
  }


  public async getByPaging(dto) {
    const { page, limit, search, createdBy } = dto
    let query: FilterQuery<Category & Document> = {
      isDeleted: false,
      createdBy: createdBy
    }

    if (search) {
      query = {
        'name': {
          $regex: search,
          $options: 'i',
        }
      }
    }


    const $sort = {
      createdAt: -1
    }

    const data = this.findByPaging(query, page, limit, [], $sort)
    return data;
  }

  public async getForChoose(dto) {
    const { page, limit, search, createdBy } = dto
    let query: FilterQuery<Category & Document> = {
      isDeleted: false,
      createdBy: createdBy
    }

    if (search) {
      query = {
        'name': {
          $regex: search,
          $options: 'i',
        }
      }
    }


    const $sort = {
      createdAt: -1
    }

    const $project = [
      { $project: { name: 1, _id: 1 } }
    ]

    const data = this.findByPaging(query, page, limit, $project, $sort)
    return data;
  }



}

export const categoryService = new CategoryService(CategoryModel);
