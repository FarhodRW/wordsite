import { getModelForClass, Index, modelOptions, prop } from "@typegoose/typegoose";
import { CollectionNames } from "../../common/common.model";
import { BaseModel } from "../baseModel";


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

}

export const CategoryModel = getModelForClass(Category);