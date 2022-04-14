import { CommonService } from "./base.service";
import { Tag, TagModel } from "../db/model/tag/tag.model";
import { Model, FilterQuery } from 'mongoose'
import { CategoryModel } from "../db/model/category/category.model";
import { CategoryDto } from "../db/dto/category.dto";


class CategoryService<T> extends CommonService<T> {
  constructor(model: Model<T>) {
    super(model)
  }

  // public async saveCategoryService(name: string) {
  //   const tagDto: Tag = {
  //     name
  //   }
  //   console.log(name, tagDto)
  //   const tag = await this.findByQuery({ name });
  //   if (!tag) return this.create(tagDto);
  //   return tag;
  // }


  public async getTagsByPaging(dto) {
    const { page, limit, search, createdBy } = dto
    let query: FilterQuery<Tag & Document> = {
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
    let query: FilterQuery<Tag & Document> = {
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
