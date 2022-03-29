import { getModelForClass, Index, modelOptions, prop, Ref } from "@typegoose/typegoose";
import { CollectionNames } from "../../common/common.model";
import { BaseModel } from "../baseModel";
import { Tag } from "../tag/tag.model";


@modelOptions({
  schemaOptions: {
    collection: CollectionNames.WORDS
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

export class Word extends BaseModel {
  @prop({ required: true })
  public name!: string;

  @prop({ required: true })
  public defination!: string;

  @prop({ default: [] })
  public tags: Ref<Tag>[];

  @prop({ default: true })
  public isPrivate: boolean;



}

export const WordModel = getModelForClass(Word);