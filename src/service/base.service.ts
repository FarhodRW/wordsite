import { Model, SaveOptions, QueryOptions, FilterQuery, InsertManyOptions } from 'mongoose';
import { ErrorCodes, ErrorItems, UserDefinedError } from '../db/common/common.error';


export class CommonService<T>{
  constructor(public model: Model<T>) { }

  public async create(dto, options?: SaveOptions, project?: { __v: 0 }) {

    const data = await this.model.create([dto], options);
    return this.model.findById(data[0]._id, project);
  }

  public async createMany(dto, options: InsertManyOptions, project?: { __v: 0 }) {
    const data = this.model.insertMany([dto], options)
    return data;
  }

  public async findById(id: any, project?: any, options?: QueryOptions) {
    const data = await this.model.findById(id, project, options);
    return data
  }

  public async findByQuery(query) {
    const data = await this.model.findOne(query)
    return data
  }

  public async updateById(id: any, dto, options?: boolean) {
    if (!options)
      options = true;
    const data = await this.model.findByIdAndUpdate(id, { $set: dto }, { new: options })
    return data
  }

  public async updateByQuery(filter: FilterQuery<T>, dto: any, options?: QueryOptions) {
    let data = await this.model.updateOne({ filter }, { $set: dto }, { options })
    return data
  }

  public async deleteById(id: any, options?: QueryOptions,) {
    const data = await this.model.findByIdAndDelete(id, options,)
    return data
  }

  public async deleteMany(query: any) {
    const data = await this.model.deleteMany(query)
    return data
  }

  public async findByPaging(query, page: number, limit: number, add_pipeline = [], sort?) {
    const $match = {
      $match: query
    }
    const $skip = {
      $skip: (page - 1) * limit
    }
    const $limit = {
      $limit: limit
    }

    const $sort = {
      $sort: sort ? sort : { createdAt: -1 }
    }

    const pipeline = [
      $match,
      $sort,
      $skip,
      $limit,
      ...add_pipeline
    ]

    const total = await this.model.countDocuments(query);
    const data = await this.model.aggregate(pipeline)

    return {
      total,
      data
    }

  }

  public async aggregate(pipeline = []) {
    return await this.model.aggregate(pipeline);
  }


  public async countDocuments(query: any) {
    const data = await this.model.countDocuments(query)
    return data
  }
}