import { CommonService } from "./base.service";
import { Word, WordModel } from "../db/model/word/word.model";
import { Model, FilterQuery } from 'mongoose'
import { CollectionNames } from "../db/common/common.model";
import { Visiblity } from "../db/model/quiz/quiz-history.model";
import { WordDto } from "../db/dto/word.dto";


class WordService<T> extends CommonService<T> {
  constructor(model: Model<T>) {
    super(model)
  }

  public async save(dto: WordDto) {

    try {
      const word = await this.create(dto);
      return word;
    } catch (e) {
      console.log(e);
      // if (e.code == 11000) {

      // }
    }
  }

  public async updateWordById(id, dto) {

    try {
      const word = await this.updateById(id, dto);
      return word;
    } catch (e) {
      console.log(e);
      // if (e.code == 11000) {

      // }
      throw e;
    }
  }

  public async getWordsByPaging(dto) {
    const { page, limit, search, createdBy, dateFrom, dateTo, tagIds, visiblity } = dto
    let query: any = { isDeleted: false }

    if (createdBy) query.createdBy = dto.createdBy
    if (visiblity == Visiblity.PUBLIC) query.isPrivate = false
    else if (visiblity == Visiblity.PRIVATE) query.isPrivate = true
    if (tagIds && tagIds.length) {

      query.tags = {
        $in: tagIds
      }
    }

    if (dateFrom && dateTo) {
      query.createdAt = {
        $gte: new Date(dateFrom),
        $lte: new Date(dateTo)
      }
    } else if (dateFrom) {
      query.createdAt = {
        $gte: new Date(dateFrom)
      }
    } else if (dateTo) {
      query.createdAt = {
        $lte: new Date(dateTo)
      }
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
    const $match = {
      $match: query
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
      $match,
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


  public async deleteById(id) {
    const update = {
      isDeleted: true
    }

    return this.updateById(id, update);
  }

}

export const wordService = new WordService(WordModel);
