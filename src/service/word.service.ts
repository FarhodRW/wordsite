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
        createdAt: {
          $first: '$createdAt'
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

    const $skip = {
      $skip: (page - 1)
    }

    const $limit = {
      $limit: limit
    }


    const $sort = {
      $sort: {
        createdAt: -1
      }
    }

    const pipeline = [
      { $match: query },
      $lookupTags,
      $unwindTags,
      $group,
      $sort,
      $skip,
      $limit
    ]

    const total = await this.countDocuments(query);

    const data = await this.aggregate(pipeline)
    return {
      total,
      data
    };
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
        createdAt: {
          $first: '$createdAt'
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

    const $skip = {
      $skip: (page - 1)
    }

    const $limit = {
      $limit: limit
    }


    const $sort = {
      $sort: {
        createdAt: -1
      }
    }

    const pipeline = [
      { $match: query },
      $lookupTags,
      $unwindTags,
      $group,
      $sort,
      $skip,
      $limit
    ]

    const total = await this.countDocuments(query);

    const data = await this.aggregate(pipeline)
    return {
      total,
      data
    };
  }


}

export const wordService = new WordService(WordModel);
