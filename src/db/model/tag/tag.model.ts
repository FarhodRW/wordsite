import { getModelForClass, Index, modelOptions, prop } from "@typegoose/typegoose";
import { CollectionNames } from "../../common/common.model";
import { BaseModel } from "../baseModel";


@modelOptions({
  schemaOptions: {
    collection: CollectionNames.TAGS
  }
})

@Index(
  {
    title: 1
  },
  {
    name: 'title',
    unique: true,
    background: true,
    partialFilterExpression: {
      isDeleted: false
    }
  }
)

export class Tag extends BaseModel {
  @prop({ required: true })
  public title!: string;

}

export const TagModel = getModelForClass(Tag);