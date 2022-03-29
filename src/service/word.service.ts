import { CommonService } from "./base.service";
import { Word, WordModel } from "../db/model/word/word.model";
import { Model, FilterQuery } from 'mongoose'
import { CollectionNames } from "../db/common/common.model";


class WordService<T> extends CommonService<T> {
  constructor(model: Model<T>) {
    super(model)
  }

  public async getWordsByPaging(dto) {
    const { page, limit, search } = dto
    let query: FilterQuery<Word & Document> = {
      isDeleted: false
    }

    if (search) {
      query.$or = [
        {
          'name': {
            $regex: search,
            $options: 'i',
          }
        },
        {
          'defination': {
            $regex: search,
            $options: 'i',
          }
        }
      ]
    }

    const $lookupTags = {
      $lookup: {
        from: CollectionNames.TAGS,
        localField: 'tags',
        foreignField: '_id',
        as: 'tags'
      }
    }

    const $unwindTags = {
      $unwind: {
        path: '$tags',
        preserveNullAndEmptyArrays: true
      }
    }

    const $group = {
      $group: {
        _id: '$_id',
        name: {
          $first: '$name'
        },
        defination: {
          $first: '$defination'
        },
        tags: {
          $push: '$tags.name'
        },
        isPrivate: {
          $first: '$isPrivate'
        }
      }
    }


    const $sort = {
      createdAt: -1
    }

    const pipeline = [
      $lookupTags,
      $unwindTags,
      $group
    ]

    const data = this.findByPaging(query, page, limit, pipeline, $sort)
    return data;
  }


  public async getPublicWordsByPaging(dto) {
    const { page, limit, search } = dto
    let query: FilterQuery<Word & Document> = {
      isDeleted: false,
      isPrivate: false
    }

    if (search) {
      query.$or = [
        {
          'name': {
            $regex: search,
            $options: 'i',
          }
        },
        {
          'defination': {
            $regex: search,
            $options: 'i',
          }
        }
      ]
    }


    const $sort = {
      createdAt: -1
    }

    const data = this.findByPaging(query, page, limit, [], $sort)
    return data;
  }


}

export const wordService = new WordService(WordModel);
