import { getModelForClass, Index, modelOptions, prop, Ref, types } from "@typegoose/typegoose";
import { CollectionNames } from "../../common/common.model";
import { BaseModel } from "../baseModel";
import { Types } from 'mongoose'

@modelOptions({
  schemaOptions: {
    collection: CollectionNames.CATEGORIES
  }
})

@Index(
  {
    name: 1
  },
  {
    name: 'name',
    unique: true,
    background: true,
    partialFilterExpression: {
      isDeleted: false
    }
  }
)

export class Category extends BaseModel {
  @prop({ required: true })
  public name!: string;

  @prop({ type: Types.ObjectId, ref: CollectionNames.CATEGORIES })
  parentId?: Ref<Category>;

}

export const CategoryModel = getModelForClass(Category);