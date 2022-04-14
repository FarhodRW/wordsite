import { CommonService } from "./base.service";
import { Tag, TagModel } from "../db/model/tag/tag.model";
import { Model, FilterQuery } from 'mongoose'


class TagService<T> extends CommonService<T> {
  constructor(model: Model<T>) {
    super(model)
  }

  public async saveTagService(name: string) {
    const tagDto: Tag = {
      name
    }
    console.log(name, tagDto)
    const tag = await this.findByQuery({ name });
    if (!tag) return this.create(tagDto);
    return tag;
  }

  public async getTagsByPaging(dto) {
    const { page, limit, search, userId } = dto
    let query: FilterQuery<Tag & Document> = {
      isDeleted: false,
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
    const { page, limit, search, userId } = dto
    let query: FilterQuery<Tag & Document> = {
      isDeleted: false,
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


  public async updateById(id, dto) {

    try {
      const tag = await this.updateById(id, dto);
      return tag;
    } catch (e) {
      console.log(e);

    }
  }

  public async deleteById(id) {
    const update = {
      isDeleted: true
    }

    return this.updateById(id, update);
  }


}

export const tagService = new TagService(TagModel);
